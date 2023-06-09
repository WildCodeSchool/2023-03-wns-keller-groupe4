import {Arg, Mutation, Query, Resolver} from "type-graphql";

import {Category} from "./entity/Category";
import {CategoryService} from "./Category.Service";
import {UpdateCategoryInput} from "./inputs/UpdateCategoryInput";
import {CreateCategoryInput} from "./inputs/CreateCategoryInput";

@Resolver()
export default class CategoryResolver {
	service;
	constructor() {
		this.service = new CategoryService();
	}

	@Query(() => [Category])
	async getCategories(): Promise<Category[]> {
		// TODO Write validation classes for the queries input
		return await this.service.getAllCategories();
	}

	@Query(() => Category)
	async getCategory(@Arg("id") id: string): Promise<Category> {
		// TODO Write validation classes for the queries input
		return await this.service.getOneCategory(id);
	}

	@Mutation(() => Category)
	async createCategory(
		@Arg("createCategorieInput") createCategoryInput: CreateCategoryInput
	): Promise<Category> {
		console.log(createCategoryInput);

		return await this.service.createNewCategory(createCategoryInput);
	}

	@Mutation(() => Category)
	async updateCategory(
		@Arg("id") id: string,
		@Arg("updateCategorieInput") updateCategorieInput: UpdateCategoryInput
	): Promise<Category> {
		console.log(updateCategorieInput);

		return await this.service.updateOneCategory(id, updateCategorieInput);
	}

	@Mutation(() => Boolean)
	async deleteCategory(@Arg("id") id: string): Promise<boolean> {
		return await this.service.deleteOneCategory(id);
	}
}