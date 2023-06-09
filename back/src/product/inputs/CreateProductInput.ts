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
}