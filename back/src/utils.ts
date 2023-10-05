import { UserProfile } from "./user/entity/UserProfile";
import { Lang } from "./lang/entity/Lang";
import { DataSource } from "typeorm";
import { User } from "./user/entity/User";
import { Category } from "./category/entity/Category";
import { Product } from "./product/entity/Product";
import { dataFixtureWipe } from "./fixtures";

console.log("dataFixtureWipe", dataFixtureWipe);

const dataSource = new DataSource({
    logging: ["error"],
    type: "postgres",
    host: "db",
    port: 5432,
    username: "postgres",
    password: process.env.POSTGRES_PASSWORD,
    database: "postgres",
    synchronize: true,
    entities: [User, UserProfile, Lang, Product, Category],
    dropSchema: dataFixtureWipe,
});

export default dataSource;
