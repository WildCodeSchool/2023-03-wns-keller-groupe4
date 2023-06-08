import { IProductFromAPI } from "../pages/ProductDetailsPage";

interface IProductFromAPITest {
    [key: number]: IProductFromAPI
}

const ProductsData:IProductFromAPITest = {
    1: {
        id: 1,
        name: "Produit 1",
        reference: "REF-001",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat ac felis donec et. Interdum varius sit amet mattis vulputate. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Ipsum consequat nisl vel pretium lectus quam id leo. Ornare arcu dui vivamus arcu felis bibendum. Pellentesque pulvinar pellentesque habitant morbi.",
        price: 1,
        quantity: 10,
        picture: "product-1.jpg",
    },
    2: {
        id: 2,
        name: "Produit 2",
        reference: "REF-002",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat ac felis donec et. Interdum varius sit amet mattis vulputate. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Ipsum consequat nisl vel pretium lectus quam id leo. Ornare arcu dui vivamus arcu felis bibendum. Pellentesque pulvinar pellentesque habitant morbi.",
        price: 2,
        quantity: 20,
        picture: "product-2.jpg",
      },
      3: {
        id: 3,
        name: "Produit 3",
        reference: "REF-003",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat ac felis donec et. Interdum varius sit amet mattis vulputate. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Ipsum consequat nisl vel pretium lectus quam id leo. Ornare arcu dui vivamus arcu felis bibendum. Pellentesque pulvinar pellentesque habitant morbi.",
        price: 3,
        quantity: 30,
        picture: "product-3.jpg",
      },
      4: {
        id: 4,
        name: "Produit 4",
        reference: "REF-004",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat ac felis donec et. Interdum varius sit amet mattis vulputate. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Ipsum consequat nisl vel pretium lectus quam id leo. Ornare arcu dui vivamus arcu felis bibendum. Pellentesque pulvinar pellentesque habitant morbi.",
        price: 4,
        quantity: 40,
        picture: "product-4.png",
      },
};
  
  export default ProductsData;