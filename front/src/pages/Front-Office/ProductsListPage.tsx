import { useParams } from "react-router-dom";
import { useApolloClient, useQuery } from "@apollo/client";
import {
    GET_CATEGORY_BY_NAME,
    GET_PRODUCTS_BY_CATEGORY,
} from "../../utils/queries";
import { PrevButton } from "../../components/tools/PrevButton";
import ProductsListComponent from "../../components/ProductsListComponent";
import { useEffect, useState } from "react";

export interface IProductFromAPI {
    id: number;
    name: string;
    price: number;
    stock: number;
    available: boolean;
    picture: string;
}

type CategorySlug = {
    categorySlug: string;
};

const ProductsListPage = () => {
    const { categorySlug } = useParams<CategorySlug>();
    const [categoryId, setCategoryId] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [categoryTitle, setCategoryTitle] = useState("");
    const [isSkipped, setIsSkipped] = useState(false);

    useEffect(() => {
        if (categorySlug && categorySlug !== "all") {
            const name =
                categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
            setCategoryName(name);
            setCategoryTitle(`Catégorie : ${name}`);
            setIsSkipped(false);
        } else {
            setCategoryName("Decouvrez notre catalogue complet");
            setCategoryTitle("Decouvrez notre catalogue complet");
            setCategoryId("");
            setIsSkipped(true);
        }
    }, [categorySlug]);

    // Get the category ID from API if, category name is not empty, else skip the query
    const {
        error: Qcategory_error,
        loading: Qcategory_loading,
        data: Qcategory,
    } = useQuery(GET_CATEGORY_BY_NAME, {
        skip: isSkipped,
        variables: { name: categoryName },
    });

    useEffect(() => {
        // No category name = no category ID. So it's skipped

        if (!isSkipped && Qcategory?.getCategoryByName) {
            setCategoryId(Qcategory.getCategoryByName.id);
        }
    }, [Qcategory, isSkipped]);

    // Init vars

    // Get products by category ID from API
    const {
        error: Qproducts_error,
        loading: Qproducts_loading,
        data: products,
    } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
        skip: categorySlug === "all" ? false : !categoryId,
        variables: { idCategory: categoryId },
    });

    // Loadings and errors states
    if (Qcategory_loading)
        return (
            <p className="p-5 text-center">
                Chargement de la catégorie en cours...
            </p>
        );
    if (Qcategory_error && categoryName !== "") {
        return (
            <div
                className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 m-5"
                role="alert"
            >
                <p className="font-bold">Erreur</p>
                <p>
                    La catégorie de produits{" "}
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                        {categoryName}
                    </span>{" "}
                    n'existe pas. Veuillez réessayer avec une autre catégorie.
                </p>
            </div>
        );
    }

    if (Qproducts_loading)
        return (
            <p className="text-center p-5">
                Chargement des produits en cours...
            </p>
        );
    if (Qproducts_error) {
        return (
            <div
                className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 m-5"
                role="alert"
            >
                <p className="font-bold">Erreur</p>
                <p>Une erreur est survenue. Veuillez réessayer</p>
            </div>
        );
    }

    // No product found
    if (products?.getProductsByCategory.length === 0) {
        return (
            <div
                className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 m-5"
                role="alert"
            >
                <p className="font-bold">Information</p>
                <p>
                    La catégorie{" "}
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                        {categoryName}
                    </span>{" "}
                    ne contient aucun produits pour le moment.
                </p>
            </div>
        );
    } else {
        return (
            <div className="mx-2 md:mx-5 lg:mx-10 my-10">
                <PrevButton />
                <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900">
                    {categoryTitle}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4 mt-10 items-center place-items-stretch">
                    {products?.getProductsByCategory
                        .map((product: any) => (
                            <ProductsListComponent
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                picture={product.picture}
                                available={product.available}
                                mostWanted={product.mostWanted}
                            />
                        ))
                        .reverse()}
                </div>
            </div>
        );
    }
};

export default ProductsListPage;
