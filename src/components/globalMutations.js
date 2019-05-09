import { gql } from "apollo-boost";

export const UPDATE_USER = gql`
  mutation UpsertUser(
    $uri: String!
    $name: String!
    $notes: String
    $group: String!
  ) {
    upsertUser(
      userInput: { uri: $uri, name: $name, notes: $notes }
      group: $group
    ) {
      ok
    }
  }
`;

export const UPDATE_GROUP = gql`
  mutation UpsertGroup($uri: String!, $name: String!, $notes: String!) {
    upsertGroup(groupInput: { uri: $uri, name: $name, notes: $notes }) {
      ok
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation CreateGroup($uri: String!, $name: String!, $notes: String) {
    createGroup(groupInput: { uri: $uri, name: $name, notes: $notes }) {
      ok
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $group: String!, $uri: String!) {
    createUser(userInput: { name: $name, uri: $uri }, group: $group) {
      ok
    }
  }
`;

export const DELETE_GROUP = gql`
  mutation DeleteGroup($group: String!) {
    deleteGroup(group: $group) {
      ok
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($user: String!) {
    deleteUser(user: $user) {
      ok
    }
  }
`;

export const MOVE_USER = gql`
  mutation MoveUser($source: String!, $destination: String!, $user: String!) {
    moveUser(source: $source, destination: $destination, user: $user) {
      ok
    }
  }
`;
