import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import ProductsListComponent, { IProductProps } from "./../../components/Front-Office/ProductListComponent";

export interface IProductFromAPI {
  id: number;
  name: string;
  // reference: string;
  price: number;
  stock: number;
  available: boolean;
  picture: string;
}

type ProductIdType = {
  productId: string;
};

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

const ProductsList = () => {

  // Données via API
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="bg-white my-10">
      <div className="mx-10">
        <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900">All Products</h2>
        <div className="grid grid-cols-5 gap-5 mt-10 items-center place-items-stretch h-50">
          {data.getProducts.map((product:any) => (
            <ProductsListComponent
              key = {product.id}
              id = {product.id}
              name = {product.name}
              // reference = {product.reference}
              price = {product.price}
              stock = {product.stock}
              picture = {product.picture}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;