import { gql } from "@apollo/client";

export const STORE_FEED = gql`
  query Products($where: ProductWhereInput) {
    products(where: $where) {
      id
      name
      imageUrl
      price
      batchQuantity
      description
    }
  }
`;

export const MANUFACTURER_QUERY = gql`
  query Query {
    manufacturers {
      name
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
