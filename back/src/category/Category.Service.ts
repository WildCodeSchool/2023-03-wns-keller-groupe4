import dataSource from "../utils";
import {Category} from "./entity/Category";
import {UpdateCategoryInput} from "./inputs/UpdateCategoryInput";

export class CategoryService {
	categoryRepository = dataSource.getRepository(Category);

	async createNewCategory(name: string): Promise<Category> {
		try {
			const category = new Category();
			category.name = name;

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
	): Promise<any> {
		try {
			// const {id, name, description} = updateCategorieInput;
			// const category = await this.categoryRepository.findOne({where: {id}});
			// if (category == null) {
			// 	throw new Error("category doesn't exist");
			// }
			const updatedCategory = this.categoryRepository.update(
				{id},
				updateCategorieInput
			);
			console.log(updatedCategory);
		} catch (err: any) {
			throw new Error(err.message);
		}
	}
}
