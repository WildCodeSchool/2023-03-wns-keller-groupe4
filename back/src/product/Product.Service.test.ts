import { Repository } from "typeorm";
import { sum } from "../sum";
import { ProductService } from "./Product.Service";
import { CreateProductInput } from "./inputs/CreateProductInput";
import { Product } from "./entity/Product";

test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
});

describe("ProductService", () => {
    let productService: ProductService;
    let productRepository: Repository<Product>;

    beforeAll(() => {
        productService = new ProductService();
    });

    describe("createNewProduct", () => {
        it("Should call product repository and return created product", async () => {
            const spyRepoProductCreate = jest
                .spyOn(productRepository, "create")
                .mockImplementationOnce(
                    jest.mocked(Product as jest.MockedClass<typeof Product>),
                );
            const ProductInputMock = CreateProductInput as jest.MockedClass<
                typeof CreateProductInput
            >;

            const productInput = new ProductInputMock();

            const createdProduct = await productService.createNewProduct(
                productInput,
            );
        });
    });
});
