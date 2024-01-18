import React, { ReactNode } from "react";

interface CustomCardProps {
  title: string;
  children: ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, children }) => (


    
  <div className="">
    <div className="input-group">
      <label>Type:</label>
      <select>
        <option value="option1">Text</option>
        <option value="option2">Number</option>
        <option value="option2">Date</option>
      </select>
    </div>
    <div className="input-group">
      <label>Name:</label>
      <input type="text" />
    </div>
    <div className="input-group">
      <label>Example:</label>
      <input type="text" placeholder={title} />
    </div>
    {children}
    <button className="custom-button">Save</button>
  </div>
);

export default CustomCard;
