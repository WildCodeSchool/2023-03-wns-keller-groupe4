import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import axios from "axios";
import ProductsData, {IProductFromAPI} from "./../../data/productsData";
import ProductsListComponent, {IProductProps} from "./../../components/Front-Office/ProductListComponent";

type ProductIdType = {
  productId: string;
}

const ProductsList = () => {
  let pid = 0;
  const { productId } = useParams<ProductIdType>();
  if (productId)
    pid = parseInt(productId);

  // Données en dur
  // const [products, setProducts] = useState<IProductProps[]>([]);
  // useEffect(() => {
  //   setProducts(ProductsData);
  // },[]);

  // Données via API
  const [products, setProducts] = useState<IProductFromAPI[]>([]);
  useEffect(() => {
    const fetchData = async() => {
      const apiProducts = await axios.get<IProductFromAPI[]>('http://localhost:4000/getProducts');
      console.log(apiProducts); 
      setProducts(apiProducts.data);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white my-10">
      <div className="mx-10">
        <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900">Your search result for: (keyword)</h2>
        <div className="grid grid-cols-5 gap-5 mt-10 items-center place-items-stretch h-50">
          {products.map((product) => (
            <ProductsListComponent
              key = {product.id}
              id = {product.id}
              name = {product.name}
              // reference = {product.reference}
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