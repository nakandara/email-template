import { ReactNode } from "react";
import { transformPayload } from "../data/OutPayloadTransformer";

type KeyAccessor = { type: string; key: string };
type FunctionAccessor = { type: string; function: string; pickKeys: string[] };
type Accessor = KeyAccessor | FunctionAccessor;

export interface KeyValue {
  value: string | Record<string, any> | Array<string | Record<string, any>>;
  type: string;
}

export interface PayloadItem {
  [key: string]: KeyValue;
}
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

export interface AccessorItem {
  type: string;
  key: string;
  function?: string;
  pickKeys?: string[];
  columnsNames?: { key: string; value: string }[];
}

export interface TransformedItem {
  name: string | Record<string, any> | string[] | Record<string, any>[];
  example: string | Record<string, any> | string[] | Record<string, any>[];
  type: string;
  accessor: AccessorItem[];
}
interface CustomCardProps {
  title: string;
  children: ReactNode;
  cardName: string;
  type: string;
  name: string;
}


export function extractKeys(payload: any) {
    const keysWithType: { name: string; type: string }[] = [];

    function traverse(obj: { [x: string]: any }, path = "") {
      for (const key in obj) {
        const newPath = path ? `${path}.${key}` : key;
        if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
          traverse(obj[key], newPath);
        } else {
          const type = typeof obj[key];
          keysWithType.push({ name: newPath, type: type });
        }
      }
    }

    traverse(payload);
    return keysWithType;
}

export function initialState(keyList: any) {
    const storedData = localStorage.getItem("payload");
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      const defaultState: { [key: string]: { value: string; type: string } } = {};
      keyList.forEach((field:any) => {
        defaultState[field.name] = { value: "", type: field.type }; 
      });
      return defaultState;
    }
}

export function handleChange(key: string, value: string, valueType: string, payload: any, setPayload: any) {
    setPayload((prevPayload: any) => {
        if (key.includes(".")) {
          return {
            ...prevPayload,
            [key]: { value, type: valueType },
          };
        } else {
          return {
            ...prevPayload,
            [key]: { value, type: valueType },
          };
        }
      });
}

export function handleTypeChange(selectedType: string, key: string, payload: any, setPayload: any) {
    handleChange(key, payload[key].value, selectedType, payload, setPayload);
}

export function handleSave(payload: any, setOutPayLoad: any) {
    const inputPayload: InputItem[] = [payload];
    const transformedPayload = transformPayload(inputPayload);

    setOutPayLoad(transformedPayload);
}
