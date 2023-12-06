import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      id
      name
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY_NAME = gql`
  query GetCategoryByName($name: String!) {
    getCategoryByName(name: $name) {
      products {
        id
        name
        price
        picture
        available
      }
    }
  }
`;
