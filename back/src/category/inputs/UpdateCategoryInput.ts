import {Field, InputType} from "type-graphql";
import {Category} from "../entity/Category";

@InputType()
export class UpdateCategoryInput implements Partial<Category> {
	@Field()
	name?: string;
}
