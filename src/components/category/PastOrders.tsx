import React, { ReactNode, useState } from "react";
import { useCardContext } from "../context/CardContext";

interface CustomCardProps {
  title: string;
  children: ReactNode;
  card_Name: any;
  type: string;
  name: string;
}

const PastOrders: React.FC<CustomCardProps> = ({ card_Name, title }) => {
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

  const renderTableHead = () => {
    switch (title) {
      case "items":
        return (
          <tr>
            {card_Name === "name" ? (
              <>
                <th>
                  <input
                    value={name}
                    type="text"
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </th>
                <th>name</th>
                <th>unitPrice</th>
              </>
            ) : (
              <>
                <th>name</th>
                <th>quantity</th>
                <th>
                  <input
                    value={name}
                    type="text"
                    placeholder="unitPrice"
                    onChange={(e) => setName(e.target.value)}
                  />
                </th>
              </>
            )}
          </tr>
        );
      case "pastOrders":
        return (
          <tr>
            <th>
              <input
                value={name}
                type="text"
                placeholder="Type"
                onChange={(e) => setName(e.target.value)}
              />
            </th>
            <th>Price</th>
            
          </tr>
        );
      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="input-group">
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="option1">String</option>
            <option value="option2">Number</option>
          </select>
        </div>
        {title === "items" || title === "pastOrders" ? (
          <table className="custom-table-pastOrder">
            <thead>{renderTableHead()}</thead>
            <tbody>
              <tr>
                <td>cat food</td>
                {title === "items" ? <><td>cat food</td><td>100</td></> : <td>100</td>}
              </tr>
            </tbody>
          </table>
        ) : null}

        {title === "pastOrders" && (
          <div className="input-group">
            <label>Example:</label>
            <div className="table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>cat food</td>
                    <td>100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <button className="custom-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default PastOrders;
