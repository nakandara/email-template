import React, { ReactNode, useEffect, useState } from "react";
import { useCardContext } from "../context/CardContext";
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

type OutputItem = {
  name: string;
  type: string;
  example?: string[] | string;
  accessor: OutputItemAccessor[];
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



const CustomCard: React.FC<CustomCardProps> = ({
  title,
  children,
  cardName,
  type: initialType,
  name: initialName,
}) => {
  const { setOutPayLoad, selectPayLoad, outPayLoad } = useCardContext();
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  function extractKeys(payload: any) {
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

  const keyList = extractKeys(selectPayLoad);


  const initialState = () => {
    const storedData = localStorage.getItem("payload");
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      const defaultState: { [key: string]: { value: string; type: string } } =
        {};
      keyList.forEach((field) => {
        defaultState[field.name] = { value: "", type: field.type }; // Include both name and type
      });
      return defaultState;
    }
  };

  const [payload, setPayload] = useState<{
    [key: string]: { value: string; type: string };
  }>(initialState);

  useEffect(() => {
    localStorage.setItem("payload", JSON.stringify(payload));
  }, [payload]);

  const handleChange = (key: string, value: string, valueType: string) => {
    setPayload((prevPayload) => {
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
  };

  const handleTypeChange = (selectedType: string, key: string) => {
    handleChange(key, payload[key].value, selectedType);
  };

  const payloadnn = JSON.stringify(payload, null, 2);

  const handleSave = () => {
    const inputPayload: InputItem[] = [payload];
    const transformedPayload = transformPayload(inputPayload);

    setOutPayLoad(transformedPayload);
  };

  return (
    <div className="">
      <div className="input-group">
        <label>Type:</label>
        <select
          value={payload[cardName]?.type || ""}
          onChange={(e) => handleTypeChange(e.target.value, cardName)}
        >
          <option value="Text">Text</option>
          <option value="Number">Number</option>
          <option value="Number">List</option>
          <option value="string">string</option>
          <option value="Date">Date</option>
        </select>
      </div>
      <div className="input-group">
        <label>Name:</label>
        <input
          id={cardName}
          type="text"
          value={payload[cardName]?.value || ""}
          onChange={(e) =>
            handleChange(
              cardName,
              e.target.value,
              payload[cardName]?.type || ""
            )
          }
        />
      </div>
      <div className="input-group">
        <label>Example:</label>
        <input type="text" placeholder={title} readOnly />
      </div>
      {children}
      <button className="custom-button" onClick={handleSave}>
        Save
      </button>
      {/* 
      <pre>
        <code>{jsonDatakeyListc}</code>
      </pre>
      <div>----------------------</div>
      <pre>
        <code>{jsonDatanc}</code>
      </pre>

      <div>----------------------</div>
      <pre>
        <code>{payloadnn}</code>
      </pre> */}
    </div>
  );
};

export default CustomCard;
