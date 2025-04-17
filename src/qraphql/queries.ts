import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Products($where: ProductWhereInput) {
    products(where: $where) {
      id
      name
      imageUrl
      retailPrice
      quantity
      description
    }
  }
`;

export const MANUFACTURER_QUERY = gql`
  query Query {
    manufacturers {
      brandStoreName
    }
  }
`;

export const GET_LOCATIONS = gql`
  query Locations {
    locations {
      latitude
      longitude
      id
      city
    }
  }
`;

export const GET_PRODUCT = gql`
  query Query($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      name
      imageUrl
      category
      createdAt
      batchQuantity
    }
  }
`;
