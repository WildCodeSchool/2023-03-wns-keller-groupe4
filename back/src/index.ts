/* eslint-disable no-debugger */
import "reflect-metadata";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import dataSource from "./utils";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import CategoryResolver from "./category/Category.Resolver";
import ProductResolver from "./product/Product.Resolver";

import LangResolver from "./lang/Lang.Resolver";
import UserResolver from "./user/User.Resolver";
import { dataFixture } from "./fixture";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET_KEY as string;
export const DATA_FIXTURE_CATEGORIES = process.env
    .DATA_FIXTURE_CATEGORIES as string;
export const DATA_FIXTURE_PRODUCTS = process.env
    .DATA_FIXTURE_PRODUCTS as string;

if (JWT_SECRET === undefined) {
    throw Error("JWT secret undefined");
}

const start = async (): Promise<void> => {
    await dataSource.initialize();
    const typeGraphQLgeneratedSchema = await buildSchema({
        validate: { forbidUnknownValues: false },
        resolvers: [
            UserResolver,
            CategoryResolver,
            ProductResolver,
            LangResolver,
        ],
        authChecker: ({ context }) => {
            if (context.email !== undefined) {
                return true;
            } else {
                return false;
            }
        },
    });

    const server = new ApolloServer({
        schema: typeGraphQLgeneratedSchema,
        context: ({ req }) => {
            if (
                req.headers.authorization !== undefined &&
                req.headers.authorization !== ""
            ) {
                const payload = jwt.verify(
                    req.headers.authorization.split("Bearer ")[1],
                    JWT_SECRET,
                );
                return payload;
            }
            return {};
        },
    });

    const { url } = await server.listen();

    if (
        DATA_FIXTURE_CATEGORIES === "true" ||
        DATA_FIXTURE_PRODUCTS === "true"
    ) {
        await dataFixture();
    } else {
        console.log("data fixture off");
    }
    console.log(`🚀  Server ready at ${url}`);
    // console.log(JWT_SECRET);
};

void start();
