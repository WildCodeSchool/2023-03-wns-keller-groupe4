import {DataSource} from "typeorm";
import {User} from "./entity/User";
import {Category} from "./category/entity/Category";
import {Product} from "./product/entity/Product";

const dataSource = new DataSource({
	type: "postgres",
	host: "db",
	port: 5432,
	username: "postgres",
	password: process.env.POSTGRES_PASSWORD,
	database: "postgres",
	synchronize: true,
	entities: [User, Product, Category],
});

export default dataSource;
