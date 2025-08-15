/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";

export const getProtocol = /* GraphQL */ `query GetProtocol($id: ID!) {
  getProtocol(id: $id) {
    id
    symptom
    meal
    drink
    herb
    ritual
    createdAt
    updatedAt
    __typename
  }
}
`;
export const listProtocols = /* GraphQL */ `query ListProtocols(
  $filter: ModelProtocolFilterInput
  $limit: Int
  $nextToken: String
) {
  listProtocols(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      symptom
      meal
      drink
      herb
      ritual
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
`;
