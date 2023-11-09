import { Category } from "../category/entity/Category";
import {
    IMockProduct,
    categoriesNames,
    mockProducts,
    mockUsers,
} from "./mockDataArray";
import { ProductService } from "../product/Product.Service";
import UserService from "../user/User.Service";
import { Product } from "../product/entity/Product";
import dataSource from "../utils";
import ReservationService from "../reservation/Reservation.Service";
import { EnumStatusReservation } from "../reservation/entity/Reservation";

export let resetMockCategories = process.env.DATA_FIXTURE_CATEGORIES === "true";
export let resetMockProducts = process.env.DATA_FIXTURE_PRODUCTS === "true";
export let resetMockUsers = process.env.DATA_FIXTURE_USERS === "true";
export const resetAllMockData = process.env.ALL_DATA_FIXTURES === "true";

if (resetAllMockData) {
    resetMockCategories = true;
    resetMockProducts = true;
    resetMockUsers = true;
}

export const dataFixtureWipe = resetMockCategories;

export const dataFixture = async (): Promise<void> => {
    const categoryRepository = dataSource.getRepository(Category);
    const productRepository = dataSource.getRepository(Product);

    if (resetMockCategories) {
        console.log("resetMockCategories is true");
        // This creates the different categories, to add one simply modify the JSON in mockData.ts
        for (let index = 0; index < categoriesNames.length; index++) {
            await categoryRepository.save({
                name: categoriesNames[index],
            });
        }
    }

    // The issue is all the mock data for products doesn't have category provided. In the case where the category property of a product is a null array this aims to finds the matching category using the products name
    if (resetMockProducts) {
        console.log("resetMockProducts is true");
        const productService = new ProductService();

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
                const productRepository = dataSource.getRepository(Product);

                await productService.createNewProduct({
                    stock,
                    price,
                    name,
                    available,
                    description,
                    picture,
                    category: categories,
                });
            }
        }
    }

    if (resetMockUsers) {
        console.log("resetMockUsers is true");

        for (const user of mockUsers) {
            const userService = new UserService();
            const reservationService = new ReservationService();
            try {
                await userService.getOneUserByEmail(user.email);

                // For each user of the usermock array create a reservation with a random number of products for random dates
            } catch (error: any) {
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (!error.message.includes("not find")) {
                    console.error(error.message);
                }
                await userService.createOneUser(user);
                const foundUser = await userService.getOneUserByEmail(
                    user.email,
                );

                let user_id = foundUser.id;

                // Use the found user to create a reservation

                const userReservation =
                    await reservationService.createOneReservation({
                        user_id,
                        status: EnumStatusReservation.IN_CART,
                        reservationsDetails: [],
                    });

                console.log(userReservation);

                // find product id's from productRepository.find()

                const foundProductArray = await productRepository.find();
                console.log(foundProductArray[0].id);

                // add product detail to reservation detail by providing product id

                for (let i = 0; i < 10; i++) {
                    // console.log("in for loop");
                    const startDate = new Date();
                    const endDate = new Date();
                    startDate.setDate(
                        i < 2
                            ? startDate.getDate() + i - 1
                            : startDate.getDate() + i - (i - 2),
                    );
                    endDate.setDate(endDate.getDate() + i + 5);
                    // console.log("startDate", startDate);
                    // console.log("endDate", endDate);

                    await reservationService.updateDetailFromOneReservation(
                        userReservation.id,

                        {
                            product_id:
                                foundProductArray[
                                    Math.floor(Math.random() * 63)
                                ].id,
                            quantity: 1,
                            start_at: startDate,
                            end_at: endDate,
                        },
                    );
                }
            }
        }
    }
};
