import React, { ReactNode, useState } from "react";
import { useCardContext } from "../context/CardContext";

interface CustomCardProps {
  title: string;
  children: ReactNode;
  cardName:
    | "NameCard"
    | "AddressCardOne"
    | "AddressCardTwo"
    | "BirthDayCard"
    | "ZipCodeCard"
    | "CityCard"
    | "TotalGuestsCard";
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
  } = useCardContext();
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  const handleSave = () => {
    const setTypeAndName = (setTypeFn: Function, setNameFn: Function) => {
      setTypeFn(type);
      setNameFn(name);
    };

    switch (cardName) {
      case "NameCard":
        setTypeAndName(setNameCardType, setNameNameCard);
        break;
      case "AddressCardOne":
        setTypeAndName(setAddressLine1CardType, setAddressLine1CardName);
        break;
      case "AddressCardTwo":
        setTypeAndName(setAddressLine2CardType, setAddressLine2CardName);
        break;
      case "CityCard":
        setTypeAndName(setCityCardType, setCityCardName);
        break;
      case "ZipCodeCard":
        setTypeAndName(setZipCodeCardType, setZipCodeCardName);
        break;
      case "BirthDayCard":
        setTypeAndName(setBirthdayCardType, setBirthdayCardName);
        break;
      case "TotalGuestsCard":
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
