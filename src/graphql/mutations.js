/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";

export const createProtocol = /* GraphQL */ `mutation CreateProtocol(
  $input: CreateProtocolInput!
  $condition: ModelProtocolConditionInput
) {
  createProtocol(input: $input, condition: $condition) {
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
export const updateProtocol = /* GraphQL */ `mutation UpdateProtocol(
  $input: UpdateProtocolInput!
  $condition: ModelProtocolConditionInput
) {
  updateProtocol(input: $input, condition: $condition) {
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
export const deleteProtocol = /* GraphQL */ `mutation DeleteProtocol(
  $input: DeleteProtocolInput!
  $condition: ModelProtocolConditionInput
) {
  deleteProtocol(input: $input, condition: $condition) {
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
