import React, { createContext, useContext, useState, ReactNode } from "react";

interface CardContextProps {
  nameCardType: string;
  nameNameCard: string;
  addressLine1CardType: string;
  addressLine1CardName: string;
  addressLine2CardType: string;
  addressLine2CardName: string;
  cityCardName:string;
  cityCardType:string;
  zipCodeCardName:string
  zipCodeCardType:string

  birthdayCardName:string
  birthdayCardType:string
  pastOrderTypeCardName:string
  pastOrderTypeCardType:string

  pastOrderPriceCardName:string
  pastOrderPriceCardType:string

  totalGuestsCardName:string
  totalGuestsCardType:string

  setNameCardType: (type: string) => void;
  setNameNameCard: (name: string) => void;
  setAddressLine1CardType: (type: string) => void;
  setAddressLine1CardName: (name: string) => void;
  setAddressLine2CardType: (type: string) => void;
  setAddressLine2CardName: (name: string) => void;
  setCityCardName:(name:string) => void;
  setCityCardType:(name:string) => void;

  setZipCodeCardName:(name:string) => void;
  setZipCodeCardType:(name:string) => void;

  setBirthdayCardName:(name:string) => void;
  setBirthdayCardType:(name:string) => void;

  setPastOrderTypeCardName:(name:string) => void;
  setPastOrderTypeCardType:(name:string) => void;

  setPastOrderPriceCardName:(name:string) => void;
  setPastOrderPriceCardType:(name:string) => void;

  setTotalGuestsCardName:(name:string) => void;
  setTotalGuestsCardType:(name:string) => void;
}

const CardContext = createContext<CardContextProps | undefined>(undefined);

export const CardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [nameCardType, setNameCardType] = useState("");
  const [nameNameCard, setNameNameCard] = useState("");

  const [addressLine1CardType, setAddressLine1CardType] = useState("");
  const [addressLine1CardName, setAddressLine1CardName] = useState("");

  const [addressLine2CardName, setAddressLine2CardName] = useState("");
  const [addressLine2CardType, setAddressLine2CardType] = useState("");

  const [cityCardName, setCityCardName] = useState("");
  const [cityCardType, setCityCardType] = useState("");

  const [zipCodeCardName, setZipCodeCardName] = useState("");
  const [zipCodeCardType, setZipCodeCardType] = useState("");

  const [birthdayCardName, setBirthdayCardName] = useState("");
  const [birthdayCardType, setBirthdayCardType] = useState("");


  const [pastOrderTypeCardName, setPastOrderTypeCardName] = useState("");
  const [pastOrderTypeCardType, setPastOrderTypeCardType] = useState("");

  const [pastOrderPriceCardName, setPastOrderPriceCardName] = useState("");
  const [pastOrderPriceCardType, setPastOrderPriceCardType] = useState("");

  const [totalGuestsCardName, setTotalGuestsCardName] = useState("");
  const [totalGuestsCardType, setTotalGuestsCardType] = useState("");

  return (
    <CardContext.Provider
      value={{
        nameCardType,
        nameNameCard,
        setNameCardType,
        setNameNameCard,
        setAddressLine1CardType,
        setAddressLine1CardName,
        addressLine1CardType,
        addressLine1CardName,
        setAddressLine2CardType,
        setAddressLine2CardName,
        addressLine2CardType,
        addressLine2CardName,
        cityCardName,
        cityCardType,
        setCityCardName,
        setCityCardType,
        zipCodeCardName,
        zipCodeCardType,
        setZipCodeCardName,
        setZipCodeCardType,
        birthdayCardType,
        birthdayCardName,
        setBirthdayCardName,
        setBirthdayCardType,
        pastOrderTypeCardType,
        pastOrderTypeCardName,
        setPastOrderTypeCardName,
        setPastOrderTypeCardType,
        pastOrderPriceCardName,
        pastOrderPriceCardType,
        setPastOrderPriceCardName,
        setPastOrderPriceCardType,
        totalGuestsCardName,
        totalGuestsCardType,
        setTotalGuestsCardName,
        setTotalGuestsCardType
      }}
    >
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
