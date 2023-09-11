import * as dotenv from "dotenv";
import { Category } from "./category/entity/Category";
import { categoriesNames, IMockProduct, mockProducts } from "./mockDataArray";
import { ProductService } from "./product/Product.Service";
import { Product } from "./product/entity/Product";
import dataSource from "./utils";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET_KEY as string;
export const DATA_FIXTURE_CATEGORIES = process.env
    .DATA_FIXTURE_CATEGORIES as string;
export const DATA_FIXTURE_PRODUCTS = process.env
    .DATA_FIXTURE_PRODUCTS as string;

export const dataFixture = async (): Promise<void> => {
    const categoryRepository = dataSource.getRepository(Category);
    const productRepository = dataSource.getRepository(Product);
    const productService = new ProductService();

    if (DATA_FIXTURE_CATEGORIES === "true") {
        // This creates the different categories, to add one simply modify the JSON in mockData.ts
        for (let index = 0; index < categoriesNames.length; index++) {
            await categoryRepository.save({
                name: categoriesNames[index],
            });
        }
    }

    // This is getting all the categories previously created so we can bind them to the products in next steps
    const categories = await categoryRepository.find();

    const resultArray: IMockProduct[] = [];
    // The issue is all the mock data for products doesn't have category provided. In the case where the category property of a product is a null array this aims to finds the matching category using the products name
    if (DATA_FIXTURE_PRODUCTS === "true") {
        mockProducts.forEach((product) => {
            const foundMatchingCategory = categories.find((category) => {
                return product.name.includes(category.name);
            });

            // This checks if no category is provided for a product, if it's the case we check if we found it using the products name and finaly if the products doesn't already belong to the category

            const needingToInferCategory =
                product.categories.length === 0 &&
                foundMatchingCategory !== undefined &&
                !product.categories.includes(foundMatchingCategory.id);

            // If all that is true , we are going to add the infered category to our product
            if (needingToInferCategory) {
                product.categories = [
                    ...product.categories,
                    foundMatchingCategory.id,
                ];
            }

            // we push the formated product in an array.

            resultArray.push(product);
        });

        // At this stage our products have categories so we can insert them in our database using a method from our productService
        const allDbProducts = await productService.getAllProducts();
        for (let index = 0; index < resultArray.length; index++) {
            const productsToInsert = resultArray[index];
            const {
                name,
                price,
                stock,
                available,
                description,
                picture,
                categories,
            } = productsToInsert;

            const productAlreadyExists = allDbProducts.find((dbProduct) => {
                return dbProduct.name === name;
            });

            if (productAlreadyExists === undefined) {
                const newProduct = await productService.createNewProduct({
                    stock,
                    price,
                    name,
                    available,
                    description,
                    picture,
                    category: categories,
                });
                await productRepository.save(newProduct);
            }
        }
    }
};

export const dataFixtureWipe = (): boolean => {
    console.log("I'm in the dataFixtureWipe function ");

    if (
        DATA_FIXTURE_CATEGORIES === "true" ||
        (DATA_FIXTURE_CATEGORIES === "true" && DATA_FIXTURE_PRODUCTS === "true")
    ) {
        return true;
    }
    return false;
};
