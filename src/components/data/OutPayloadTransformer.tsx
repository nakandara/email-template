interface InputVariable {
  variable: string;
  example: string | null;
  type: string;
  keys?: InputVariable[];
}

interface OutputVariable {
  name: string;
  example: string | string[] | null;
  type: string;
  accessor: {
    type: string;
    key?: string;
    function?: string;
    pickKeys?: string[];
  }[];
}

export const LastTransformPayload = (
  payload: InputVariable[]
): OutputVariable[] => {
  return payload
    .map((variable: InputVariable) => {
      if (!variable) {
        return null;
      }

      let transformedVariable: OutputVariable = {
        name:
          variable.variable?.charAt(0).toUpperCase() +
          variable.variable?.slice(1),
        example: variable.example,
        type: variable.type,
        accessor: [],
      };

      if (variable.type === "object" && variable.keys) {
        const exampleArray = variable.keys.map(
          (key: InputVariable) => key.example
        );
        transformedVariable.example = exampleArray.every((ex) => ex !== null)
          ? (exampleArray as string[])
          : null;
        transformedVariable.type = "list";

        transformedVariable.accessor.push({
          type: "object_key",
          key: variable.variable,
        });

        const pickKeys = variable.keys.map(
          (key: InputVariable) => key.variable
        );
        transformedVariable.accessor.push({
          type: "function",
          function: "PICK_VALUES",
          pickKeys,
        });
      } else {
        transformedVariable.accessor.push({
          type: "object_key",
          key: variable.variable,
        });
      }

      return transformedVariable;
    })
    .filter((variable): variable is OutputVariable => variable !== null);
};

// Your interface declarations and function definition

// Example payload
const payload: InputVariable[] = [
  {
    variable: "name",
    example: "Ruwan",
    type: "string",
  },
  {
    variable: "address",
    example: null,
    type: "object",
    keys: [
      {
        variable: "addressLine1",
        example: "Madurupitiya",
        type: "string",
      },
      {
        variable: "addressLine2",
        example: "Loluwagoda",
        type: "string",
      },
      {
        variable: "city",
        example: "Mirigama",
        type: "string",
      },
      {
        variable: "zipCode",
        example: "11204",
        type: "string",
      },
    ],
  },
  {
    variable: "birthday",
    example: "1888-07-17T00:00:00.000Z",
    type: "date",
  },
];

type InputItem = {
  [key: string]: {
    value: string;
    type: string;
  };
};

type OutputItemAccessor = {
  type: string;
  key?: string;
  function?: string;
  pickKeys?: string[];
};

type OutputItem = {
  name: string;
  type: string;
  example?: string[] | string;
  accessor: OutputItemAccessor[];
};

export const transformPayload = (payload: InputItem[]): OutputItem[] => {
  const output: OutputItem[] = [];

  payload.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      const accessor: OutputItemAccessor[] = [];
      const keys = key.split(".");
      const accessorBase: OutputItemAccessor = {
        type: "object_key",
        key: keys[0],
      };
      accessor.push(accessorBase);
      if (keys.length > 1) {
        accessor.push({
          type: "function",
          function: "PICK_VALUES",
          pickKeys: keys.slice(1),
        });
      }
      const outputItem: OutputItem = {
        name: value.value,
        type: value.type,
        accessor: accessor,
      };
      output.push(outputItem);
    });
  });

  return output;
};

// Example usage
const inputPayload: InputItem[] = [
  {
    name: {
      value: "User_Name",
      type: "string",
    },
    "address.addressLine1": {
      value: "user_addressLine_one",
      type: "string",
    },
    "address.addressLine2": {
      value: "user_addressLine_two",
      type: "string",
    },
    "address.city": {
      value: "user_City",
      type: "string",
    },
    "address.zipCode": {
      value: "user_zip",
      type: "Number",
    },
    birthday: {
      value: "User_birthday",
      type: "Date",
    },
    pastOrders: {
      value: "",
      type: "object",
    },
  },
];
