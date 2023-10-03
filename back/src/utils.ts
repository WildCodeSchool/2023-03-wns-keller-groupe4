import {UserProfile} from "./user/entity/UserProfile";
import {Lang} from "./lang/entity/Lang";
import {DataSource} from "typeorm";
import * as dotenv from "dotenv";
import {User} from "./user/entity/User";
import {Category} from "./category/entity/Category";
import {Product} from "./product/entity/Product";

dotenv.config();

export const DATA_FIXTURE_CATEGORIES = process.env
	.DATA_FIXTURE_CATEGORIES as string;
export const DATA_FIXTURE_PRODUCTS = process.env
	.DATA_FIXTURE_PRODUCTS as string;
let dataFixtureWipe;
console.log(`DATA_FIXTURE_CATEGORIES ${DATA_FIXTURE_CATEGORIES}`);

const isDbWippingNecessary =
	DATA_FIXTURE_CATEGORIES === "true" ||
	(DATA_FIXTURE_CATEGORIES === "true" && DATA_FIXTURE_PRODUCTS === "true");

if (isDbWippingNecessary) {
	dataFixtureWipe = true;
} else {
	dataFixtureWipe = false;
}

console.log("dataFixtureWipe", dataFixtureWipe);

const dataSource = new DataSource({
	logging: ["query", "error"],
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
