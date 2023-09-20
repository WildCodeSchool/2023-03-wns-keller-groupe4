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
import { ProductService } from "./product/Product.Service";
import LangResolver from "./lang/Lang.Resolver";
import UserResolver from "./user/User.Resolver";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./user/entity/User";
import cors from "cors";
import whitelistCORS from "./whitelistCORS";
import { dataFixture, resetMockCategories, resetMockProducts } from "./mock";

dotenv.config();

export interface MyContext {
    req: Request;
    res: Response;
    payload?: { email: string };
}

const categoryRepository = dataSource.getRepository(Category);
const productRepository = dataSource.getRepository(Product);
const productService = new ProductService();

export const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

if (JWT_SECRET === undefined) {
    throw Error("JWT secret undefined");
}

const start = async (): Promise<void> => {
    await dataSource.initialize();

    const app = express();

    app.use(
        cors({
            origin: whitelistCORS,
            credentials: true,
        }),
    );

    app.use(cookieParser());

    app.get("/", (req: Request, res: Response) => res.send("hello"));

    app.post("/refresh_token", async (req: Request, res: Response) => {
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
            console.error(err);
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
            const { email, role } = context.payload;

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
                return { req, res, payload: { email: undefined } };
            } else {
                const token = authorization.split(" ")[1];
                try {
                    const payload = jwt.verify(token, JWT_SECRET);
                    return { req, res, payload };
                } catch (err) {
                    console.error(err);
                    return { req, res, payload: { email: undefined } };
                }
            }
        },
    });

    await server.start();

    server.applyMiddleware({ app, cors: false });

    app.listen(4000, () => {
        console.log("express server OPEN");
    });

    if (resetMockCategories || resetMockProducts) {
        void dataFixture(categoryRepository, productRepository, productService);
    } else {
        console.log("data fixture off");
    }
};

void start();
