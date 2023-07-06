import {Field, InputType} from "type-graphql";
import {Product} from "../entity/Product";

@InputType()
export class UpdateProductInput implements Partial<Product> {
	@Field({nullable: true})
	name?: string;

	@Field({nullable: true})
	price?: number;

	@Field({nullable: true})
	stock?: number;

	@Field({nullable: true})
	available?: boolean;

	@Field({nullable: true})
	description?: string;

	@Field({nullable: true})
	picture?: string;

	@Field({nullable: true})
	category?: string;
}
