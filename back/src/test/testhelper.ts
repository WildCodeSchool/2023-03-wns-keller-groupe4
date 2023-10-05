import "reflect-metadata";
import { DataSource } from "typeorm";
import Database from "better-sqlite3";
import { Category } from "../category/entity/Category";
import { Lang } from "../lang/entity/Lang";
import { Product } from "../product/entity/Product";
import { User } from "../user/entity/User";
import { UserProfile } from "../user/entity/UserProfile";

let inMemoryDb: any;
export function testDbSetupt(): DataSource {
    inMemoryDb = new Database(":memory:", { verbose: console.log });

    const testDatasource = new DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: [User, UserProfile, Lang, Category, Product],
        synchronize: true,
        logging: ["error", "query"],
    });

    return testDatasource;
}

export function testDbTeardown(): void {
    inMemoryDb.close();
}
