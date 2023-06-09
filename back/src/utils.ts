import { DataSource } from "typeorm";
import { User } from "./user/entity/User";
import { Category } from "./category/entity/Category";
import { Product } from "./product/entity/Product";
import { UserProfile } from "./user/entity/UserProfile";
import { Lang } from "./lang/entity/Lang";

const dataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "postgres",
    password: process.env.POSTGRES_PASSWORD,
    database: "postgres",
    synchronize: true,
    entities: [User, UserProfile, Lang, Product, Category],
});

export default dataSource;
