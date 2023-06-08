import dataSource from "../utils";
import {Category} from "./entity/Category";
import {CreateCategoryInput} from "./inputs/CreateCategoryInput";
import {UpdateCategoryInput} from "./inputs/UpdateCategoryInput";

export class CategoryService {
	categoryRepository = dataSource.getRepository(Category);

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
				where: {id},
			});
			return category;
		} catch (err: any) {
			throw new Error(err.message);
		}
	}

	async createNewCategory(
		createCategoryInput: CreateCategoryInput
	): Promise<Category> {
		try {
			const category = new Category();

			category.name = createCategoryInput.name;

			if (createCategoryInput.description !== null) {
				category.description = createCategoryInput.description;
			}

			return await dataSource.getRepository(Category).save(category);
		} catch (err: any) {
			throw new Error(err.message);
		}
	}

	async deleteOneCategory(id: string): Promise<boolean> {
		try {
			await this.categoryRepository.delete({id});
			console.log(await this.categoryRepository.delete({id}));

			return true;
		} catch (err: any) {
			throw new Error(err.message);
		}
	}

	async updateOneCategory(
		id: string,
		updateCategorieInput: UpdateCategoryInput
	): Promise<Category> {
		try {
			console.log(id);

			await this.categoryRepository.update({id}, updateCategorieInput);
			const foundCategory = await this.categoryRepository.findOneOrFail({
				where: {id},
			});

			return foundCategory;
		} catch (err: any) {
			throw new Error(err.message);
		}
	}
}
