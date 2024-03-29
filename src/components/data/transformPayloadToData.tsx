// payloadTransformer.ts

interface DataItem {
    variable: string;
    example?: any;
    type: string;
    itemType?: string;
    itemKeys?: DataItem[];
  }
  
 
  export const transformPayloadToData = (payload: any): DataItem[] => {
    return Object.entries(payload).map(([key, value]) => {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return {
          variable: key,
          example: null,
          type: 'object',
          itemKeys: transformPayloadToData(value),
        };
      } else if (Array.isArray(value)) {
        return {
          variable: key,
          example: null,
          type: 'array',
          itemType: 'object',
          itemKeys: transformPayloadToData(value[0]),
        };
      } else {
        return {
          variable: key,
          example: value,
          type: typeof value === 'string' ? 'string' : typeof value === 'number' ? 'number' : 'date',
        };
      }
    });
  };