/* eslint-disable @typescript-eslint/no-explicit-any */
import products from "./products";

const stores: any = [
  // ... previous stores

  {
    name: "Electronics World",
    location: {
      latitude: 10.5085,
      longitude: 8.6753,
    },
    products: [
      products[0], // iPhone 15 Pro Max
      products[1], // Samsung Galaxy S24 Ultra
      products[2], // Dell XPS 15
      products[10], // Apple MacBook Air M2
    ],
    storeHours: {
      monday: "10:00 AM - 8:00 PM",
      tuesday: "10:00 AM - 8:00 PM",
      // ... other days
    },
    phoneNumber: "+234 123 456 7890",
    website: "https://electronicsworld.com",
  },
  {
    name: "GameZone",
    location: {
      latitude: 10.4979,
      longitude: 8.6808,
    },
    products: [
      products[7], // PlayStation 5
      products[8], // Xbox Series X
      products[9], // Nintendo Switch OLED
      products[11], // Sony PlayStation 5 Digital Edition
    ],
    storeHours: {
      monday: "",
      tuesday: "",
    },
    phoneNumber: "+234 987 654 3210",
    website: "https://gamezone.com",
  },
  {
  name: 'TechZone',
  location: {
    latitude: 10.5085,
    longitude: 8.6753,
  },
  products: [
    products[1],
    products[2],
    products[3]
],
  storeHours: {
    monday: '10:00 AM - 8:00 PM',
    tuesday: '10:00 AM - 8:00 PM',
    // ... other days
  },
  phoneNumber: '+234 123 456 7890',
  website: 'https://electronicsworld.com',
},
{
  name: 'Health Mart',
  location: {
    latitude: 10.4979,
    longitude: 8.6808,
  },
  products: [
    products[4],
    products[5],
    products[6],
    products[7],
    products[8],
  ],
  storeHours: {
      monday: "",
      tuesday: ""
  },
  phoneNumber: '+234 987 654 3210',
  website: 'https://healthmart.com',
},
  // ... more stores
];

export default stores;
