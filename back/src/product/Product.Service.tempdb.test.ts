import "reflect-metadata";
import { ProductService } from "./Product.Service";
// import { createProductInputMock } from "./mocks/productInputMock";
import {
    createNewProductInputMock,
    createTestCategoryInput,
    createTestProductInput,
} from "./mocks/productMock";
import { testDbSetupt, testDbTeardown } from "../test/testhelper";
import { Product } from "./entity/Product";
import { DataSource, Repository } from "typeorm";
import { CategoryService } from "../category/Category.Service";
import { Category } from "../category/entity/Category";

// }));
// test("adds 1 + 2 to equal 3", () => {
//     expect(sum(1, 2)).toBe(3);
// });

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
        testDataSource = testDbSetupt();

        await testDataSource.initialize();

        if (testDataSource.isInitialized) {
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
        }
    });
    beforeEach(async () => {
        testProduct = await productRepository.save({
            ...createTestProductInput,
            categories: [testCategory],
        });

        await productRepository.save(testProduct);

        console.log("BeforeEach testCategory", testCategory);

        console.log("BeforeEach testProduct", testProduct);
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
            // jest.spyOn(productService.categoryService, "getOneCategory").mockImplementationOnce(() => {new});
            mockCategoryService.getOneCategory.mockResolvedValue({
                id: testCategory.id,
                name: testCategory.name,
                products: testCategory.products,
            });

            createdProduct = await productService.createNewProduct(
                createNewProductInputMock[0],
            );
            expect(mockCategoryService.getOneCategory).toBeCalledTimes(1);
            expect(createdProduct).toBeDefined();
            expect(createdProduct.name).toEqual(
                createNewProductInputMock[0].name,
            );
            expect(createdProduct.categories[0].id).toEqual(testCategory.id);
        });

        describe("getAllProducts", () => {
            it("should return all products", async () => {
                // Create test data in the database
                // testProduct = await productRepository.save(
                //     createProductInputMocks[1],
                // );
                // testProduct.categories = [testCategory];

                // await productRepository.save(testProduct);

                // console.log(testProduct.id);

                testCategory = await categoryRepository.findOneOrFail({
                    where: { id: testCategory.id },
                });

                // console.log(testCategory?.products?.[0].id);

                // Call the getAllProducts method and assert the result
                const allProductsArray = await productService.getAllProducts();

                // console.log(
                //     allProductsArray?.[0]?.categories?.[0]?.products?.[0]?.id,
                // );

                // Assert that products is an array and contains expected data
                expect(Array.isArray(allProductsArray)).toBe(true);
                expect(allProductsArray.length).toBeGreaterThan(0);
            });
        });

        describe("getOneProduct", () => {
            it("should return a product by ID", async () => {
                const repoSpy = jest.spyOn(
                    productService.productRepository,
                    "findOneByOrFail",
                );
                const retrievedProduct = await productService.getOneProduct(
                    testProduct.id,
                );

                const expectedProduct = {
                    ...testProduct,
                };

                // Assert that retrievedProduct matches the created product
                expect(retrievedProduct.id).toEqual(expectedProduct.id);
                // TODO Understand why spies are not called
                // expect(repoSpy).toHaveBeenCalled();
            });

            it("should throw an error for an invalid product ID", async () => {
                // TODO: Call the getOneProduct method with an invalid product ID
                // Assert that it throws an error
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

                console.log("findDeletedProduct", findDeletedProduct);

                expect(deletedProduct).toBe(true);
                expect(findDeletedProduct).toBe(null);
                // expect(testProduct).toBe(undefined);
            });
        });
    });
});
