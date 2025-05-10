import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation signUp($signUpManufacturerInput: SignUpManufacturerInput!) {
    signUp(signUpManufacturerInput: $signUpManufacturerInput) {
      user {
        id
        email
        manufacturers {
          id
        }
      }
      token
    }
  }
`;

export const CREATE_STORE_MUTATION = gql`
  mutation addRetailer($createStoreInput: CreateStoreInput!) {
    addRetailer(createStoreInput: $createStoreInput) {
      id
      name
      location
      contact
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation Mutation($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
      name
      description
      retailPrice
      batchNumber
      barCode
      imageUrl
      manufacturerId
      createdAt
      updatedAt
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LogIn($email: String!, $password: String!) {
    logIn(logInInput: { email: $email, password: $password }) {
      token
      user {
        id
        email
        manufacturers {
          id
        }
      }
    }
  }
`;

export const CREATE_RETAILER_MUTATION = gql`
  mutation Mutation($createStoreInputs: [CreateStoreInput!]!) {
    addMultipleRetailer(createStoreInputs: $createStoreInputs) {
      location {
        fullAddress
        id
      }
      name
    }
  }
`;

export const REGISTER_BUSINESS = gql`
  mutation CreateManufacturer(
    $createManufacturerInput: CreateManufacturerInput!
  ) {
    createManufacturer(createManufacturerInput: $createManufacturerInput) {
      id
      businessName
      brandStoreName
      location {
        id
      }
      industry
    }
  }
`;

export interface CreateStoreInput {
  name: string;
  manufacturerId: string;
  fullAddress: string;
  contact: string;
}
