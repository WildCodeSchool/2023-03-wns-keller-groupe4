import {Field, InputType} from "type-graphql";
import {Product} from "../entity/Product";

@InputType()
export class CreateProductInput implements Partial<Product> {
	@Field()
	name: string;

	@Field()
	price: number;

	@Field()
	stock: number;

	@Field()
	available: boolean;

	@Field()
	description: string;

	@Field()
	picture: string;

	@Field()
	category: string;

	// categories cause they can be several categories for a product it's type is a category array
}
