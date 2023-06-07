import { Navigate, useParams } from "react-router-dom";
// import { useQuery, gql } from "@apollo/client";
import ProductsData from "../data/products";
import Products, { IProductProps } from "../components/ProductsDetails";

// interface IProductFromAPI {
//   id: number;
//   name: string;
//   reference: string;
//   description: string;
//   quantity: number;
//   price: number;
// }

const ProductDetails = () => {
  return (
    <div>
      <header>
        <div className="container">
          <h1>FICHE PRODUIT</h1>
        </div>
      </header>
      <main className="container">
        <section className="card-row">

          {ProductsData.map((product) => {
            return (
              <Products
                key = {product.id}
                id = {product.id}
                name = {product.name}
                reference = {product.reference}
                description = {product.description}
                quantity = {product.quantity}
                price = {product.price}
              />
            );
          })}
        </section>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2023 Wild Rent by Wild Code School</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetails;