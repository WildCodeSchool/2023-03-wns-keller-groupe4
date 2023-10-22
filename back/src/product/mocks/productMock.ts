import { CreateProductInput } from "../inputs/CreateProductInput";

export const createTestProductInput = {
    name: "FGHIJ",
    price: 100,
    stock: 50,
    available: true,
    description: "FGHIJ",
    picture: "BASE64PIC",
};

export const createNewProductInputMock: CreateProductInput[] = [
    {
        name: "ABCDE",
        price: 50,
        stock: 0,
        available: false,
        description: "ABCDEF",
        picture: "BASE64PIC",
        category: ["8a1e61e7-e8f6-4630-b000-eb17f34ee489"],
    },
];

// TODO MOVE THIS TO A CATE MOCK FOLDER

export const createTestCategoryInput = {
    name: "Test Catégorie",
};

export const createProductResponseMocks = [
    {
        name: "ABCDE",
        price: 50,
        stock: 0,
        available: false,
        description: "ABCDEF",
        picture: "BASE64PIC",
        created_at: null,
        updated_at: null,
        updated_by: null,
        categories: [
            {
                id: "",
                name: "Test Catégorie",
                products: undefined,
            },
        ],
    },
];
export const getAllProductResponseMocks = [
    {
        id: "",
        name: "ABCDE",
        price: 50,
        stock: 0,
        available: false,
        description: "ABCDEF",
        picture: "BASE64PIC",
        created_at: null,
        updated_at: null,
        updated_by: null,
        categories: [
            {
                id: "",
                name: "Test Catégorie",
                products: undefined,
            },
        ],
    },
    {
        id: "",
        name: "FGHIJ",
        price: 100,
        stock: 50,
        available: true,
        description: "FGHIJ",
        picture: "BASE64PIC",
        created_at: null,
        updated_at: null,
        updated_by: null,
        categories: [
            {
                id: "",
                name: "Test Catégorie",
                products: undefined,
            },
        ],
    },
];
