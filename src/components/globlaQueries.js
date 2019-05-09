import { gql } from "apollo-boost";

export const GET_USERS = gql`
  {
    getUsers {
      ... on Group {
        label
        name
        uri
        notes
        users {
          name
          label
          uri
          notes
        }
      }
    }
  }
`;

export const GET_RESOURCES = gql`
  {
    getResources(start: "Root") {
      uri
      name
      partner
      kind
      advertiser
      descendants {
        uri
        name
        kind
        partner
        advertiser
      }
    }
  }
`;
