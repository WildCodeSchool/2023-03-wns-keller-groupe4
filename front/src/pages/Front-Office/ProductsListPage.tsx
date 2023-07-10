import { useParams } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";
import ProductsListComponent from "../../components/ProductListComponent";
import { useEffect, useRef, useState } from 'react';

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

  const { cat } = useParams<ProductCategory>();

  const [category, setCategory] = useState("all");

  useEffect(() => {
    if(cat !== undefined) {
      console.log("category-URL => "+cat);
      setCategory(cat);
    }
  }, []);

  useEffect(() => { console.log("category => "+category); }, [category])

  console.log("SelectedCategory => "+cat, " / Category => "+category);

  // Products from API
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  var products = data.getProducts;

  // Filter products by category
  if(cat !== "all") {
    console.log("Filtering products by category : "+cat);
    products = products.filter((product:any) => product.name === cat);
    console.log(products);
  }


  return (
    <div className="my-10">
      <div className="mx-2 md:mx-5 lg:mx-10">
        <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900">All Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-5 mt-10 items-center place-items-stretch">
          {products.map((product:any) => (
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