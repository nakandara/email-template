import React, { createContext, useContext, useState, ReactNode } from "react";

interface CardContextProps {
  nameCardType: string;
  nameNameCard: string;
 
  
 
  pastOrderTypeCardName:string
  pastOrderTypeCardType:string

  pastOrderPriceCardName:string
  pastOrderPriceCardType:string
  selectPayLoad:any
  outPayLoad:any

  totalGuestsCardName:string
  totalGuestsCardType:string

  payLoadData:string

  setNameCardType: (type: string) => void;
  setNameNameCard: (name: string) => void;
  
 


  setPastOrderTypeCardName:(name:string) => void;
  setPastOrderTypeCardType:(type:string) => void;

  setPastOrderPriceCardName:(name:string) => void;
  setPastOrderPriceCardType:(type:string) => void;

  setTotalGuestsCardName:(name:string) => void;
  setTotalGuestsCardType:(type:string) => void;

  setOutPayLoad:(type:any) => void;

  setPayLoadData:(item:any) => void;
  setSelectPayLoad:(item:any) => void;
}

const CardContext = createContext<CardContextProps | undefined>(undefined);

export const CardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [nameCardType, setNameCardType] = useState("");
  const [nameNameCard, setNameNameCard] = useState("");


  const [pastOrderTypeCardName, setPastOrderTypeCardName] = useState("");
  const [pastOrderTypeCardType, setPastOrderTypeCardType] = useState("");

  const [pastOrderPriceCardName, setPastOrderPriceCardName] = useState("");
  const [pastOrderPriceCardType, setPastOrderPriceCardType] = useState("");

  const [totalGuestsCardName, setTotalGuestsCardName] = useState("");
  const [totalGuestsCardType, setTotalGuestsCardType] = useState("");

  const [payLoadData, setPayLoadData] = useState("FIRST");
  const [selectPayLoad, setSelectPayLoad] = useState("");
  const [outPayLoad, setOutPayLoad] = useState("");


  return (
    <CardContext.Provider
      value={{
        nameCardType,
        nameNameCard,
        setNameCardType,
        setNameNameCard,
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
        setTotalGuestsCardType,
        setPayLoadData,
        payLoadData,
        selectPayLoad,
        setSelectPayLoad,
        setOutPayLoad,
        outPayLoad
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
