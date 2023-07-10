import { useParams } from 'react-router-dom';
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

type ProductCategory = {
  cat: string;
}

export const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    getProducts {
      id
      name
      price
      stock
      available
      description
      picture
    }
  }
`;

const ProductsListPage = () => {

  // Products from API
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  console.log(data);

  let { cat } = useParams<ProductCategory>();
  console.log(cat);

  console.log("CATEGORY FILTER => "+cat);

  
  if (loading) return <p>Chargement...</p>;
  if (error) return (
    <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
      <p className="font-bold">Erreur</p>
      <p>Une erreur est survenue. Veuillez réessayer</p>
    </div>
  );

  return (
    <div className="my-10">
      <div className="mx-2 md:mx-5 lg:mx-10">
        <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900">Tous nos produits</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-5 mt-10 items-center place-items-stretch">
          {
          cat !== "all" ? 
            data.getProducts.filter((product:any)=> product.name === cat).map((product:any) => (
              <ProductsListComponent
                key = {product.id}
                id = {product.id}
                name = {product.name}
                price = {product.price}
                picture = {product.picture}
              />
            )
          ) : (
          data.getProducts.map((product:any) => (
            <ProductsListComponent
              key = {product.id}
              id = {product.id}
              name = {product.name}
              price = {product.price}
              picture = {product.picture}
            />
          )))}
        </div>
      </div>
    </div>
  );
};

export default ProductsListPage;