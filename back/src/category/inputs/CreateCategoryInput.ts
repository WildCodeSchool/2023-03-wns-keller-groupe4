import {Field, InputType} from "type-graphql";
import {Category} from "../entity/Category";

@InputType()
export class CreateCategoryInput implements Partial<Category> {
	@Field()
	name: string;

	@Field({nullable: true})
	description?: string;
}
