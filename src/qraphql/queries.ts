import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Products($manufacturerId: StringFilter!) {
    products(where: { manufacturerId: $manufacturerId }) {
      id
      name
      imageUrl
      retailPrice
      quantity
      description
    }
  }
`;

export const GET_STORE_PRODUCTS = gql`
  query GetStoreProducts($brandStoreName: StringFilter!) {
    products(where: { manufacturer: { brandStoreName: $brandStoreName } }) {
      id
      name
      imageUrl
      retailPrice
      product {
        productCategory
      }
      quantity
      description
    }
  }
`;

export const GET_RETAILERS = gql`
  query Locations($manufacturerId: StringFilter!) {
    locations(where: { store: { manufacturerId: $manufacturerId } }) {
      id
      fullAddress
      metaData
      longitude
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
      store {
        name
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query Query($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      name
      imageUrl
      product {
        productCategory
      }
      createdAt
      quantity
    }
  }
`;
