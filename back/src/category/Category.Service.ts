import { Repository } from "typeorm";
import dataSource from "../utils";
import { Category } from "./entity/Category";
import { CreateCategoryInput } from "./inputs/CreateCategoryInput";
import { UpdateCategoryInput } from "./inputs/UpdateCategoryInput";

export class CategoryService {
    categoryRepository;
    constructor(categoryRepository?: Repository<Category>) {
        this.categoryRepository =
            categoryRepository !== undefined
                ? categoryRepository
                : dataSource.getRepository(Category);
    }

    async getAllCategories(): Promise<Category[]> {
        try {
            const categories = await this.categoryRepository.find();
            return categories;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async getOneCategory(id: string): Promise<Category> {
        try {
            const category = await this.categoryRepository.findOneOrFail({
                where: { id },
            });
            return category;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async getOneCategoryByName(name: string): Promise<Category> {
        try {
            const category = await this.categoryRepository.findOneOrFail({
                where: { name },
            });
            return category;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async createNewCategory(
        createCategoryInput: CreateCategoryInput,
    ): Promise<Category> {
        try {
            const category = new Category();

            category.name = createCategoryInput.name;

            return await this.categoryRepository.save(category);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async updateOneCategory(
        id: string,
        updateCategorieInput: UpdateCategoryInput,
    ): Promise<Category> {
        try {
            await this.categoryRepository.update({ id }, updateCategorieInput);

            const foundCategory = await this.categoryRepository.findOneOrFail({
                where: { id },
            });

            // TODO check the UpdateResult Obj to verify that the update took place before returning Category

            return foundCategory;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async deleteOneCategory(id: string): Promise<boolean> {
        try {
            await this.categoryRepository.delete({ id });
            // TODO check the DeleteResult Obj to verify that the deletion took place before returning true

            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
