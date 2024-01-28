import { gql } from "@apollo/client";

export const LOGIN_GUERY = gql`
  query LoginQuery(
    $email: String!
    $password: String!
  ) {
    login(password: $password, email: $email) {
      IDToken
  }
  }
`;

export const GET_USER = gql`
  query getUserById($getUserByIdId: String!) {
    getUserById(id: $getUserByIdId) {
      id
      email
      role
      user_profile {
        id
        firstname
        lastname
        birthday
        street
        postal_code
        country
        lang {
          id
          name
        }
      }
      reservations {
        id
        start_at
        end_at
        status
        created_at
        updated_at
      }
      created_at
      updated_at
    }
  }
`;

export const GET_INVOICE_BY_RESERVATION_ID = gql`
  query getInvoiceByIdReservation($idReservation: String!) {
    getInvoiceByIdReservation(idReservation: $idReservation) {
      id
      created_at
      reservation {
        id
        start_at
        end_at
        status
        created_at
        updated_at
      }
      user {
        id
        email
        role
      }
      UserBilling {
        id
        firstname
        lastname
        street
        postal_code
        country
      }
    }
  }
`;

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
