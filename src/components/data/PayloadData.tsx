// PayloadData.ts

interface Order {
  type: string;
  price: number;
}

interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  zipCode: string;
}

export interface PayloadItem {
  name: string;
  address: Address;
  birthday: string;
  pastOrders: Order[];
}

interface Guest {
  name: string;
  email: string;
}

export interface payloadEvent {
  name: string;
  totalGuests: string;
  date: string;
  guests: Guest[];
}

interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

interface OrderPayload {
  id: string;
  totalPrice: string; 
  paymentMethod: string;
  items: OrderItem[];
}

interface AddressUser {
  Line1: string;
  Line2: string;
  city: string;
  zipCode: string;
}

interface UserPayload {
  name: string;
  email: string;
  dob: string;
  address: AddressUser[];
}

export const payloadData: PayloadItem[] = [
  {
    name: "Ruwan",
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

export const payloadEvent: payloadEvent[] = [
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

export const payloadOrder: OrderPayload[] = [
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

export const payloadUser: UserPayload[] = [
  {
    name: "Ruwan",
    email: "ruwan@gmail.com0",
    dob: "2024-04-01",
    address: [
      {
        Line1: "Samagi Mawatha",
        Line2: "Kaduwela",
        city: "Panadura",
        zipCode: "11234",
      },
    ],
  },
];
