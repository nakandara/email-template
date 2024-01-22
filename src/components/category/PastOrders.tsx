import React, { ReactNode, useState } from "react";
import { useCardContext } from "../context/CardContext";

interface CustomCardProps {
  title: string;
  children: ReactNode;
  cardName: any;
  type: string;
  name: string;
}

const PastOrders: React.FC<CustomCardProps> = ({ cardName }) => {
  const {
    setPastOrderTypeCardName,
    setPastOrderTypeCardType,
    setPastOrderPriceCardName,
    setPastOrderPriceCardType,
  } = useCardContext();
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  const handleSave = () => {
    const setTypeAndName = (setTypeFn: Function, setNameFn: Function) => {
      setTypeFn(type);
      setNameFn(name);
    };

    switch (cardName) {
      case "PastOrdersTypeCard":
        setTypeAndName(setPastOrderTypeCardType, setPastOrderTypeCardName);
        break;
     case "PastOrdersPriceCard":
        setTypeAndName(setPastOrderPriceCardType, setPastOrderPriceCardName);
        break;  
      default:
        console.log("Select Options");
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

        <table className="custom-table-pastOrder">
          <thead>
            {cardName === "PastOrdersTypeCard" ? (
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
            ) : (
              <tr>
                <th>Type</th>
                <th>
                  <input
                    value={name}
                    type="text"
                    placeholder="Price"
                    onChange={(e) => setName(e.target.value)}
                  />
                </th>
              </tr>
            )}
          </thead>
          <tbody>
            <tr>
              <td>cat food</td>
              <td>100</td>
            </tr>
          </tbody>
        </table>
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
        <button className="custom-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default PastOrders;
