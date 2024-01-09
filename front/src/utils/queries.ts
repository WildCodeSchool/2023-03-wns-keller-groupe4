import { gql } from "../__generated__";

export const LOGIN_GUERY = gql(`
  query LoginQuery(
    $email: String!
    $password: String!
  ) {
    login(password: $password, email: $email) {
      IDToken
  }
  }
`);

export const GET_USER = gql(`
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

export const GET_PRODUCTS = gql(`
  query GetProducts($getProductsInput: GetProductsInput) {
    getProducts(getProductsInput: $getProductsInput) {
      id
      name
      stock
      available
    }
  }
`);

export const GET_PRODUCT_COUNT = gql(`
  query Query($name: String) {
    getProductsCount(name: $name)
  }
`);

export const GET_RESERVATIONS = gql(`
  query allReservations {
      getReservations {
        id
        created_at
        end_at
        reservationsDetails {
          product {
            id
            name
          }
          quantity
        }
        start_at
        status
        updated_at
        user {
          email
          id
        }
      }
    }
`);

export const GET_ONE_PRODUCT = gql(`
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
`);

export const GET_USER_CART = gql(`
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
`);

export const GET_RESERVED_QUANTITIES_OF_ONE_PRODUCT = gql(`
  query GetProductReservationQuantityByDates($getProductReservationQuantityByDatesInput: GetProductReservationQuantityByDatesInput) {
    getProductReservationQuantityByDates(getProductReservationQuantityByDatesInput: $getProductReservationQuantityByDatesInput)
  }
`);
export const GET_RESERVATIONS_BY_ID = gql(`
query GetReservationsByUserId($getReservationByIdId: String!) {
  getReservationById(id: $getReservationByIdId) {
    id
    user {
      email
    }
    end_at
    start_at
  }
}
`);

export const GET_RESERVATION_LIST_COUNT = gql(`
query getReservationCountBySearchInput($searchReservationInput : SearchReservationInput){
  getReservationCountBySearchInput(searchReservationInput:$searchReservationInput )
} `);

export const GET_RESERVATIONS_BY_SEARCH_FILTER = gql(`
query GetReservationsBySearchFilter($searchReservationInput: SearchReservationInput!) {
  getReservationsBySearchFilter(searchReservationInput: $searchReservationInput) {
    id
    created_at
    end_at
    reservationsDetails {
      product {
        id
        name
      }
      quantity
    }
    start_at
    status
    updated_at
    user {
      email
      id
    }
  }
}
`);

export const GET_INVOICE_BY_RESERVATION_ID = gql(`
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
`);
