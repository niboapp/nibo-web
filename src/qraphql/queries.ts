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
  query GetStoreProducts($slug: StringFilter!) {
    products(where: { manufacturer: { slug: $slug } }) {
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
  query Locations($id: String!) {
    manufacturer(where: { id: $id }) {
      stores {
        name
        contact
        location {
          fullAddress
          longitude
        }
      }
    }
  }
`;

export const MANUFACTURER_QUERY = gql`
  query Query {
    manufacturers {
      brandStoreName
      slug
    }
  }
`;

export const GET_LOCATIONS = gql`
  query Locations {
    locations {
      latitude
      longitude
      id
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      id
      name
      description
      retailPrice
      batchNumber
      barCode
      imageUrl
      manufacturerId
      manufactureDate
      expiryDate
      quantity
      createdAt
      updatedAt
    }
  }
`;

export const SEARCH_ADDRESS = gql`
  query SearchAddress($address: String!) {
    searchAddress(address: $address)
  }
`;

export const GET_MANUFACTURER = gql`
  query GetManufacturer($id: String!) {
    manufacturer(where: { id: $id }) {
      id
      businessName
      brandStoreName
      location {
        fullAddress
      }
      industry
      productCategory
      slug
    }
  }
`;
