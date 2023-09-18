import "reflect-metadata";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import dataSource from "./utils";
import {
    createAccessToken,
    createRefreshToken,
    sendRefreshToken,
} from "./tokenGeneration";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import CategoryResolver from "./category/Category.Resolver";
import ProductResolver from "./product/Product.Resolver";
import { Category } from "./category/entity/Category";
import { Product } from "./product/entity/Product";
import { IMockProduct, categoriesNames, mockProducts } from "./mockDataArray";
import { ProductService } from "./product/Product.Service";
import LangResolver from "./lang/Lang.Resolver";
import UserResolver from "./user/User.Resolver";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./user/entity/User";
import cors from "cors";

dotenv.config();

export interface MyContext {
    req: Request;
    res: Response;
    payload?: { email: string };
}

export const JWT_SECRET = process.env.JWT_SECRET_KEY as string;
export const DATA_FIXTURE_CATEGORIES = process.env
    .DATA_FIXTURE_CATEGORIES as string;
export const DATA_FIXTURE_PRODUCTS = process.env
    .DATA_FIXTURE_PRODUCTS as string;

const categoryRepository = dataSource.getRepository(Category);
const productRepository = dataSource.getRepository(Product);
const productService = new ProductService();

if (JWT_SECRET === undefined) {
    throw Error("JWT secret undefined");
}

const start = async (): Promise<void> => {
    await dataSource.initialize();

    const app = express();

    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
        }),
    );

    app.use(cookieParser());

    app.get("/", (req, res) => res.send("hello"));

    app.post("/refresh_token", async (req, res) => {
        const token = req.cookies?.jid;

        if (token === undefined || token === "") {
            return res.send({ ok: false, accessToken: "" });
        }

        try {
            const payload = verify(
                token,
                process.env.REFRESH_JWT_SECRET_KEY as string,
            ) as any;

            const user = await dataSource
                .getRepository(User)
                .findOneBy({ email: payload.email });

            if (user === null || user.tokenVersion !== payload.tokenVersion) {
                return res.send({ ok: false, accessToken: "" });
            }

            sendRefreshToken(
                res,
                createRefreshToken(payload.email, user.role, user.tokenVersion),
            );

            return res.send({
                ok: true,
                accessToken: createAccessToken(payload.email, user.role),
            });
        } catch (err) {
            console.log(err);
            return res.send({ ok: false, accessToken: "" });
        }
    });

    const typeGraphQLgeneratedSchema = await buildSchema({
        validate: { forbidUnknownValues: false },
        resolvers: [
            UserResolver,
            CategoryResolver,
            ProductResolver,
            LangResolver,
        ],
        authChecker: ({ context }, roles) => {
            console.log("roles", roles);

            const { email, role } = context.payload;
            console.log("role", role);

            if (email !== undefined) {
                if (roles.length === 0 || roles.includes(role)) {
                    return true; // Authorized
                }
            }

            return false; // Not authorized
        },
    });

    const server = new ApolloServer({
        schema: typeGraphQLgeneratedSchema,
        context: ({ req, res }) => {
            const { authorization } = req.headers;
            if (
                authorization === undefined ||
                !authorization.startsWith("Bearer ")
            ) {
                return { req, res };
            } else {
                const token = authorization.split(" ")[1];
                try {
                    const payload = jwt.verify(token, JWT_SECRET);
                    return { req, res, payload };
                } catch (err) {
                    console.log(err);
                    return { req, res };
                }
            }
        },
    });

    await server.start();

    server.applyMiddleware({ app, cors: false });

    app.listen(4000, () => {
        console.log("express server OPEN");
    });

    const dataFixture = async (): Promise<void> => {
        if (DATA_FIXTURE_CATEGORIES === "true") {
            // This creates the different categories, to add one simply modify the JSON in mockData.ts
            for (let index = 0; index < categoriesNames.length; index++) {
                await categoryRepository.save({
                    name: categoriesNames[index],
                });
            }
        }

        // This is getting all the categories previously created so we can bind them to the products in next steps
        const categories = await categoryRepository.find();

        const resultArray: IMockProduct[] = [];
        // The issue is all the mock data for products doesn't have category provided. In the case where the category property of a product is a null array this aims to finds the matching category using the products name
        if (DATA_FIXTURE_PRODUCTS === "true") {
            mockProducts.forEach((product) => {
                const foundMatchingCategory = categories.find((category) => {
                    return product.name.includes(category.name);
                });

                // This checks if no category is provided for a product, if it's the case we check if we found it using the products name and finaly if the products doesn't already belong to the category

                const needingToInferCategory =
                    product.categories.length === 0 &&
                    foundMatchingCategory !== undefined &&
                    !product.categories.includes(foundMatchingCategory.id);

                // If all that is true , we are going to add the infered category to our product
                if (needingToInferCategory) {
                    product.categories = [
                        ...product.categories,
                        foundMatchingCategory.id,
                    ];
                }

                // we push the formated product in an array.

                resultArray.push(product);
            });

            // At this stage our products have categories so we can insert them in our database using a method from our productService
            const allDbProducts = await productService.getAllProducts();
            for (let index = 0; index < resultArray.length; index++) {
                const productsToInsert = resultArray[index];
                const {
                    name,
                    price,
                    stock,
                    available,
                    description,
                    picture,
                    categories,
                } = productsToInsert;

                const productAlreadyExists = allDbProducts.find((dbProduct) => {
                    return dbProduct.name === name;
                });

                if (productAlreadyExists === undefined) {
                    const newProduct = await productService.createNewProduct({
                        stock,
                        price,
                        name,
                        available,
                        description,
                        picture,
                        category: categories,
                    });
                    await productRepository.save(newProduct);
                }
            }
        }
    };

    if (
        DATA_FIXTURE_CATEGORIES === "true" ||
        DATA_FIXTURE_PRODUCTS === "true"
    ) {
        void dataFixture();
    } else {
        console.log("data fixture off");
    }
};

void start();
