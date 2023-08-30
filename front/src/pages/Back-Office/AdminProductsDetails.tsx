import React from "react";
import {useParams} from "react-router-dom";
import {useQuery, gql} from "@apollo/client";
import Products from "../../components/ProductsDetailsComponent";
import {GET_ONE_PRODUCT} from "../../utils/queries";

const AdminProductsDetails = () => {
  const {productId} = useParams();
  console.log(productId);

  const {loading, error, data} = useQuery(GET_ONE_PRODUCT, {
    variables: {getProductId: productId as string},
  });
  const product = data?.getProduct;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
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
              isAdmin={true}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminProductsDetails;
