import dataSource from "../utils";
import {Category} from "./entity/Category";

export class CategoryService {
	async createNewCategory(name: string): Promise<Category> {
		try {
			const category = new Category();
			category.name = name;

			return await dataSource.getRepository(Category).save(category);
		} catch (err: any) {
			throw new Error(err.message);
		}
	}
}
