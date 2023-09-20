import { Repository } from "typeorm";
import { Category } from "./category/entity/Category";
import { IMockProduct, categoriesNames, mockProducts } from "./mockDataArray";
import { ProductService } from "./product/Product.Service";
import { Product } from "./product/entity/Product";

export const resetMockCategories =
    process.env.DATA_FIXTURE_CATEGORIES === "true";
export const resetMockProducts = process.env.DATA_FIXTURE_PRODUCTS === "true";

export const dataFixtureWipe = resetMockCategories;

export const dataFixture = async (
    categoryRepository: Repository<Category>,
    productRepository: Repository<Product>,
    productService: ProductService,
): Promise<void> => {
    if (resetMockCategories) {
        // This creates the different categories, to add one simply modify the JSON in mockData.ts
        for (let index = 0; index < categoriesNames.length; index++) {
            await categoryRepository.save({
                name: categoriesNames[index],
            });
        }
    }

    // The issue is all the mock data for products doesn't have category provided. In the case where the category property of a product is a null array this aims to finds the matching category using the products name
    if (resetMockProducts) {
        // This is getting all the categories previously created so we can bind them to the products
        const categories = await categoryRepository.find();

        const poductsWithCategories: IMockProduct[] = [];

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

            poductsWithCategories.push(product);
        });

        // At this stage our products have categories so we can insert them in our database using a method from our productService
        const allDbProducts = await productService.getAllProducts();

        for (const productsToInsert of poductsWithCategories) {
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