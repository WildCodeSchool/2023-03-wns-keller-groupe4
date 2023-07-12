import { useQuery, gql } from "@apollo/client";
import ProductsListComponent from "../../components/ProductsListComponent";

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

const ProductsListPage = () => {

  // Products data from API with pagination
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return (
    <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
      <p className="font-bold">Erreur</p>
      <p>Un problème est survenu.</p>
    </div>
  );

  return (
    <div className="my-10">
      <div className="mx-2 md:mx-5 lg:mx-10">
        <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900">Tous nos produits</h2>
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

export default ProductsListPage;