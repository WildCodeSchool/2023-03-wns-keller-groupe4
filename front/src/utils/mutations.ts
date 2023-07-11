import gql from "graphql-tag";

export const SIGNUP_MUTATION = gql(`
mutation Signup($signupUserInput: SignupUserInput!) {
  signup(signupUserInput: $signupUserInput) {
    email
    token
    role
  }
}
`);