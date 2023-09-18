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
