import "reflect-metadata";
import { DataSource } from "typeorm";
import Database from "better-sqlite3";
import { Category } from "../category/entity/Category";
import { Lang } from "../lang/entity/Lang";
import { Product } from "../product/entity/Product";
import { User } from "../user/entity/User";
import { UserProfile } from "../user/entity/UserProfile";

export class TestHelper {
    private static _instance: TestHelper;

    constructor() {
        this.testDatasource = new DataSource({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            entities: [User, UserProfile, Lang, Category, Product],
            synchronize: true,
            logging: false,
        });
    }

    public static get instance(): TestHelper {
        this._instance = new TestHelper();

        return this._instance;
    }

    private testdb!: any;
    public testDatasource!: DataSource;

    setupTestDB(): void {
        this.testdb = new Database(":memory:", { verbose: console.log });
    }

    async teardownTestDB(): Promise<void> {
        // await this.Datasource.dropDatabase();
        // this.testdb.close();
        console.log(this.testdb);
    }
}
