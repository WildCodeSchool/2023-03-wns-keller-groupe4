import "reflect-metadata";
import { DataSource } from "typeorm";
import { Database } from "sqlite3";
import { Category } from "../category/entity/Category";
import { Lang } from "../lang/entity/Lang";
import { Product } from "../product/entity/Product";
import { User } from "../user/entity/User";
import { UserProfile } from "../user/entity/UserProfile";
import { Reservation } from "../reservation/entity/Reservation";
import { ReservationDetail } from "../reservation/entity/ReservationDetail";
import { Invoice } from "../invoice/entity/Invoice";
import { UserBilling } from "../invoice/UserBilling";

const sqlite3 = require("sqlite3").verbose();

let inMemoryDb: Database;
export function testDbSetup(): DataSource {
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
            Invoice,
            UserBilling,
        ],
        synchronize: true,
        logging: ["error", "query"],
    });

    return testDatasource;
}

export function testDbTeardown(): void {
    inMemoryDb.close((err) => {
        if (err) {
            console.error("Error closing SQLite in-memory database:", err);
        }
    });
}
