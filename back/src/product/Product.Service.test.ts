// import { sum } from "../sum";
// import { ProductService } from "./Product.Service";
// import {
//     createProductInputMock,
//     createProductResponseMock,
// } from "./mocks/productMock";
// import * as typeorm from "typeorm"; // Import the typeorm library

// test("adds 1 + 2 to equal 3", () => {
//     expect(sum(1, 2)).toBe(3);
// });

// const createMock = jest.fn().mockReturnValue(createProductResponseMock);
// const saveMock = jest.fn().mockReturnValue(createProductResponseMock);

// jest.mock("typeorm", () => ({
//     getRepository: jest.fn(() => ({
//         create: createMock,
//         save: saveMock,
//         findOneOrFail: jest.fn().mockReturnValue(createProductInputMock),
//     })),
// }));

// describe("ProductService", () => {
//     let productService: ProductService;

//     beforeAll(() => {
//         productService = new ProductService();
//     });

//     describe("createNewProduct", () => {
//         it("Should call product repository and return created product", async () => {
//             jest.spyOn(productService.categoryService, "getOneCategory");
//             const createdProduct = await productService.createNewProduct(
//                 createProductInputMock,
//             );

//             expect(createdProduct).toBeDefined();
//         });
//     });
// });
