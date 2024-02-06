 const payloadData = [
  {
    name: "Ruwan",
    example: "Ruwan",
    address: {
      addressLine1: "Madurupitiya",
      addressLine2: "Loluwagoda",
      city: "Mirigama",
      zipCode: "11204",
    },
    birthday: "1888-07-17T00:00:00.000Z",
    pastOrders: [
      {
        type: "cat food",
        price: 100,
      },
      {
        type: "dog food",
        price: 1000,
      },
    ],
  },
];

 const payloadEvent = [
  {
    name: "Ruwan",
    totalGuests: "3",
    date: "2024-01091",
    guests: [
      {
        name: "cat food",
        email: "pramod@gmail.com",
      },
      {
        name: "cat food",
        email: "navod123@gmail",
      },
      {
        name: "cat food",
        email: "laksitha@gmail.com",
      },
    ],
  },
];

 const payloadOrder = [
  {
    id: "#223033",
    totalPrice: "4000",
    paymentMethod: "BANK_TRANSFER",
    items: [
      {
        name: "HB Pencil",
        quantity: 20,
        unitPrice: 100,
      },
      {
        name: "Blue Pencil",
        quantity: 10,
        unitPrice: 50,
      },
      {
        name: "Red Pencil",
        quantity: 20,
        unitPrice: 70,
      },
    ],
  },
];

 const payloadUser = [
  {
    name: "Ruwan",
    email: "ruwan@gmail.com0",
    dob: "2024-04-01",
    address: {
      addressLine1: "Madurupitiya",
      addressLine2: "Loluwagoda",
      city: "Mirigama",
      zipCode: "11204",
    },
  },
];

export const events = [
  { name: "Data Created", payload: payloadData },
  { name: "Order Created", payload: payloadEvent },
  { name: "Event Created", payload: payloadOrder },
  { name: "User Created", payload: payloadUser },
];
