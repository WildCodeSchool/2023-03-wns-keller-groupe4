import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductsData from "./../../data/productsData";
import ProductsListComponent, {IProductProps} from "./../../components/Front-Office/ProductListComponent";

export interface IProductFromAPI {
  id: number;
  name: string;
  reference: string;
  price: number;
  picture: string;
}

type ProductIdType = {
  productId: string;
}

const ProductsList = () => {
  // let pid = 0;
  // const { productId } = useParams<ProductIdType>();
  // if (productId)
  //   pid = parseInt(productId);

  // const [product, setProduct] = useState<IProductFromAPI>(ProductsData[pid]);
  // console.log(product);

  const [products, setProducts] = useState<IProductProps[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      const apiProducts = await axios.get<IProductFromAPI[]>(ProductsData); 
      setProducts(apiProducts.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <main className="container mx-auto p-8">
        <section className="card-row">
          <ProductsListComponent
            key = {product.id}
            id = {product.id}
            name = {product.name}
            reference = {product.reference}
            price = {product.price}
            picture = {product.picture}
          />
        </section>
      </main>
    </div>
  );
};

export default ProductDetails;