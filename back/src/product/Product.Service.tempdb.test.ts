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

// }));
// test("adds 1 + 2 to equal 3", () => {
//     expect(sum(1, 2)).toBe(3);
// });

jest.mock("../category/Category.Service");

describe("ProductService", () => {
    let productService: ProductService;

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

    // afterAll(async () => {
    //     await TestHelper.instance.teardownTestDB();
    // });

    describe("createNewProduct", () => {
        it("Should call product repository and return created product", async () => {
            jest.spyOn(productService.categoryService, "getOneCategory");

            const createdProduct = await productService.createNewProduct(
                createProductInputMock,
            );
            expect(productService.categoryService).toBeCalledTimes(1);
            expect(createdProduct).toBeDefined();
        });
    });
});
