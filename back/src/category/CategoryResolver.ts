import {Arg, Mutation, Resolver} from "type-graphql";

import {Category} from "./entity/Category";
import {CategoryService} from "./CategoryService";

@Resolver()
export class CategoryResolver {
	service;
	constructor() {
		this.service = new CategoryService();
	}

	@Mutation(() => Category)
	async createCategory(@Arg("name") name: string): Promise<Category> {
		return await this.service.createNewCategory(name);
	}
}
