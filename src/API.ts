/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateProtocolInput = {
  id?: string | null,
  symptom: string,
  meal?: string | null,
  drink?: string | null,
  herb?: string | null,
  ritual?: string | null,
};

export type ModelProtocolConditionInput = {
  symptom?: ModelStringInput | null,
  meal?: ModelStringInput | null,
  drink?: ModelStringInput | null,
  herb?: ModelStringInput | null,
  ritual?: ModelStringInput | null,
  and?: Array< ModelProtocolConditionInput | null > | null,
  or?: Array< ModelProtocolConditionInput | null > | null,
  not?: ModelProtocolConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Protocol = {
  __typename: "Protocol",
  id: string,
  symptom: string,
  meal?: string | null,
  drink?: string | null,
  herb?: string | null,
  ritual?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateProtocolInput = {
  id: string,
  symptom?: string | null,
  meal?: string | null,
  drink?: string | null,
  herb?: string | null,
  ritual?: string | null,
};

export type DeleteProtocolInput = {
  id: string,
};

export type ModelProtocolFilterInput = {
  id?: ModelIDInput | null,
  symptom?: ModelStringInput | null,
  meal?: ModelStringInput | null,
  drink?: ModelStringInput | null,
  herb?: ModelStringInput | null,
  ritual?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelProtocolFilterInput | null > | null,
  or?: Array< ModelProtocolFilterInput | null > | null,
  not?: ModelProtocolFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelProtocolConnection = {
  __typename: "ModelProtocolConnection",
  items:  Array<Protocol | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionProtocolFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  symptom?: ModelSubscriptionStringInput | null,
  meal?: ModelSubscriptionStringInput | null,
  drink?: ModelSubscriptionStringInput | null,
  herb?: ModelSubscriptionStringInput | null,
  ritual?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProtocolFilterInput | null > | null,
  or?: Array< ModelSubscriptionProtocolFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type CreateProtocolMutationVariables = {
  input: CreateProtocolInput,
  condition?: ModelProtocolConditionInput | null,
};

export type CreateProtocolMutation = {
  createProtocol?:  {
    __typename: "Protocol",
    id: string,
    symptom: string,
    meal?: string | null,
    drink?: string | null,
    herb?: string | null,
    ritual?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateProtocolMutationVariables = {
  input: UpdateProtocolInput,
  condition?: ModelProtocolConditionInput | null,
};

export type UpdateProtocolMutation = {
  updateProtocol?:  {
    __typename: "Protocol",
    id: string,
    symptom: string,
    meal?: string | null,
    drink?: string | null,
    herb?: string | null,
    ritual?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteProtocolMutationVariables = {
  input: DeleteProtocolInput,
  condition?: ModelProtocolConditionInput | null,
};

export type DeleteProtocolMutation = {
  deleteProtocol?:  {
    __typename: "Protocol",
    id: string,
    symptom: string,
    meal?: string | null,
    drink?: string | null,
    herb?: string | null,
    ritual?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetProtocolQueryVariables = {
  id: string,
};

export type GetProtocolQuery = {
  getProtocol?:  {
    __typename: "Protocol",
    id: string,
    symptom: string,
    meal?: string | null,
    drink?: string | null,
    herb?: string | null,
    ritual?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListProtocolsQueryVariables = {
  filter?: ModelProtocolFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProtocolsQuery = {
  listProtocols?:  {
    __typename: "ModelProtocolConnection",
    items:  Array< {
      __typename: "Protocol",
      id: string,
      symptom: string,
      meal?: string | null,
      drink?: string | null,
      herb?: string | null,
      ritual?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateProtocolSubscriptionVariables = {
  filter?: ModelSubscriptionProtocolFilterInput | null,
};

export type OnCreateProtocolSubscription = {
  onCreateProtocol?:  {
    __typename: "Protocol",
    id: string,
    symptom: string,
    meal?: string | null,
    drink?: string | null,
    herb?: string | null,
    ritual?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProtocolSubscriptionVariables = {
  filter?: ModelSubscriptionProtocolFilterInput | null,
};

export type OnUpdateProtocolSubscription = {
  onUpdateProtocol?:  {
    __typename: "Protocol",
    id: string,
    symptom: string,
    meal?: string | null,
    drink?: string | null,
    herb?: string | null,
    ritual?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProtocolSubscriptionVariables = {
  filter?: ModelSubscriptionProtocolFilterInput | null,
};

export type OnDeleteProtocolSubscription = {
  onDeleteProtocol?:  {
    __typename: "Protocol",
    id: string,
    symptom: string,
    meal?: string | null,
    drink?: string | null,
    herb?: string | null,
    ritual?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
