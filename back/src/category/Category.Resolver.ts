import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { Category } from "./entity/Category";
import { CategoryService } from "./Category.Service";
import { UpdateCategoryInput } from "./inputs/UpdateCategoryInput";
import { CreateCategoryInput } from "./inputs/CreateCategoryInput";

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

    @Query(() => [Category])
    async getCategoriesBySearch(
        @Arg("searchCategoryInput") searchCategoryInput: string,
    ): Promise<Category[]> {
        const foundCategory = await this.service.getCategoriesBySearch(
            searchCategoryInput,
        );

        return foundCategory;
    }

    @Query(() => Category)
    async getCategoryByName(@Arg("name") name: string): Promise<Category> {
        // TODO Write validation classes for the queries input
        return await this.service.getOneCategoryByName(name);
    }

    @Mutation(() => Category)
    async createCategory(
        @Arg("createCategorieInput") createCategoryInput: CreateCategoryInput,
    ): Promise<Category> {
        return await this.service.createNewCategory(createCategoryInput);
    }

    @Mutation(() => Category)
    async updateCategory(
        @Arg("id") id: string,
        @Arg("updateCategorieInput") updateCategorieInput: UpdateCategoryInput,
    ): Promise<Category> {
        return await this.service.updateOneCategory(id, updateCategorieInput);
    }

    @Mutation(() => Boolean)
    async deleteCategory(@Arg("id") id: string): Promise<boolean> {
        return await this.service.deleteOneCategory(id);
    }
}
