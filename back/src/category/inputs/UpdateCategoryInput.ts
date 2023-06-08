import {Field, InputType} from "type-graphql";

@InputType()
export class UpdateCategoryInput {
	@Field()
	name: string;

	@Field()
	description: string;
}

// export interface UpdateCategoryInput {
// 	id: string;
// 	name: string;

// }
