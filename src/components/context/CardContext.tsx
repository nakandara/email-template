import React, { createContext, useContext, useState, ReactNode } from "react";

interface CardContextProps {
    nameCardType: string;
    nameNameCard: string;
    addressLine1CardType:string;
    addressLine1CardName:string;
    addressLine2CardType:string;
    addressLine2CardName:string;
  setNameCardType: (type: string) => void;
  setNameNameCard: (name: string) => void;
  setAddressLine1CardType:(type: string) => void;
  setAddressLine1CardName: (name: string) => void;
    setAddressLine2CardType:(type: string) => void;
  setAddressLine2CardName: (name: string) => void;
}

const CardContext = createContext<CardContextProps | undefined>(undefined);

export const CardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [nameCardType, setNameCardType] = useState("");
  const [nameNameCard, setNameNameCard] = useState("");

  const [addressLine1CardType, setAddressLine1CardType] = useState("");
  const [addressLine1CardName, setAddressLine1CardName] = useState("");

  const [addressLine2CardName, setAddressLine2CardName] = useState("");
  const [addressLine2CardType, setAddressLine2CardType] = useState("");

  return (
    <CardContext.Provider value={{ 
        nameCardType, nameNameCard, setNameCardType, setNameNameCard,
        setAddressLine1CardType,setAddressLine1CardName,addressLine1CardType,addressLine1CardName,
        setAddressLine2CardType,setAddressLine2CardName,addressLine2CardType,addressLine2CardName
        
        }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCardContext must be used within a CardProvider");
  }
  return context;
};
