import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      id
      name
    }
  }
`;

export const GET_CATEGORY_NAME = gql`
  query GetCategory($getCategoryId: String!) {
    getCategory(id: $getCategoryId) {
      name
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($idCategory: String!) {
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
`;

export const GET_ONE_PRODUCT = gql`
  query getProduct($getProductId: String!) {
    getProduct(id: $getProductId) {
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

export const GET_RESERVED_QUANTITIES_OF_ONE_PRODUCT = gql`
  query GetProductReservationQuantityByDates(
    $getProductReservationQuantityByDatesInput: GetProductReservationQuantityByDatesInput
  ) {
    getProductReservationQuantityByDates(
      getProductReservationQuantityByDatesInput: $getProductReservationQuantityByDatesInput
    )
  }
`;

export const GET_USER_CART = gql`
  query GetCartReservationOfUser($getCartReservationOfUserId: String!) {
    getCartReservationOfUser(id: $getCartReservationOfUserId) {
      id
      start_at
      end_at
      status
      reservationsDetails {
        start_at
        end_at
        quantity
        product {
          id
          name
          picture
          price
          stock
          available
        }
      }
      user {
        email
      }
    }
  }
`;
