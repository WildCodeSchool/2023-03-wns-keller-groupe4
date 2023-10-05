import "reflect-metadata";
import { ProductService } from "./Product.Service";
// import { createProductInputMock } from "./mocks/productInputMock";
import {
    createProductInputMocks,
    createProductResponseMocks,
    createTestCategoryInput,
    getAllProductResponseMocks,
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
        testDataSource = testDbSetupt();

        await testDataSource.initialize();

        if (testDataSource.isInitialized) {
            categoryRepository = testDataSource.getRepository(Category);
            productRepository = testDataSource.getRepository(Product);
            testCategory = await categoryRepository.save(
                createTestCategoryInput,
            );
            testProduct = await productRepository.save(
                createProductInputMocks[1],
            );
            testProduct.categories = [testCategory];

            await productRepository.save(testProduct);

            // console.log("testDataSource is initialized");
            // here we provide a product repository created for testing environment to our product service
            mockCategoryService =
                new CategoryService() as jest.Mocked<CategoryService>;

            productService = new ProductService(
                productRepository,
                mockCategoryService,
            );
        }
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
            // console.log("Inside test", testCategory);

            createdProduct = await productService.createNewProduct(
                createProductInputMocks[0],
            );
            // console.log(createdProduct);

            expect(mockCategoryService.getOneCategory).toBeCalledTimes(1);
            expect(createdProduct).toBeDefined();
            expect(createdProduct).toEqual({
                ...createProductResponseMocks[0],
                id: createdProduct.id,
                categories: [
                    {
                        id: testCategory.id,
                        name: testCategory.name,
                        products: testCategory.products,
                    },
                ],
            });
        });
    });

    // describe("getAllProducts", () => {
    //     it("should return all products", async () => {
    //         // TODO: Create test data in the database using productRepository
    //         // Call the getAllProducts method and assert the result
    //         const allProductsArray = await productService.getAllProducts();

    //         console.log(allProductsArray);

    //         // Assert that products is an array and contains expected data
    //         expect(Array.isArray(allProductsArray)).toBe(true);
    //         expect(allProductsArray.length).toBeGreaterThan(0);
    //         // expect(allProductsArray).toContain({
    //         //     ...createProductResponseMocks[1],
    //         //     id: expect.any(String),
    //         //     categories: [
    //         //         {
    //         //             id: testCategory.id,
    //         //             name: testCategory.name,
    //         //             products: testCategory.products,
    //         //         },
    //         //     ],
    //         // });
    //         expect(allProductsArray).toContain(
    //             getAllProductResponseMocks.map((mockedProduct) => ({
    //                 ...mockedProduct,
    //                 id: expect.any(String),
    //                 categories: [
    //                     {
    //                         id: testCategory.id,
    //                         name: testCategory.name,
    //                         products: testCategory.products,
    //                     },
    //                 ],
    //             })),
    //         );

    //         // it("should return filtered products by name", async () => {
    //         //     // TODO: Create test data in the database with specific names
    //         //     // Call the getAllProducts method with a filter and assert the result
    //         //     const filteredProducts = await productService.getAllProducts({
    //         //         name: "SampleProduct",
    //         //         // Add other filter criteria if necessary
    //         //     });
    //         //     // Assert that filteredProducts contains expected data
    //         //     // Add further assertions based on your test data and filter criteria
    //         // });

    //         // Add more test cases as needed for different scenarios
    //     });
    // });
});
