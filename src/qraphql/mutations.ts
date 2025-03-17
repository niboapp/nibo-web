import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation SignUpManufacturer(
    $email: String!
    $password: String!
    $confirmPassword: String!
    $businessName: String!
  ) {
    signUpManufacturer(
      signUpManufacturerInput: {
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        businessName: $businessName
        image: "rrr.com"
      }
    ) {
      token
      user {
        id
        email
        businessName
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
      name
      description
      price
      category
      batchNumber
      batchQuantity
      serialNumber
      status
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
      }
    }
  }
`;
