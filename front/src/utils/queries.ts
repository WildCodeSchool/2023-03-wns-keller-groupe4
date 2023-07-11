import { gql } from "@apollo/client";

export const LOGIN_GUERY = gql(`
  query LoginQuery(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password){
        email
        role
        token
    }
  }
`);