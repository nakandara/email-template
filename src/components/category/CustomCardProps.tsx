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



const CustomCard: React.FC<CustomCardProps> = ({
  title,
  children,
  cardName,
  type: initialType,
  name: initialName,
}) => {
  const {
    setOutPayLoad,
    selectPayLoad,
  } = useCardContext();
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  console.log(cardName, "cardName");

  function extractKeys(payload: any) {
    const keys: string[] = [];

    function traverse(obj: { [x: string]: any }, path = "") {
      for (const key in obj) {
        const newPath = path ? `${path}.${key}` : key;
        if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
          traverse(obj[key], newPath);
        } else {
          keys.push(newPath);
        }
      }
    }

    traverse(payload);
    return keys;
  }

  const keyList = extractKeys(selectPayLoad);


  const initialState = () => {
    const storedData = localStorage.getItem("payload");
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      const defaultState: { [key: string]: string } = {};
      keyList.forEach((field) => {
        defaultState[field] = "";
      });
      return defaultState;
    }
  };

  const [payload, setPayload] = useState<{ [key: string]: string }>(
    initialState
  );

  useEffect(() => {
    localStorage.setItem("payload", JSON.stringify(payload));
  }, [payload]);

  const handleChange = (key: string, value: string) => {
    setPayload((prevPayload) => ({
      ...prevPayload,
      [key]: value,
    }));
  };


  const handleSave = () => {
    const newData: PayloadType[] = OutPayloadTransformer(payload);
    setOutPayLoad(newData)
    console.log(newData, "ooo");
  };

  return (
    <div className="">
      <div className="input-group">
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="option1">Text</option>
          <option value="option2">Number</option>
          <option value="option3">Date</option>
        </select>
      </div>
      <div className="input-group">
        <label>Name:</label>
        <input
          id={cardName}
          type="text"
          value={payload[cardName] || ""}
          onChange={(e) => handleChange(cardName, e.target.value)}
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
    </div>
  );
};

export default CustomCard;
