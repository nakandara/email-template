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
  