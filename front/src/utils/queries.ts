import { gql } from "@apollo/client";

export const LOGIN_GUERY = gql(`
  query LoginQuery(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password){
        email
        role
        token
    }
  }
`);

export const GET_CATEGORIES = gql(`
  query GetCategories {
    getCategories {
      id
      name
    }
  }
`);

export const GET_CATEGORY_BY_NAME = gql(`
  query GetCategoryByName($name: String!) {
    getCategoryByName(name: $name) {
      id
      name
    }
  }
`);

export const GET_PRODUCTS_BY_CATEGORY = gql(`
  query getProducts($idCategory: String!) {
    getProductsByCategory(id_category: $idCategory) {
      id
      name
      price
      stock
      available
      description
      picture
    }
  }
`);

export const GET_ALL_PRODUCTS = gql(`
  query ExampleQuery {
    getProducts {
      id
      name
      price
      stock
      available
      description
      picture
      categories {
        id
        name
      }
    }
  }
`);
