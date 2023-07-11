import { useLocation, useParams } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";
import ProductsListComponent from "../../components/ProductsListComponent";
import { useEffect, useState } from 'react';

export interface IProductFromAPI {
  id: number;
  name: string;
  price: number;
  stock: number;
  available: boolean;
  picture: string;
}

// type ProductCategory = {
//   cat: string;
// }

export const GET_ALL_PRODUCTS = gql`
  query getAllProducts($idCategory: String!) {
    getProducts(id_category: $idCategory) {
      categories {
        id
        name
        price
        stock
        available
        description
        picture
      }
    }
  }
`;

// const GET_CATEGORIES = gql(`
//   query GetCategories {
//     getCategories {
//       id
//       name
//     }
//   }
// `);

const ProductsListPage = () => { 

  // let { cat } = useParams<ProductCategory>();
  const { state } = useLocation();
  const category = state.cat;

  const CategoryNameFormatted = (category: string) => {
    if (category !== "all") {
      category = category.charAt(0).toUpperCase() + category.slice(1);
      console.log("CATEGORY FILTER => "+category);
    }

    return category;
  }

  // Products from API
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS, {
    variables: { idCategory:  },
  });
  
  if (loading) return <p>Chargement...</p>;
  if (error) {
    return (
      <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
        <p className="font-bold">Erreur</p>
        <p>Une erreur est survenue. Veuillez réessayer</p>
      </div>
    );
  }

  console.log(data);

  const products = data.getProducts;

  return (
    <div className="my-10">
      <div className="mx-2 md:mx-5 lg:mx-10">
        <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900">{category ?? "Tous nos produits"}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-5 mt-10 items-center place-items-stretch">
          {
            products.map((product:any) => (
              <ProductsListComponent
                key = {product.id}
                id = {product.id}
                name = {product.name}
                price = {product.price}
                picture = {product.picture}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ProductsListPage;
export default ProductsListPage;