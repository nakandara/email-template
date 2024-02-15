import React, { ReactNode, useEffect, useState } from "react";
import { useCardContext } from "../context/CardContext";
import { transformPayload } from "../data/OutPayloadTransformer";
import {
  extractKeys,
  initialState,
  handleChange,
  handleTypeChange,
  handleSave,
} from "../custom/CustomCardLogic";

type CustomCardProps = {
  title: string;
  children: ReactNode;
  cardName: string;
  type: string;
  name: string;
};

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  children,
  cardName,
  type: initialType,
  name: initialName,
}) => {
  const { setOutPayLoad, selectPayLoad } = useCardContext();
  const keyList = extractKeys(selectPayLoad);
  const [payload, setPayload] = useState<{
    [key: string]: { value: string; type: string };
  }>(initialState(keyList));

  useEffect(() => {
    localStorage.setItem("payload", JSON.stringify(payload));
  }, [payload]);

  return (
    <div className="">
      <div className="input-group">
        <label>Type:</label>
        <select
          value={payload[cardName]?.type || ""}
          onChange={(e) =>
            handleTypeChange(e.target.value, cardName, payload, setPayload)
          }
        >
          <option value="Text">Text</option>
          <option value="Number">Number</option>
          <option value="List">List</option>
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
              payload[cardName]?.type || "",
              payload,
              setPayload
            )
          }
        />
      </div>
      <div className="input-group">
        <label>Example:</label>
        <input type="text" placeholder={title} readOnly />
      </div>
      {children}
      <button
        className="custom-button"
        onClick={() => handleSave(payload, setOutPayLoad)}
      >
        Save
      </button>
    </div>
  );
};

export default CustomCard;
