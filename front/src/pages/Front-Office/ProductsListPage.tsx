import { useQuery, gql } from "@apollo/client";
import ProductsListComponent from "./../../components/Front-Office/ProductListComponent";

export interface IProductFromAPI {
  id: number;
  name: string;
  price: number;
  stock: number;
  available: boolean;
  picture: string;
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

const ProductsList = () => {

  // Products data from API with pagination
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="my-10">
      <div className="mx-2 md:mx-5 lg:mx-10">
        <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900">All Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-5 mt-10 items-center place-items-stretch">
          {data.getProducts.map((product:any) => (
            <ProductsListComponent
              key = {product.id}
              id = {product.id}
              name = {product.name}
              price = {product.price}
              picture = {product.picture}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;