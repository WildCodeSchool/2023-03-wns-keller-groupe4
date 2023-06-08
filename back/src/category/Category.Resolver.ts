import {Arg, Mutation, Resolver} from "type-graphql";

import {Category} from "./entity/Category";
import {CategoryService} from "./Category.Service";
import {UpdateCategoryInput} from "./inputs/UpdateCategoryInput";

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

	@Mutation(() => Boolean)
	async deleteCategory(@Arg("id") id: string): Promise<boolean> {
		return await this.service.deleteOneCategory(id);
	}

	@Mutation(() => Category)
	async updateCategory(
		@Arg("id") id: string,
		@Arg("updateCategorieInput") updateCategorieInput: UpdateCategoryInput
	): Promise<any> {
		console.log(updateCategorieInput);

		return await this.service.updateOneCategory(id, updateCategorieInput);
	}
}
