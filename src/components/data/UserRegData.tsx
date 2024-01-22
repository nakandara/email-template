import { useCardContext } from "../context/CardContext";

interface DataItem {
  name: string;
  example?: any;
  type: string;
  itemType?: string;
  itemKeys?: DataItem[];
  accessor?: (ObjectKeyAccessor | FunctionAccessor)[];
}

interface ObjectKeyAccessor {
  type: "object_key";
  key: string;
  function?: string;
}

interface ColumnNames {
  key: string;
  value: string;
}

interface FunctionAccessor {
  type: "function";
  function: string;
  pickKeys: string[];
  columnsNames?: ColumnNames[];
}

const UserRegData = () => {
  const {
    nameCardType,
    nameNameCard,
    addressLine1CardName,
    addressLine2CardName,
    cityCardName,
    zipCodeCardName,
    birthdayCardName,
    zipCodeCardType,
    pastOrderTypeCardName,
    birthdayCardType,
    pastOrderPriceCardName,
    pastOrderTypeCardType,
    pastOrderPriceCardType,
  } = useCardContext();

  const newData: DataItem[] = [
    {
      name: nameNameCard,
      type: nameCardType,
      accessor: [
        {
          type: "object_key",
          key: "name",
        },
      ],
    },
    {
      name: "User Address",
      type: nameCardType,
      accessor: [
        {
          type: "object_key",
          key: "address",
        },
        {
          type: "function",
          function: "PICK_VALUES",
          pickKeys: [addressLine1CardName, addressLine2CardName, cityCardName],
        },
      ],
    },

    {
      name: zipCodeCardName,
      type: zipCodeCardType,
      accessor: [
        {
          type: "object_key",
          key: "address",
        },
        {
          type: "object_key",
          key: "zipCode",
        },
      ],
    },
    {
      name: birthdayCardName,
      type: birthdayCardType,
      accessor: [
        {
          type: "object_key",
          key: "birthday",
        },
      ],
    },

    {
      name: "Past Orders",
      example: {
        columns: [pastOrderTypeCardName, pastOrderPriceCardName],
        rows: [
          ["cat food", 100],
          ["dog food", 1000],
        ],
      },
      type: "table",
      accessor: [
        {
          type: "object_key",
          key: "pastOrders",
        },
        {
          type: "function",
          function: "TABLE",
          pickKeys: [],
          columnsNames: [
            {
              key: "type",
              value: pastOrderTypeCardType,
            },
            {
              key: "price",
              value: pastOrderPriceCardType,
            },
          ],
        },
      ],
    },

    {
      name: "Past Order Count",
      type: "number",
      accessor: [
        {
          type: "object_key",
          key: "pastOrders",
        },
        {
          type: "function",
          function: "COUNT",
          pickKeys: [],
        },
      ],
    },
  ];

  console.log(newData, "newData");

  const jsonData = JSON.stringify(newData, null, 2);

  return <div> <pre>
  <code>{jsonData}</code>
</pre></div>;
};

export default UserRegData;
