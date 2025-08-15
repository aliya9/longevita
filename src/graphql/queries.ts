/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

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
` as GeneratedQuery<
  APITypes.GetProtocolQueryVariables,
  APITypes.GetProtocolQuery
>;
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
` as GeneratedQuery<
  APITypes.ListProtocolsQueryVariables,
  APITypes.ListProtocolsQuery
>;
