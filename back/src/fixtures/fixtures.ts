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
import {
    EnumStatusReservation,
    Reservation,
} from "../reservation/entity/Reservation";
import { User } from "../user/entity/User";

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
    const reservationRepository = dataSource.getRepository(Reservation);
    const userRepository = dataSource.getRepository(User);

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

    // this is moved here in the file because we need the product to be created so we can
    // create user reservations
    if (resetMockUsers || resetMockProducts) {
        resetMockUsers && console.log("resetMockUsers is true");
        resetMockProducts && console.log("resetMockProduct is true");
        // delete any preivous reservations so we can create new ones with new products
        await reservationRepository.delete({});

        for (const user of mockUsers) {
            const userService = new UserService();
            const reservationService = new ReservationService();
            try {
                await userService.getOneUserByEmail(user.email);
            } catch (error: any) {
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (!error.message.includes("not find")) {
                    console.error(error.message);
                }
                await userService.createOneUser(user);
            }

            const foundUser = await userService.getOneUserByEmail(user.email);

            let user_id = foundUser.id;

            // Use the found user to create a reservation

            await reservationService.createOneReservation({
                user_id,
                status: EnumStatusReservation.IN_CART,
                reservationsDetails: [],
            });

            // For each status we create one reservation for the user
            const reservationStatusArray = Array.from(
                Object.values(EnumStatusReservation),
            );

            for (const status of reservationStatusArray) {
                if (status !== "in_cart") {
                    const reservation = new Reservation();

                    reservation.user = foundUser;
                    reservation.status = status;

                    await reservationRepository.save(reservation);
                }
            }

            // find product id's from productRepository.find()

            const foundProductArray = await productRepository.find();

            // add product detail to reservation detail by providing product id

            const updatedFoundUser = await userService.getOneUserById(
                foundUser.id,
            );
            // Loop to add details to the reservations created before
            for (let i = 0; i < 5; i++) {
                const startDate = new Date();
                const endDate = new Date();
                startDate.setDate(
                    i < 2
                        ? startDate.getDate() + i - 1
                        : startDate.getDate() + i - (i - 2),
                );
                endDate.setDate(endDate.getDate() + i + 5);

                for (const userReservation of updatedFoundUser.reservations) {
                    await reservationService.updateDetailFromOneReservation(
                        userReservation.id,

                        {
                            product_id:
                                foundProductArray[
                                    Math.floor(Math.random() * 63)
                                ].id,
                            quantity: Math.floor(Math.random() * 3 + 1),
                            start_at: startDate,
                            end_at: endDate,
                        },
                    );
                }
            }
        }
    }
};
