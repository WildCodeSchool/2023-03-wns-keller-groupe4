import {Arg, Args, Mutation, Query, Resolver} from "type-graphql";
import {Product} from "./entity/Product";
import {ProductService} from "./Product.Service";
import {CreateProductInput} from "./inputs/CreateProductInput";
import {UpdateProductInput} from "./inputs/UpdateProductInput";
import { GetProductsInput } from "./inputs/GetProductsInput";

@Resolver()
export default class ProductResolver {
	service;
	constructor() {
		this.service = new ProductService();
	}

	@Query(() => [Product])
	async getProducts(@Args() {limit, offset, name}: GetProductsInput): Promise<Product[]> {
		// TODO Write validation classes for the queries input
		return await this.service.getProducts(limit, offset, name);
	}

	@Query(() => Product)
	async getProduct(@Arg("id") id: string): Promise<Product> {
		// TODO Write validation classes for the queries input
		return await this.service.getOneProduct(id);
	}

	@Mutation(() => Product)
	async createProduct(
		@Arg("createProductInput") createProductInput: CreateProductInput
	): Promise<Product> {
		return await this.service.createNewProduct(createProductInput);
	}

	@Mutation(() => Product)
	async updateProduct(
		@Arg("id") id: string,
		@Arg("updateProductInput") updateProductInput: UpdateProductInput
	): Promise<Product> {
		return await this.service.updateOneProduct(id, updateProductInput);
	}

	@Mutation(() => Boolean)
	async deleteProduct(@Arg("id") id: string): Promise<boolean> {
		return await this.service.deleteOneProduct(id);
	}
}
