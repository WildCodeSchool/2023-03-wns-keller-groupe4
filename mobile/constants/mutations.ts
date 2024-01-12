import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation Signup($signupUserInput: SignupUserInput!) {
    signup(signupUserInput: $signupUserInput)
  }
`;

export const LOGOUT = gql`
  mutation Mutation {
    logout
  }
`;
