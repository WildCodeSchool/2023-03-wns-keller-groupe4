import {ILike} from "typeorm";
import {CategoryService} from "../category/Category.Service";
import {UpdateCategoryInput} from "../category/inputs/UpdateCategoryInput";
import dataSource from "../utils";
import {Product} from "./entity/Product";
import {CreateProductInput} from "./inputs/CreateProductInput";
import { GetProductsInput } from "./inputs/GetProductsInput";

export class ProductService {
	productRepository = dataSource.getRepository(Product);
	categoryService;
	constructor() {
		this.categoryService = new CategoryService();
	}

	async getAllProducts(getProductsInput: GetProductsInput | undefined): Promise<Product[]> {
		if (getProductsInput === undefined) {
			try {
				const products = await this.productRepository.find();
				return products;
			} catch (err: any) {
				throw new Error(err.message);
			}
		}
		const {limit, offset, name, orderBy, orderDirection} = getProductsInput;
        try {
            if (name === undefined) {
                const products = await this.productRepository.find({
                    take: limit,
                    skip: offset,
					order: {
						[orderBy]: orderDirection, 
					},
                });
                return products;
            }
            
            const products = await this.productRepository.find({
                take: limit,
                skip: offset,
                where: { name: ILike(`%${name}%`) },
				order: {
					[orderBy]: orderDirection, 
				},
            });
            return products;
            
        } catch (err: any) {
          throw new Error(err.message);
        }
	}

	async getOneProduct(id: string): Promise<Product> {
		try {
			const product = await this.productRepository.findOneOrFail({
				where: {id},
				relations: {categories: true},
			});

			return product;
		} catch (err: any) {
			throw new Error(err.message);
		}
	}

    async getProductsCount(name: string | undefined): Promise<number> {
        try {
            if (name === undefined) {
                const count = await this.productRepository.count();
                return count;
            }

            const count = await this.productRepository.count({
                where: { name: ILike(`%${name}%`) },
            });
            return count;
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

			const newProduct = this.productRepository.create({
				name,
				price,
				stock,
				available,
				description,
				picture,
			});

			// We check if the category sent by the client exists in DB
			if (category !== undefined) {
				for (let index = 0; index < category.length; index++) {
					const element = category[index];
					const foundCategory = await this.categoryService.getOneCategory(
						element
					);
					/** we have to do this because assigning categories in the create
					 * method above doesn't work as categories is not an array yet
					 */
					newProduct.categories = [];
					newProduct.categories = [...newProduct.categories, foundCategory];
				}
			}

			await this.productRepository.save(newProduct);

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

			return true;
		} catch (err: any) {
			throw new Error(err.message);
		}
	}
}
