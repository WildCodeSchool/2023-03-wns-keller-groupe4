import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductsData from "./../../data/productsData";
import ProductsListComponent, {IProductProps} from "./../../components/Front-Office/ProductListComponent";

type ProductIdType = {
  productId: string;
}

const ProductsList = () => {
  let pid = 0;
  const { productId } = useParams<ProductIdType>();
  if (productId)
    pid = parseInt(productId);

  const [products, setProducts] = useState<IProductProps[]>([]);
  useEffect(() => {
    setProducts(ProductsData);
  },[]);

  // Une fois l'API créee :
  // useEffect(() => {
  //   const fetchData = async() => {
  //     const apiProducts = await axios.get<IProductFromAPI[]>(api_url); 
  //     setProducts(apiProducts.data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="bg-white mt-10">
      <div className="mx-10">
        <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900">Your search result for: (keyword)</h2>
        <div className="grid grid-cols-4 gap-10 mt-10 items-center place-items-stretch h-64">
          {products.map((product) => (
            <ProductsListComponent
              key = {product.id}
              id = {product.id}
              name = {product.name}
              reference = {product.reference}
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