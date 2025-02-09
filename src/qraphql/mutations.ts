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
      price
      name
      id
      createdAt
      updatedAt
      description
      category
      imageUrl
      batchNumber
      serialNumber
      batchQuantity
      manufacturerId
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
