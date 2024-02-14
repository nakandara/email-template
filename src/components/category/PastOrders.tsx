import React, { ReactNode, useState } from "react";
import { useCardContext } from "../context/CardContext";

interface CustomCardProps {
  title: string;
  children: ReactNode;
  card_Name: any;
  typeItem: string;
  subCategory: any;
  tableColumn: number;
  name: string;
}

const PastOrders: React.FC<CustomCardProps> = ({
  card_Name,
  title,
  typeItem,
  subCategory,
  tableColumn,
}) => {
  const { selectPayLoad } = useCardContext();


  const [type, setType] = useState("");
  const [name, setName] = useState("");

  const handleSave = () => {};

  const renderTableColumns = () => {
    return subCategory.map((category: any, index: any) => (
      <th key={`column-${index}`}>
        {card_Name && category.title === card_Name.split(".")[1] ? (
          <input
            type="text"
            placeholder={category.title}
            value={category.title}
            onChange={(e) => {
              
            }}
          />
        ) : (
          category.title
        )}
      </th>
    ));
  };
  const renderExampleTableColumns = () => {
    return subCategory.map((category: any, index: any) => (
      <th key={`column-${index}`}>{category.title}</th>
    ));
  };

  const renderTableRows = () => {
    const rows = [];
    for (let i = 0; i < tableColumn - (tableColumn - 1); i++) {
      rows.push(
        <tr key={`row-${i}`}>
          {subCategory.map((category: any, index: any) => (
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
              <tr>{renderExampleTableColumns()}</tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      </div>
      <button className="custom-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default PastOrders;
