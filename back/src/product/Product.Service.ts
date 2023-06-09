import {CategoryService} from "../category/Category.Service";
import {UpdateCategoryInput} from "../category/inputs/UpdateCategoryInput";
import dataSource from "../utils";
import {Product} from "./entity/Product";
import {CreateProductInput} from "./inputs/CreateProductInput";

export class ProductService {
	productRepository = dataSource.getRepository(Product);
	categoryService;
	constructor() {
		this.categoryService = new CategoryService();
	}

	async getAllProducts(): Promise<Product[]> {
		try {
			const products = await this.productRepository.find();

			return products;
		} catch (err: any) {
			throw new Error(err.message);
		}
	}

	async getOneProducts(id: string): Promise<Product> {
		try {
			const product = await this.productRepository.findOneOrFail({where: {id}});

			return product;
		} catch (err: any) {
			throw new Error(err.message);
		}
	}

	async createNewProduct(
		createCategoryInput: CreateProductInput
	): Promise<Product> {
		try {
			const {name, price, stock, available, description, picture, category} =
				createCategoryInput;

			const foundCategory = await this.categoryService.getOneCategory(category);

			console.log(foundCategory);

			const newProduct = this.productRepository.create({
				name,
				price,
				stock,
				available,
				description,
				picture,
			});

			/** we have to do this because assigning categories in the create
			 * method above doesn't work as categories is not an array yet
			 */

			newProduct.categories = [];
			newProduct.categories = [...newProduct.categories, foundCategory];

			await this.productRepository.save(newProduct);

			console.log(newProduct);

			return newProduct;
		} catch (err: any) {
			throw new Error(err.message);
		}
	}

	async updateOneProduct(
		id: string,
		updateCategorieInput: UpdateCategoryInput
	): Promise<Product> {
		try {
			await this.productRepository.update({id}, updateCategorieInput);

			const updatedProduct = await this.productRepository.findOneOrFail({
				where: {id},
			});
			// TODO check the UpdateResult Obj to verify that the update took place before returning Product
			return updatedProduct;
		} catch (err: any) {
			throw new Error(err.message);
		}
	}

	async deleteOneProduct(id: string): Promise<boolean> {
		try {
			await this.productRepository.delete({id});
			// TODO check the DeleteResult Obj to verify that the deletion took place before returning true
			console.log(await this.productRepository.delete({id}));

			return true;
		} catch (err: any) {
			throw new Error(err.message);
		}
	}
}
