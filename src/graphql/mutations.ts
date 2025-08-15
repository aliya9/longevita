/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

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
` as GeneratedMutation<
  APITypes.CreateProtocolMutationVariables,
  APITypes.CreateProtocolMutation
>;
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
` as GeneratedMutation<
  APITypes.UpdateProtocolMutationVariables,
  APITypes.UpdateProtocolMutation
>;
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
` as GeneratedMutation<
  APITypes.DeleteProtocolMutationVariables,
  APITypes.DeleteProtocolMutation
>;
