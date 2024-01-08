import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Product } from "./entity/Product";
import { ProductService } from "./Product.Service";
import { CreateProductInput } from "./inputs/CreateProductInput";
import { UpdateProductInput } from "./inputs/UpdateProductInput";
import { GetProductsInput } from "./inputs/GetProductsInput";
import { SearchProductInput } from "./inputs/SearchProductInput";

@Resolver()
export default class ProductResolver {
    service;
    constructor() {
        this.service = new ProductService();
    }

    @Query(() => [Product])
    async getProducts(
        @Arg("getProductsInput", { nullable: true })
        getProductsInput: GetProductsInput,
    ): Promise<Product[]> {
        // TODO Write validation classes for the queries input
        return await this.service.getAllProducts(getProductsInput);
    }

    @Query(() => Number)
    async getProductsCount(
        @Arg("name", { nullable: true }) name: string,
    ): Promise<number> {
        return await this.service.getProductsCount(name);
    }

    @Query(() => [Product])
    async getProductsByCategory(
        @Arg("id_category") idCategory: string,
    ): Promise<Product[]> {
        // TODO Write validation classes for the queries input
        return await this.service.getAllProductsByCategory(idCategory);
    }

    @Query(() => Product)
    async getProduct(@Arg("id") id: string): Promise<Product> {
        // TODO Write validation classes for the queries input
        return await this.service.getOneProduct(id);
    }

    @Query(() => [Product])
    async getProductsById(
        @Arg("productsIds", (type) => [String]) ProductsIds: string[],
    ): Promise<Product[]> {
        return await this.service.getProductsById(ProductsIds);
    }

    @Query(() => [Product])
    async getProductBySearcgFilter(
        @Arg("searchProductInput") searchProductInput: SearchProductInput,
    ): Promise<Product[]> {
        return await this.service.getProductBySearchFilter(searchProductInput);
    }

    @Mutation(() => Product)
    async createProduct(
        @Arg("createProductInput") createProductInput: CreateProductInput,
    ): Promise<Product> {
        return await this.service.createNewProduct(createProductInput);
    }

    @Mutation(() => Product)
    async updateProduct(
        @Arg("id") id: string,
        @Arg("updateProductInput") updateProductInput: UpdateProductInput,
    ): Promise<Product> {
        return await this.service.updateOneProduct(id, updateProductInput);
    }

    @Mutation(() => Boolean)
    async deleteProduct(@Arg("id") id: string): Promise<boolean> {
        return await this.service.deleteOneProduct(id);
    }
}
