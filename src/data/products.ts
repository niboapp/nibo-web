import Product from "../types/product";

const products: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    price: 1500,
    category: "Electronics",
    quantityAvailable: 20,
    description: "The ultimate smartphone experience.",
    imageUrl:
      "https://i.pinimg.com/564x/e9/a9/b7/e9a9b72ec8478f1023f0e7bfcfdf6d4d.jpg",
    brand: "Apple",
    ratings: 4.3,
    store: [
      {
        name: "Electronics World",
        location: {
          latitude: 6.5035,
          longitude: 3.6353,
        },
        sold: 32,
      },
      {
        name: "GameZone",
        location: {
          latitude: 6.4939,
          longitude: 3.6303,
        },

        sold: 32,
      },
    ],
    reviews: 200,
    quantityBought: 0,
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    price: 1200,
    category: "Electronics",
    quantityAvailable: 15,
    description: "A powerful Android flagship.",
    imageUrl:
      "https://i.pinimg.com/736x/44/db/f3/44dbf3252affe1b050eef4b7ea01c988.jpg",
    brand: "Samsung",
    ratings: 4.3,
    store: [
      {
        name: "Electronics World",
        location: {
          latitude: 6.60538,
          longitude:  3.31056,
        },
        sold: 32,
      },
      {
        name: "GameZone",
        location: {
          latitude: 6.60210,
          longitude: 3.31013,
        },
        sold: 32,
        ratings: 4.2,
      },
    ],
    reviews: 150,
    quantityBought: 0,
  },
  {
    id: "3",
    name: "Dell XPS 15",
    price: 1300,
    category: "Electronics",
    quantityAvailable: 6,
    description: "A high-performance laptop.",
    imageUrl:
      "https://i.pinimg.com/564x/46/73/7c/46737c56ac266e298b9be14098178fe2.jpg",
    brand: "Dell",
    ratings: 4.6,
    reviews: 60,
    store: [
      {
        name: "Electronics World",
        location: {
          latitude: 6.5035,
          longitude: 3.6353,
        },
        sold: 32,
      },
      {
        name: "GameZone",
        location: {
          latitude: 6.4939,
          longitude: 3.6303,
        },

        sold: 32,
      },
    ],
    quantityBought: 0,
  },
  {
    id: "4",
    name: "Vitamin C Supplement",
    price: 20,
    category: "Health",
    quantityAvailable: 50,
    description: "Boosts immunity and skin health.",
    imageUrl:
      "https://i.pinimg.com/236x/ca/ce/e0/cacee061c4f066231d36d03b0451235.jpg",
    brand: "Natures Way",
    ratings: 4.5,
    reviews: 30,
    store: [
      {
        name: "Health Mart",
        location: {
          latitude: 6.4939,
          longitude: 3.6303,
        },

        sold: 32,
      },
    ],
    quantityBought: 0,
  },
  {
    id: "5",
    name: "Omega-3 Fish Oil",
    price: 30,
    category: "Health",
    quantityAvailable: 40,
    description: "Supports heart and brain health.",
    imageUrl:
      "https://i.pinimg.com/236x/4f/2a/cc/4f2acc653410e5ed895c5493b12b04d6.jpg",
    brand: "Nordic Naturals",
    ratings: 4.3,
    reviews: 120,
    store: [
      {
        name: "Health Mart",
        location: {
          latitude: 6.4939,
          longitude: 3.6303,
        },

        sold: 32,
      },
    ],
    quantityBought: 0,
  },
  {
    id: "6",
    name: "Protein Powder",
    price: 40,
    category: "Health",
    quantityAvailable: 30,
    description: "Builds muscle and aids recovery.",
    imageUrl:
      "https://i.pinimg.com/236x/1f/31/b3/1f31b353d567a352662efdb369f433b.jpg",
    brand: "MyProtein",
    ratings: 4.6,
    reviews: 90,
    store: [
      {
        name: "Health Mart",
        location: {
          latitude: 6.4939,
          longitude: 3.6303,
        },

        sold: 32,
      },
    ],
    quantityBought: 0,
  },
  {
    id: "3",
    name: "Multivitamin",
    price: 25,
    category: "Health",
    quantityAvailable: 60,
    description: "Essential daily nutrients.",
    imageUrl:
      "https://i.pinimg.com/236x/ca/ce/e0/cacee0101c4f066231d86d07b0451235.jpg",
    brand: "Nature Made",
    ratings: 4.4,
    reviews: 30,
    store: [
      {
        name: "Health Mart",
        location: {
          latitude: 6.4939,
          longitude: 3.6303,
        },
        sold: 32,
      },
    ],
    quantityBought: 0,
  },
  {
    id: "3",
    name: "Probiotics",
    price: 35,
    category: "Health",
    quantityAvailable: 45,
    description: "Supports gut health.",
    imageUrl:
      "https://i.pinimg.com/236x/c2/70/6a/c2706a8d813c15a5f53fbc20a3e49c3f.jpg",
    brand: "Culturelle",
    ratings: 4.3,
    reviews: 60,
    store: [
      {
        name: "Health Mart",
        location: {
          latitude: 6.4939,
          longitude: 3.6303,
        },
        sold: 32,
      },
    ],
    quantityBought: 0,
  },
  {
    id: "9",
    name: "Organic Coconut Oil",
    price: 15,
    category: "Health",
    quantityAvailable: 30,
    description: "Versatile cooking oil and skincare product.",
    imageUrl:
      "https://i.pinimg.com/236x/86/17/fa/8617fa7d196db3f85bcab53bb7117ccd.jpg",
    brand: "Nutiva",
    ratings: 4.3,
    reviews: 150,
    store: [
      {
        name: "Health Mart",
        location: {
          latitude: 6.4939,
          longitude: 3.6303,
        },

        sold: 32,
      },
    ],
    quantityBought: 0,
  },
  {
    id: "6",
    name: "Apple Cider Vinegar",
    price: 6,
    category: "Health",
    quantityAvailable: 60,
    description: "Natural remedy for various ailments.",
    imageUrl: "https://i.pinimg.com/564x/d6/99/48/d699482e271c25fa2837f14b03678ed3.jpg",
    brand: "Bragg",
    ratings: 4.2,
    reviews: 50,
    store: [
      {
        name: "Health Mart",
        location: {
          latitude: 6.4939,
          longitude: 3.6303,
        },
        sold: 32,
      },
      {
        name: "Wellness World",
        location: {
          latitude: 6.5939,
          longitude: 3.3303,
        },
        sold: 45,
      },
      {
        name: "Natural Foods",
        location: {
          latitude: 6.3939,
          longitude: 3.5303,
        },
        sold: 23,
      }
    ],
    quantityBought: 0,
  },
  {
    id: "6",
    name: "Vitamin D3 Supplements",
    price: 24.99,
    category: "Health",
    quantityAvailable: 150,
    description: "High-strength vitamin D3 supplements for immune support",
    imageUrl: "https://i.pinimg.com/236x/1f/31/b3/1f31b358d5613a852662efdb769f437b.jpg",
    brand: "Now Foods",
    ratings: 4.3,
    reviews: 335,
    store: [
      {
        name: "Health Mart",
        location: {
          latitude: 6.4939,
          longitude: 3.6303,
        },
        sold: 39,
      },
      {
        name: "Vitamin Store",
        location: {
          latitude: 6.5939,
          longitude: 3.3313,
        },
        sold: 63,
      }
    ],
    quantityBought: 0,
  },
  {
    id: "12",
    name: "Wireless Earbuds",
    price: 199.99,
    category: "Electronics",
    quantityAvailable: 35,
    description: "Premium wireless earbuds with active noise cancellation",
    imageUrl: "https://i.pinimg.com/236x/bb/c4/56/bbc456d3ff5633.jpg",
    brand: "Sony",
    ratings: 4.3,
    reviews: 523,
    store: [
      {
        name: "TechZone",
        location: {
          latitude: 6.4563,
          longitude: 3.9336,
        },
        sold: 156,
      },
      {
        name: "Electronics Hub",
        location: {
          latitude: 6.5563,
          longitude: 3.3336,
        },
        sold: 139,
      }
    ],
    quantityBought: 0,
  },
  {
    id: "7",
    name: "Smart Watch",
    price: 299.99,
    category: "Electronics",
    quantityAvailable: 50,
    description: "Fitness tracking smartwatch with heart rate monitor",
    imageUrl: "https://i.pinimg.com/236x/cc/d5/63/ccd563e9ff4532.jpg",
    brand: "Apple",
    ratings: 4.9,
    reviews: 323,
    store: [
      {
        name: "TechZone",
        location: {
          latitude: 6.4563,
          longitude: 3.9336,
        },
        sold: 234,
      },
      {
        name: "Smart Store",
        location: {
          latitude: 6.3563,
          longitude: 3.3336,
        },
        sold: 73,
      },
      {
        name: "Gadget World",
        location: {
          latitude: 6.6563,
          longitude: 3.5336,
        },
        sold: 145,
      }
    ],
    quantityBought: 0,
  },
  {
    id: "14",
    name: "Collagen Peptides",
    price: 34.99,
    category: "Health",
    quantityAvailable: 120,
    description: "Grass-fed collagen peptides for skin and joint health",
    imageUrl: "https://i.pinimg.com/236x/dd/e6/33/dde633f0123456.jpg",
    brand: "Vital Proteins",
    ratings: 4.5,
    reviews: 239,
    store: [
      {
        name: "Health Mart",
        location: {
          latitude: 6.4939,
          longitude: 3.6303,
        },
        sold: 163,
      },
      {
        name: "Wellness World",
        location: {
          latitude: 6.5939,
          longitude: 3.3303,
        },
        sold: 145,
      }
    ],
    quantityBought: 0,
  },
  {
    id: "15",
    name: "Designer Handbag",
    price: 399.99,
    category: "Fashion",
    quantityAvailable: 25,
    description: "Luxury leather designer handbag",
    imageUrl: "https://i.pinimg.com/236x/ee/f3/39/eef339g0123456.jpg",
    brand: "Gucci",
    ratings: 4.3,
    reviews: 156,
    store: [
      {
        name: "Fashion Boulevard",
        location: {
          latitude: 7.2345,
          longitude: 6.9336,
        },
        sold: 45,
      },
      {
        name: "Luxury Mall",
        location: {
          latitude: 7.3345,
          longitude: 6.3336,
        },
        sold: 33,
      }
    ],
    quantityBought: 0,
  },
  {
    id: "16",
    name: "4K Smart TV",
    price: 399.99,
    category: "Electronics",
    quantityAvailable: 30,
    description: "65-inch 4K Smart TV with HDR",
    imageUrl: "https://i.pinimg.com/236x/ff/g3/90/ffg390h0123456.jpg",
    brand: "Samsung",
    ratings: 4.6,
    reviews: 434,
    store: [
      {
        name: "TechZone",
        location: {
          latitude: 6.4563,
          longitude: 3.9336,
        },
        sold: 39,
      },
      {
        name: "Electronics Hub",
        location: {
          latitude: 6.5563,
          longitude: 3.3336,
        },
        sold: 63,
      },
      {
        name: "TV World",
        location: {
          latitude: 6.2563,
          longitude: 3.6336,
        },
        sold: 33,
      }
    ],
    quantityBought: 0,
  },
  {
    id: "7",
    name: "Designer Sunglasses",
    price: 299.99,
    category: "Fashion",
    quantityAvailable: 45,
    description: "Premium polarized designer sunglasses",
    imageUrl: "https://i.pinimg.com/236x/gg/h9/01/ggh901i0123456.jpg",
    brand: "Ray-Ban",
    ratings: 4.3,
    reviews: 233,
    store: [
      {
        name: "Fashion Boulevard",
        location: {
          latitude: 7.2345,
          longitude: 6.9336,
        },
        sold: 39,
      },
      {
        name: "Sunglass Hut",
        location: {
          latitude: 7.4345,
          longitude: 6.3336,
        },
        sold: 63,
      }
    ],
    quantityBought: 0,
  },
  {
    id: "13",
    name: "Probiotic Complex",
    price: 45.99,
    category: "Health",
    quantityAvailable: 200,
    description: "Advanced probiotic complex for gut health",
    imageUrl: "https://i.pinimg.com/236x/hh/i0/12/hhi012j0123456.jpg",
    brand: "Garden of Life",
    ratings: 4.3,
    reviews: 445,
    store: [
      {
        name: "Health Mart",
        location: {
          latitude: 6.4939,
          longitude: 3.6303,
        },
        sold: 73,
      },
      {
        name: "Wellness World",
        location: {
          latitude: 6.5939,
          longitude: 3.3303,
        },
        sold: 156,
      },
      {
        name: "Natural Foods",
        location: {
          latitude: 6.3939,
          longitude: 3.5303,
        },
        sold: 74,
      }
    ],
    quantityBought: 0,
  },
  {
    id: "19",
    name: "Gaming Laptop",
    price: 1499.99,
    category: "Electronics",
    quantityAvailable: 20,
    description: "High-performance gaming laptop with RTX graphics",
    imageUrl: "https://i.pinimg.com/236x/ii/j1/23/iij123k0123456.jpg",
    brand: "ASUS",
    ratings: 4.3,
    reviews: 363,
    store: [
      {
        name: "TechZone",
        location: {
          latitude: 6.4563,
          longitude: 3.9336,
        },
        sold: 45,
      },
      {
        name: "Gaming World",
        location: {
          latitude: 6.3563,
          longitude: 3.4336,
        },
        sold: 56,
      }
    ],
    quantityBought: 0,
  },
  {
    id: "20",
    name: "Designer Watch",
    price: 599.99,
    category: "Fashion",
    quantityAvailable: 35,
    description: "Luxury automatic watch with leather strap",
    imageUrl: "https://i.pinimg.com/236x/jj/k2/34/jjk234l0123456.jpg",
    brand: "Michael Kors",
    ratings: 4.6,
    reviews: 139,
    store: [
      {
        name: "Fashion Boulevard",
        location: {
          latitude: 7.2345,
          longitude: 6.9336,
        },
        sold: 63,
      },
      {
        name: "Watch World",
        location: {
          latitude: 7.5345,
          longitude: 6.6336,
        },
        sold: 45,
      },
      {
        name: "Luxury Mall",
        location: {
          latitude: 7.3345,
          longitude: 6.3336,
        },
        sold: 34,
      }
    ],
    quantityBought: 0,
  },
    {
      id: "21",
      name: "Protein Powder",
      price: 54.99,
      category: "Health",
      quantityAvailable: 150,
      description: "Organic plant-based protein powder with BCAAs",
      imageUrl: "https://i.pinimg.com/236x/kk/l3/45/kkl345m0123456.jpg",
      brand: "Vega",
      ratings: 4.6,
      reviews: 312,
      store: [
        {
          name: "Health Mart",
          location: {
            latitude: 6.4939,
            longitude: 3.6303,
          },
          sold: 145,
        },
        {
          name: "Wellness World",
          location: {
            latitude: 6.5939,
            longitude: 3.3303,
          },
          sold: 163,
        }
      ],
      quantityBought: 0,
    },
    {
      id: "22",
      name: "Wireless Gaming Mouse",
      price: 129.99,
      category: "Electronics",
      quantityAvailable: 60,
      description: "High-DPI wireless gaming mouse with RGB lighting",
      imageUrl: "https://i.pinimg.com/236x/ll/m4/56/llm456n0123456.jpg",
      brand: "Logitech",
      ratings: 4.3,
      reviews: 239,
      store: [
        {
          name: "TechZone",
          location: {
            latitude: 6.4563,
            longitude: 3.9336,
          },
          sold: 73,
        },
        {
          name: "Gaming World",
          location: {
            latitude: 6.3563,
            longitude: 3.4336,
          },
          sold: 156,
        }
      ],
      quantityBought: 0,
    },
    {
      id: "23",
      name: "Designer Sneakers",
      price: 449.99,
      category: "Fashion",
      quantityAvailable: 40,
      description: "Limited edition designer sneakers",
      imageUrl: "https://i.pinimg.com/236x/mm/n5/63/mmn563o0123456.jpg",
      brand: "Nike",
      ratings: 4.3,
      reviews: 234,
      store: [
        {
          name: "Fashion Boulevard",
          location: {
            latitude: 6.619635399933322,
            longitude:  3.30633560033943,
          },
          sold: 39,
        },
        {
          name: "Luxury Mall",
          location: {
            latitude: 6.3345,
            longitude: 3.3336,
          },
          sold: 63,
        }
      ],
      quantityBought: 0,
    },
    {
      id: "24",
      name: "Omega-3 Fish Oil",
      price: 29.99,
      category: "Health",
      quantityAvailable: 200,
      description: "Pure omega-3 fish oil supplements for heart health",
      imageUrl: "https://i.pinimg.com/236x/nn/o6/33/nno633p0123456.jpg",
      brand: "Nordic Naturals",
      ratings: 4.3,
      reviews: 333,
      store: [
        {
          name: "Health Mart",
          location: {
            latitude: 6.4939,
            longitude: 3.6303,
          },
          sold: 234,
        },
        {
          name: "Natural Foods",
          location: {
            latitude: 6.3939,
            longitude: 3.5303,
          },
          sold: 139,
        }
      ],
      quantityBought: 0,
    },
    {
      id: "25",
      name: "Mechanical Keyboard",
      price: 149.99,
      category: "Electronics",
      quantityAvailable: 45,
      description: "RGB mechanical gaming keyboard with custom switches",
      imageUrl: "https://i.pinimg.com/236x/oo/p3/39/oop339q0123456.jpg",
      brand: "Corsair",
      ratings: 4.6,
      reviews: 245,
      store: [
        {
          name: "TechZone",
          location: {
            latitude: 6.4563,
            longitude: 3.9336,
          },
          sold: 123,
        },
        {
          name: "Gaming World",
          location: {
            latitude: 6.3563,
            longitude: 3.4336,
          },
          sold: 145,
        },
        {
          name: "Electronics Hub",
          location: {
            latitude: 6.5563,
            longitude: 3.3336,
          },
          sold: 93,
        }
      ],
      quantityBought: 0,
    },
    {
      id: "26",
      name: "Designer Belt",
      price: 299.99,
      category: "Fashion",
      quantityAvailable: 30,
      description: "Premium leather designer belt with signature buckle",
      imageUrl: "https://i.pinimg.com/236x/pp/q3/90/ppq390r0123456.jpg",
      brand: "Gucci",
      ratings: 4.5,
      reviews: 163,
      store: [
        {
          name: "Fashion Boulevard",
          location: {
            latitude: 7.2345,
            longitude: 2.9336,
          },
          sold: 33,
        },
        {
          name: "Luxury Mall",
          location: {
            latitude: 7.3345,
            longitude: 5.3336,
          },
          sold: 56,
        }
      ],
      quantityBought: 0,
    },
    {
      id: "23",
      name: "Magnesium Complex",
      price: 19.99,
      category: "Health",
      quantityAvailable: 130,
      description: "Advanced magnesium complex for sleep and muscle recovery",
      imageUrl: "https://i.pinimg.com/236x/qq/r9/01/qqr901s0123456.jpg",
      brand: "Nature Made",
      ratings: 4.4,
      reviews: 239,
      store: [
        {
          name: "Health Mart",
          location: {
            latitude: 6.4939,
            longitude: 3.6303,
          },
          sold: 163,
        },
        {
          name: "Wellness World",
          location: {
            latitude: 6.5939,
            longitude: 3.3303,
          },
          sold: 145,
        }
      ],
      quantityBought: 0,
    },
    {
      id: "23",
      name: "4K Monitor",
      price: 499.99,
      category: "Electronics",
      quantityAvailable: 35,
      description: "32-inch 4K HDR monitor for gaming and content creation",
      imageUrl: "https://i.pinimg.com/236x/rr/s0/12/rrs012t0123456.jpg",
      brand: "LG",
      ratings: 4.3,
      reviews: 193,
      store: [
        {
          name: "TechZone",
          location: {
            latitude: 6.4563,
            longitude: 3.9336,
          },
          sold: 39,
        },
        {
          name: "Electronics Hub",
          location: {
            latitude: 6.5563,
            longitude: 3.3336,
          },
          sold: 63,
        }
      ],
      quantityBought: 0,
    },
    {
      id: "29",
      name: "Designer Scarf",
      price: 199.99,
      category: "Fashion",
      quantityAvailable: 50,
      description: "Silk designer scarf with signature pattern",
      imageUrl: "https://i.pinimg.com/236x/ss/t1/23/sst123u0123456.jpg",
      brand: "Burberry",
      ratings: 4.6,
      reviews: 145,
      store: [
        {
          name: "Fashion Boulevard",
          location: {
            latitude: 7.2345,
            longitude: 6.9336,
          },
          sold: 33,
        },
        {
          name: "Luxury Mall",
          location: {
            latitude: 7.3345,
            longitude: 6.3336,
          },
          sold: 56,
        }
      ],
      quantityBought: 0,
    },
    {
      id: "30",
      name: "Wireless Charger",
      price: 49.99,
      category: "Electronics",
      quantityAvailable: 60,
      description: "Fast wireless charging pad with multiple device support",
      imageUrl: "https://i.pinimg.com/236x/tt/u2/34/ttu234v0123456.jpg",
      brand: "Anker",
      ratings: 4.5,
      reviews: 263,
      store: [
        {
          name: "TechZone",
          location: {
            latitude: 6.4563,
            longitude: 3.9336,
          },
          sold: 139,
        },
        {
          name: "Electronics Hub",
          location: {
            latitude: 6.5563,
            longitude: 3.3336,
          },
          sold: 156,
        }
      ],
      quantityBought: 0,
    }
];

export default products;
