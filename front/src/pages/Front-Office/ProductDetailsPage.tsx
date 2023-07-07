import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Products from "../../components/Front-Office/ProductsDetailsComponent";

export interface IProductFromAPI {
  id: string;
  name: string;
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

  const { productId } = useParams<ProductIdType>();
  const getProductId = productId;

  // Products data from API
  const { loading, error, data } = useQuery(GET_ONE_PRODUCT, {
    variables: { getProductId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const product = data.getProduct;

  return (
    <div>
      <main className="container mx-auto">
        <section className="card-row mx-1">
          <Products
            key = {product.id}
            id = {product.id}
            name = {product.name}
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