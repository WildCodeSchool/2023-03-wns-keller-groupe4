import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import Products from "../../components/ProductsDetailsComponent";
import {GET_ONE_PRODUCT} from "../../utils/queries";

export interface IProductFromAPI {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  available: boolean;
  picture: string;
}

const ProductsDetailsPage = () => {
  const {id} = useParams();

  // Products data from API
  const {loading, error, data} = useQuery(GET_ONE_PRODUCT, {
    variables: {getProductId: id as string},
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const product = data?.getProduct;

  return (
    <div>
      <main className="container mx-auto">
        <section className="card-row mx-1">
          {product && (
            <Products
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              stock={product.stock}
              price={product.price}
              picture={product.picture}
              available={product.available}
              isAdmin={false}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default ProductsDetailsPage;
