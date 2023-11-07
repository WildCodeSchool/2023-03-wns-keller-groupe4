import "reflect-metadata";
import { DataSource } from "typeorm";
// import Database from "better-sqlite3";
import * as jwt from "jsonwebtoken";
import { Database } from "sqlite3";
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

const sqlite3 = require("sqlite3").verbose();

let inMemoryDb: Database;
export function testDbSetupt(): DataSource {
    inMemoryDb = new sqlite3.Database(":memory:");

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
    // inMemoryDb.close();
    inMemoryDb.close((err) => {
        if (err) {
            console.error("Error closing SQLite in-memory database:", err);
        }
    });
}
