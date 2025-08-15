/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateProtocol = /* GraphQL */ `subscription OnCreateProtocol($filter: ModelSubscriptionProtocolFilterInput) {
  onCreateProtocol(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateProtocolSubscriptionVariables,
  APITypes.OnCreateProtocolSubscription
>;
export const onUpdateProtocol = /* GraphQL */ `subscription OnUpdateProtocol($filter: ModelSubscriptionProtocolFilterInput) {
  onUpdateProtocol(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateProtocolSubscriptionVariables,
  APITypes.OnUpdateProtocolSubscription
>;
export const onDeleteProtocol = /* GraphQL */ `subscription OnDeleteProtocol($filter: ModelSubscriptionProtocolFilterInput) {
  onDeleteProtocol(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteProtocolSubscriptionVariables,
  APITypes.OnDeleteProtocolSubscription
>;
