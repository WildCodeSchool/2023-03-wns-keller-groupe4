import { gql } from "@apollo/client";

export const CREATE_CART = gql`
  mutation CreateReservation($createReservationInput: CreateReservationInput!) {
    createReservation(createReservationInput: $createReservationInput) {
      id
    }
  }
`;

export const UPDATE_CART = gql`
  mutation UpdateDetailFromReservation(
    $detail: DetailReservationInput!
    $updateDetailFromReservationId: String!
  ) {
    updateDetailFromReservation(
      detail: $detail
      id: $updateDetailFromReservationId
    ) {
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
`;
