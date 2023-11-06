import "reflect-metadata";
import { DataSource } from "typeorm";
// import Database from "better-sqlite3";
import * as jwt from "jsonwebtoken";
import sqlite3 from "sqlite3";
import { Category } from "../category/entity/Category";
import { Lang } from "../lang/entity/Lang";
import { Product } from "../product/entity/Product";
import { User } from "../user/entity/User";
import { UserProfile } from "../user/entity/UserProfile";
import { Reservation } from "../reservation/entity/Reservation";
import { ReservationDetail } from "../reservation/entity/ReservationDetail";
import { buildSchema } from "type-graphql";
import UserResolver from "../user/User.Resolver";
import CategoryResolver from "../category/Category.Resolver";
import ProductResolver from "../product/Product.Resolver";
import LangResolver from "../lang/Lang.Resolver";
import ReservationResolver from "../reservation/Reservation.Resolver";
import { ApolloServer } from "apollo-server-express";
import { JWT_SECRET } from "..";

let inMemoryDb: sqlite3.Database;
export function testDbSetupt(): DataSource {
    // inMemoryDb = new Database(":memory:", { verbose: console.log });
    // inMemoryDb = new sqlite3.Database(":memory:");
    inMemoryDb = new sqlite3.Database(
        ":memory:",
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        (err) => {
            if (err) {
                console.error("Error opening SQLite in-memory database:", err);
            }
        },
    );

    const testDatasource = new DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: [
            User,
            UserProfile,
            Lang,
            Category,
            Product,
            Reservation,
            ReservationDetail,
        ],
        synchronize: true,
        logging: ["error", "query"],
    });

    return testDatasource;
}

export function testDbTeardown(): void {
    inMemoryDb.close();
}

export async function testAppoloServerSetup(): Promise<any> {
    const typeGraphQLgeneratedSchema = await buildSchema({
        validate: { forbidUnknownValues: false },
        resolvers: [
            UserResolver,
            CategoryResolver,
            ProductResolver,
            LangResolver,
            ReservationResolver,
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
}
