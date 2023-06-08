import { IProductFromAPI } from "../pages/ProductDetailsPage";

interface IProductFromAPITest {
    [key: number]: IProductFromAPI
}

const ProductsData:IProductFromAPITest = {
    1: {
        id: 1,
        name: "Produit 1",
        reference: "REF-001",
        description: "Ceci est la description du produit 1",
        price: 1,
        quantity: 10,
        // images: [
        //     {id: 1, name: "image", url: "img1"},
        // ]
    },
    2: {
        id: 2,
        name: "Produit 2",
        reference: "REF-002",
        description: "Ceci est la description du produit 2",
        price: 2,
        quantity: 20,
      },
      3: {
        id: 3,
        name: "Produit 3",
        reference: "REF-003",
        description: "Ceci est la description du produit 3",
        price: 3,
        quantity: 30,
      },
      4: {
        id: 4,
        name: "Produit 4",
        reference: "REF-004",
        description: "Ceci est la description du produit 4",
        price: 4,
        quantity: 40,
      },
};
  
  export default ProductsData;