import React, { ReactNode, useEffect, useState } from "react";
import { useCardContext } from "../context/CardContext";
import { OutPayloadTransformer } from "../data/OutPayloadTransformer";

import { events } from "../data/PayloadData";

interface CustomCardProps {
  title: string;
  children: ReactNode;
  cardName: string;
  type: string;
  name: string;
}

interface DataItem {
  variable: string;

  type: string;
  itemType?: string;
  itemKeys?: DataItem[];
}

type PayloadType = {
  name: string;
  type: string;
  accessor: {
    type: string;
    key?: string;
    function?: string;
    pickKeys?: string[];
    columnsNames?: { key: string; value: string }[];
  }[];
};

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  children,
  cardName,
  type: initialType,
  name: initialName,
}) => {
  const { setOutPayLoad, selectPayLoad } = useCardContext();
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  console.log(selectPayLoad, "selectPayLoad");

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

  console.log(keyList, "keyListkeyList");

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
        const keys = key.split(".");
        let updatedPayload = { ...prevPayload };
        let currentObject: any = updatedPayload;

        for (let i = 0; i < keys.length - 1; i++) {
          if (!currentObject[keys[i]]) {
            currentObject[keys[i]] = {};
          }
          currentObject = currentObject[keys[i]];
        }

        currentObject[keys[keys.length - 1]] = { value, type: valueType };

        return updatedPayload;
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

  const handleSave = () => {
    const newData: PayloadType[] = OutPayloadTransformer(payload);
    setOutPayLoad(newData);

    const payloadWithTypes: { [key: string]: { value: string; type: string } } =
      keyList.reduce((acc, field) => {
        acc[field.name] = {
          value: payload[field.name].value,
          type: payload[field.name].type,
        };
        return acc;
      }, {} as { [key: string]: { value: string; type: string } }); // Specify the type of the initial accumulator as an empty object
    localStorage.setItem("payload", JSON.stringify(payloadWithTypes));
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
        <input type="text" value={payload.example.value} readOnly />
      </div>
      {children}
      <button className="custom-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default CustomCard;
