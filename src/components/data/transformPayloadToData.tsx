// payloadTransformer.ts

interface DataItem {
    variable: string;
    example?: any;
    type: string;
    itemType?: string;
    itemKeys?: DataItem[];
  }
  
  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  export const transformPayloadToData = (payload: any): DataItem[] => {
    return Object.entries(payload).map(([key, value]) => {
      const capitalizedKey = capitalizeFirstLetter(key);
  
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        return {
          variable: capitalizedKey,
          example: null,
          type: "object",
          itemKeys: transformPayloadToData(value),
        };
      } else if (Array.isArray(value)) {
        return {
          variable: capitalizedKey,
          example: null,
          type: "array",
          itemType: "object",
          itemKeys: transformPayloadToData(value[0]),
        };
      } else {
        return {
          variable: capitalizedKey,
          example: value,
          type:
            typeof value === "string"
              ? "string"
              : typeof value === "number"
              ? "number"
              : "date",
        };
      }
    });
  };
  