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
