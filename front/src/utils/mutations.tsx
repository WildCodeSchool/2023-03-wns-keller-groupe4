import { gql } from "../__generated__";

export const SIGNUP_MUTATION = gql(`
  mutation Signup($signupUserInput: SignupUserInput!) {
    signup(signupUserInput: $signupUserInput) {
      email
      token
      role
    }
  }
`);

export const CREATE_PRODUCT = gql(`
  mutation Mutation($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
    }
  }
`)