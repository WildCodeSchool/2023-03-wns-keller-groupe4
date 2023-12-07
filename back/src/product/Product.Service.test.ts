import "reflect-metadata";
import { ProductService } from "./Product.Service";
import {
    createNewProductInputMock,
    createTestCategoryInput,
    createTestProductInput,
} from "./mocks/productMock";
import { testDbSetup, testDbTeardown } from "../testUtils/testhelper";
import { Product } from "./entity/Product";
import { DataSource, Repository } from "typeorm";
import { CategoryService } from "../category/Category.Service";
import { Category } from "../category/entity/Category";
import { UpdateProductInput } from "./inputs/UpdateProductInput";
import { CreateProductInput } from "./inputs/CreateProductInput";
import dataSource from "../utils";

jest.mock("../category/Category.Service");

describe("ProductService", () => {
    let productService: ProductService;
    let mockCategoryService: jest.Mocked<CategoryService>;
    let testDataSource: DataSource;
    let categoryRepository: Repository<Category>;
    let productRepository: Repository<Product>;
    let testCategory: Category;
    let testProduct: Product;
    let createdProduct: Product;

    beforeAll(async () => {
        // Initialise the test database and the test repositories
        testDataSource = testDbSetup();

        await testDataSource.initialize();

        if (!dataSource.isInitialized) {
            throw new Error("test database could not be initialised");
        }
        categoryRepository = testDataSource.getRepository(Category);
        productRepository = testDataSource.getRepository(Product);

        // Here we create a category to be used in all tests
        testCategory = await categoryRepository.save({
            ...createTestCategoryInput,
            products: [],
        });

        mockCategoryService =
            new CategoryService() as jest.Mocked<CategoryService>;

        // We provide the test product repository created for testing environment and our mocked categoryService

        productService = new ProductService(
            productRepository,
            mockCategoryService,
        );
    });
    beforeEach(async () => {
        testProduct = await productRepository.save({
            ...createTestProductInput,
            categories: [testCategory],
        });

        await productRepository.save(testProduct);
    });

    afterEach(async () => {
        await productRepository.delete(testProduct.id);
    });

    afterAll(async () => {
        await testDataSource.dropDatabase();

        testDbTeardown();
    });

    describe("createNewProduct", () => {
        it("Should call product repository and return created product", async () => {
            // We mock the categoryService to return the testCategory (created in the beforeAll hook)
            // when the getOneCategory method is called
            mockCategoryService.getOneCategory.mockResolvedValue({
                id: testCategory.id,
                name: testCategory.name,
                products: testCategory.products,
            });
            // Why spy on the real implementation productRepository.save
            const repoSpy = jest.spyOn(
                productService.productRepository,
                "save",
            );

            // We call the createNewProduct method that we want to test
            createdProduct = await productService.createNewProduct(
                createNewProductInputMock[0],
            );

            // We write our assertions to verify expected behaviour
            expect(mockCategoryService.getOneCategory).toBeCalledTimes(1);
            expect(createdProduct).toBeDefined();
            expect(createdProduct.name).toEqual(
                createNewProductInputMock[0].name,
            );
            expect(createdProduct.categories[0].id).toEqual(testCategory.id);
            expect(repoSpy).toHaveBeenCalled();
        });

        it("Should throw an error when category does not exist", async () => {
            mockCategoryService.getOneCategory.mockResolvedValue(
                Promise.reject(),
            );

            await expect(
                productService.createNewProduct(createNewProductInputMock[0]),
            ).rejects.toThrow();
        });

        it("Should throw an error when product input is invalid", async () => {
            await expect(
                productService.createNewProduct({
                    ...createNewProductInputMock[0],
                    name: 42 as any,
                    invalidField: "invalidField" as any,
                } as CreateProductInput),
            ).rejects.toThrow();
        });
    });
    describe("getAllProducts", () => {
        it("should return all products", async () => {
            const allProductsArray = await productService.getAllProducts();

            expect(Array.isArray(allProductsArray)).toBe(true);
            expect(allProductsArray.length).toBeGreaterThan(0);
        });
    });

    describe("getOneProduct", () => {
        it("should return a product by ID", async () => {
            const repoSpy = jest.spyOn(
                productService.productRepository,
                "findOneOrFail",
            );
            const retrievedProduct = await productService.getOneProduct(
                testProduct.id,
            );

            expect(retrievedProduct.id).toEqual(testProduct.id);
            expect(repoSpy).toHaveBeenCalled();
        });

        it("should throw an error for an invalid product ID", async () => {
            await expect(
                productService.getOneProduct("invalidProductId"),
            ).rejects.toThrow();
        });
    });

    describe("updateOneProduct", () => {
        it("should update a product by ID", async () => {
            const repoSpy = jest.spyOn(
                productService.productRepository,
                "update",
            );

            const updatedProduct = await productService.updateOneProduct(
                testProduct.id,
                { name: "updatedName" },
            );
            expect(updatedProduct.id).toEqual(testProduct.id);
            expect(updatedProduct.name).toEqual("updatedName");
            expect(repoSpy).toHaveBeenCalled();
        });
        it("should thrown an error when update payload values differs from what is expected", async () => {
            await expect(
                productService.updateOneProduct(testProduct.id, {
                    name: 42 as any,
                    invalidField: "invalidField" as any,
                } as UpdateProductInput),
            ).rejects.toThrow();
        });
    });

    describe("deleteOneProduct", () => {
        it("Should delete a product by ID", async () => {
            const repoSpy = jest.spyOn(
                productService.productRepository,
                "delete",
            );

            const deletedProduct = await productService.deleteOneProduct(
                testProduct.id,
            );

            const findDeletedProduct = await productRepository.findOne({
                where: { id: testProduct.id },
            });

            expect(deletedProduct).toBe(true);
            expect(findDeletedProduct).toBe(null);
            expect(repoSpy).toHaveBeenCalled();
        });
    });
});
