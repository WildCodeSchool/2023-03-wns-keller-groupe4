import "reflect-metadata";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import dataSource from "./utils";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import UserResolver from "./user/User.Resolver";
import LangResolver from "./lang/Lang.Resolver";
import CategoryResolver from "./category/Category.Resolver";
import ProductResolver from "./product/Product.Resolver";


dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

if (JWT_SECRET === undefined) {
    throw Error("JWT secret undefined");
}

const start = async (): Promise<void> => {
    await dataSource.initialize();
    const typeGraphQLgeneratedSchema = await buildSchema({
      validate: {forbidUnknownValues: false},
      resolvers: [UserResolver, CategoryResolver, ProductResolver, LangResolver],
      authChecker: ({context}) => {
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
                    JWT_SECRET
                );
                return payload;
            }
            return {};
        },
    });

    const { url } = await server.listen();
    console.log(`🚀  Server ready at ${url}`);
};

void start();
