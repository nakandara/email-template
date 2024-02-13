import React, { ReactNode, useState } from "react";
import { useCardContext } from "../context/CardContext";

interface CustomCardProps {
  title: string;
  children: ReactNode;
  card_Name: any;
  typeItem: string;
  subCategory:any;
  tableColumn: number; // Change the type to number
  name: string;
}

const PastOrders: React.FC<CustomCardProps> = ({
  card_Name,
  title,
  typeItem,
  subCategory,
  tableColumn, // Access the tableColumn prop
}) => {
  const {
    setPastOrderTypeCardName,
    setPastOrderTypeCardType,
    setPastOrderPriceCardName,
    setPastOrderPriceCardType,
    selectPayLoad,
  } = useCardContext();

  const [type, setType] = useState("");
  const [name, setName] = useState("");

  const handleSave = () => {
    switch (card_Name) {
      case "type":
        setPastOrderTypeCardType(type);
        setPastOrderTypeCardName(name);
        break;
      case "price":
        setPastOrderPriceCardType(type);
        setPastOrderPriceCardName(name);
        break;
      default:
        console.log("Select Options");
    }
  };

  // Render table columns dynamically based on tableColumn count
  const renderTableColumns = () => {
    return subCategory.map((category:any, index:any) => (
      <th key={`column-${index}`}>{category.title}</th>
    ));
  };

  // Render table rows dynamically based on subCategory and tableColumn
  const renderTableRows = () => {
    const rows = [];
    for (let i = 0; i < tableColumn; i++) {
      rows.push(
        <tr key={`row-${i}`}>
          {subCategory.map((category:any, index:any) => (
            <td key={`cell-${i}-${index}`}>{category.example}</td>
          ))}
        </tr>
      );
    }
    return rows;
  };

  return (
    <div>
      <table className="custom-table-pastOrder">
        <thead>
          <tr>{renderTableColumns()}</tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
      <div className="input-group">
        <label>Example:</label>
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
            <tr>{renderTableColumns()}</tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PastOrders;