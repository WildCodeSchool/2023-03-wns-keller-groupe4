import "reflect-metadata";
import { ProductService } from "./Product.Service";
// import { createProductInputMock } from "./mocks/productInputMock";
import { createProductInputMock } from "./mocks/productMock";
import { TestHelper } from "../test/testhelper";
import { Product } from "./entity/Product";

// }));
// test("adds 1 + 2 to equal 3", () => {
//     expect(sum(1, 2)).toBe(3);
// });

jest.mock("../category/Category.Service");

describe("ProductService", () => {
    let productService: ProductService;

    beforeAll(async () => {
        TestHelper.instance.setupTestDB();
        const testDataSource = TestHelper.instance.testDatasource;
        await testDataSource.initialize();

        if (testDataSource.isInitialized) {
            console.log("testDataSource is initialized");

            productService = new ProductService({
                productRepository: testDataSource.getRepository(Product),
            });
            console.log(productService.productRepository);
        }
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
