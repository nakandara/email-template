import React, { ReactNode, useState } from "react";
import { useCardContext } from "../context/CardContext";
import { transformPayloadToData } from "../data/transformPayloadToData";
import { events } from "../data/PayloadData";

interface CustomCardProps {
  title: string;
  children: ReactNode;
  cardName: string;
  type: string;
  name: string;
}

const inputPayload = {
  name: "User_name",
  example: "User_Example",
  address: {
    addressLine1: "Madurupitiya",
    addressLine2: "Loluwagoda",
    city: "Mirigama",
    zipCode: "11204",
  },
  birthday: "1888-07-17T00:00:00.000Z",
  pastOrders: [
    {
      type: "cat food",
      price: 100,
    },
    {
      type: "dog food",
      price: 1000,
    },
  ],
};

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  children,
  cardName,
  type: initialType,
  name: initialName,
}) => {
  const {
    setNameCardType,
    setNameNameCard,
    setAddressLine1CardType,
    setAddressLine1CardName,
    setAddressLine2CardType,
    setAddressLine2CardName,
    setCityCardName,
    setCityCardType,
    setZipCodeCardName,
    setZipCodeCardType,
    setBirthdayCardName,
    setBirthdayCardType,
    setTotalGuestsCardName,
    setTotalGuestsCardType,
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

  const handleSave = () => {
    const setTypeAndName = (setTypeFn: Function, setNameFn: Function) => {
      setTypeFn(type);
      setNameFn(name);
    };

    switch (cardName) {
      case keyList[0]:
        setTypeAndName(setNameCardType, setNameNameCard);
        break;
      case keyList[1]:
        setTypeAndName(setAddressLine1CardType, setAddressLine1CardName);
        break;
      case keyList[2]:
        setTypeAndName(setAddressLine2CardType, setAddressLine2CardName);
        break;
      case keyList[3]:
        setTypeAndName(setCityCardType, setCityCardName);
        break;
      case keyList[4]:
        setTypeAndName(setZipCodeCardType, setZipCodeCardName);
        break;
      case keyList[5]:
        setTypeAndName(setBirthdayCardType, setBirthdayCardName);
        break;
      case keyList[6]:
        setTypeAndName(setTotalGuestsCardType, setTotalGuestsCardName);
        break;
      default:
        console.log("Select Options");
    }
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
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
