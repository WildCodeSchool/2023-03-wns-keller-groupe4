import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Products from "../components/ProductsDetailsComponent";

export interface IProductFromAPI {
  id: string;
  name: string;
  // reference: string;
  description: string;
  price: number;
  stock: number;
  available: boolean;
  picture: string;
}

type ProductIdType = {
  productId: string;
};

export const GET_ONE_PRODUCT = gql`
  query getProduct($getProductId: String!) {
    getProduct(id: $getProductId) {
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

const ProductDetails = () => {
  // Get the product id from the url
  // let id = 0;
  const { productId } = useParams<ProductIdType>();
  const getProductId = productId;
  // if (productId)
  //   id = parseInt(productId);

  // Données via API
  const { loading, error, data } = useQuery(GET_ONE_PRODUCT, {
    variables: { getProductId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const product = data.getProduct;

  return (
    <div>
      <main className="container mx-auto p-8">
        <section className="card-row">
          <Products
            key = {product.id}
            id = {product.id}
            name = {product.name}
            // reference = {product.reference}
            description = {product.description}
            stock = {product.stock}
            price = {product.price}
            picture = {product.picture}
            available = {product.available}
          />
        </section>
      </main>
    </div>
  );
};

export default ProductDetails;