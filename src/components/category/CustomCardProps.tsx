import React, { ReactNode, useState } from "react";
import { useCardContext } from "../context/CardContext";

interface CustomCardProps {
  title: string;
  children: ReactNode;
  cardName: any;
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
  } = useCardContext();
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const handleSave = () => {
    console.log("Type:", type);
    console.log("Name:", name);
    console.log("cardName:", cardName);

    switch (cardName) {
      case "NameCard":
        setNameCardType(type);
        setNameNameCard(name);

        break;
      case "AddressCardOne":
        setAddressLine1CardType(type);
        setAddressLine1CardName(name);
        break;
      case "AddressCardTwo":
        setAddressLine2CardType(type);
        setAddressLine2CardName(name);
        break;
      // Add other cases as needed
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
