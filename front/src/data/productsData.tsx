import { IProductFromAPI } from "../pages/Front-Office/ProductsListPage";

interface IProductFromAPITest {
    [key: number]: IProductFromAPI
}

const ProductsData:IProductFromAPITest = {
    1: {
        id: 1,
        name: "Produit 1",
        reference: "REF-001",
        price: 1,
        picture: "product-1.jpg",
    },
    2: {
        id: 2,
        name: "Produit 2",
        reference: "REF-002",
        price: 2,
        picture: "product-2.jpg",
    },
    3: {
        id: 3,
        name: "Produit 3",
        reference: "REF-003",
        price: 3,
        picture: "product-3.jpg",
    },
    4: {
        id: 4,
        name: "Produit 4",
        reference: "REF-004",
        price: 4,
        picture: "product-4.png",
    },
};
  
export default ProductsData;