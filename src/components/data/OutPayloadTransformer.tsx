// payloadTransformer.ts

interface DataItem {
  variable: string;
  example?: any;
  type: string;
  itemType?: string;
  itemKeys?: DataItem[];
}

type PayloadType = {
  name: string;
  example: any;
  type: string;
  accessor: {
    type: string;
    key?: string;
    function?: string;
    pickKeys?: string[];
    columnsNames?: { key: string; value: string }[];
  }[];
};

export const OutPayloadTransformer = (payload: any): PayloadType[] => {
  return Object.keys(payload).map((key) => {
    let transformedField: PayloadType = {
      name: "",
      example: "",
      type: "",
      accessor: [],
    };

    transformedField.name = key
      .split(".")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    transformedField.example = payload[key];

    if (typeof payload[key] === "string") {
      transformedField.type = "string";
    } else if (typeof payload[key] === "number") {
      transformedField.type = "number";
    } else if (Array.isArray(payload[key])) {
      transformedField.type = "list";
    } else if (
      typeof payload[key] === "object" &&
      payload[key] !== null &&
      !Array.isArray(payload[key])
    ) {
      if (payload[key] instanceof Date) {
        transformedField.type = "date";
      } else if ("columns" in payload[key] && "rows" in payload[key]) {
        transformedField.type = "table";
      }
    }

    const keyParts = key.split(".");
    if (keyParts.length === 1) {
      transformedField.accessor.push({ type: "object_key", key: key });
    } else {
      transformedField.accessor.push({
        type: "object_key",
        key: keyParts[0],
      });
      transformedField.accessor.push({
        type: "function",
        function: "PICK_VALUES",
        pickKeys: keyParts.slice(1),
      });
    }

    return transformedField;
  });
};
