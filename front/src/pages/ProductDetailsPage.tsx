import { useState } from "react";
import { useParams } from "react-router-dom";
import ProductsData from "../data/products";
import Products from "../components/ProductsDetails";

export interface IProductFromAPI {
  id: number;
  name: string;
  reference: string;
  description: string;
  quantity: number;
  price: number;
}

type ProductIdType = {
  productId: string;
}

const ProductDetails = () => {
  let pid = 0;
  const { productId } = useParams<ProductIdType>();
  if (productId)
    pid = parseInt(productId);

  const [product, setProduct] = useState<IProductFromAPI>(ProductsData[pid]);
  console.log(product);

  return (
    <div>
      <header>
        <div className="container">
          <h1>FICHE PRODUIT</h1>
        </div>
      </header>
      <main className="container">
        <section className="card-row">
          <Products
            key = {product.id}
            id = {product.id}
            name = {product.name}
            reference = {product.reference}
            description = {product.description}
            quantity = {product.quantity}
            price = {product.price}
          />
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