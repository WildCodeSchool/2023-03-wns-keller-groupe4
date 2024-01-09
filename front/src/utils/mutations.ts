import { gql } from "../__generated__";

export const SIGNUP_MUTATION = gql(`
  mutation Signup($signupUserInput: SignupUserInput!) {
    signup(signupUserInput: $signupUserInput)
  }
`);

export const CREATE_PRODUCT = gql(`
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
      name
    }
  }
`);

export const UPDATE_PRODUCT = gql(`
mutation UpdateProduct($updateProductInput: UpdateProductInput!, $updateProductId: String!) {
	updateProduct(updateProductInput: $updateProductInput, id: $updateProductId) {
	  name
	}
  }
`);

export const LOGOUT = gql(`
  mutation Mutation {
    logout
  }
`);

export const CREATE_CART = gql(`
  mutation CreateReservation($createReservationInput: CreateReservationInput!) {
    createReservation(createReservationInput: $createReservationInput) {
      id
    }
  }
`);

export const UPDATE_CART = gql(`
  mutation UpdateDetailFromReservation($detail: DetailReservationInput!, $updateDetailFromReservationId: String!) {
    updateDetailFromReservation(detail: $detail, id: $updateDetailFromReservationId) {
      id
      start_at
      end_at
      status
      created_at
      updated_at
      reservationsDetails {
        quantity
        start_at
        end_at
        product {
          id
        }
      }
    }
  }
`);

export const UPDATE_RESERVATION_STATUS = gql(`
  mutation UpdateStatusOfReservation($status: EnumStatusReservation!, $updateStatusOfReservationId: String!) {
    updateStatusOfReservation(status: $status, id: $updateStatusOfReservationId) {
      id
      start_at
      end_at
      status
      created_at
      updated_at
    }
  }
`);

export const REMOVE_PRODUCT_FROM_RESERVATION = gql(`
  mutation removeProductsFromReservation($productsIds: [String!]!, $removeProductsFromReservationId: String!) {
    removeProductsFromReservation(products_ids: $productsIds, id: $removeProductsFromReservationId) {
      id
      start_at
      end_at
      status
      created_at
      updated_at
    }
  }
`);

export const UPDATE_RESERVATION_DATES = gql(`
  mutation updateDateOfReservation($endAt: DateTime!, $startAt: DateTime!, $updateDateOfReservationId: String!) {
    updateDateOfReservation(endAt: $endAt, startAt: $startAt, id: $updateDateOfReservationId) {
      id
      start_at
      end_at
      status
      created_at
      updated_at
    }
  }
`);

export const CREATE_INVOICE = gql(`
  mutation createInvoice($updateUserBillingInput: UpdateUserBillingInput!, $createInvoiceInput: CreateInvoiceInput!) {
    createInvoice(updateUserBillingInput: $updateUserBillingInput, createInvoiceInput: $createInvoiceInput) {
      UserBilling {
        id
        firstname
        lastname
        street
        postal_code
        country
        invoice {
          id
        }
      }
      user {
        id
      }
      reservation {
        id
      }
    }
  }
`);

export const UPDATE_USER_BILLING_BY_ID = gql(`
  mutation updateUserBillingById($updateUserBillingByIdId: String!, $updateUserBillingInput: UpdateUserBillingInput!) {
    updateUserBillingById(id: $updateUserBillingByIdId, updateUserBillingInput: $updateUserBillingInput) {
      id
      firstname
      lastname
      street
      postal_code
      country
    }
  }
`);
