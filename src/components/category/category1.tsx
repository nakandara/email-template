import React, { useState } from "react";
import "./CardBoxes.css"; // Import the CSS file
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SubCategory from '../SubCategory'; 



interface CategoryProps {
  title: string;
  subcategories?: string[];
  onCategoryClick: (categoryType: string, categoryName: string) => void;
}

const Category: React.FC<CategoryProps> = ({ title, subcategories, onCategoryClick }) => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    subcategories && subcategories.length > 0 ? setExpanded(!isExpanded) : onCategoryClick("main", title);
  };

  const handleSubCategoryClick = (subcategory: string) => onCategoryClick("sub", subcategory);

  return (
    <div className="category-container">
      <div className="category-header" onClick={toggleExpansion}>
        <h2>
          {title}{" "}
          {subcategories && subcategories.length > 0 && (isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </h2>
      </div>
      {isExpanded && subcategories && (
        <div className="subcategory-container">
          {subcategories.map((subcategory, index) => (
            <SubCategory key={index} title={subcategory} onSelect={() => handleSubCategoryClick(subcategory)} />
          ))}
        </div>
      )}
    </div>
  );
};


const CardContainer: React.FC<{ categories: CategoryProps[]; categoryName: string }> = ({ categories, categoryName }) => (
  <div className="card-container">
    <div className="card">
      <div className="category-list-container">
        {categories.map((category, index) => (
          <Category key={index} title={category.title} subcategories={category.subcategories} onCategoryClick={category.onCategoryClick} />
        ))}
      </div>
    </div>

    <div className="card">
      {(() => {
        switch (categoryName) {
          case "Name":
            return <NameCard />;
            case "Email":
              return <EmailCard />;
          case "Date Of Birth":
            return <DateOfBirthCard />;
          case "Address Line 01":
            return <AddressLine01Card />;
          default:
            return "Select Options";
        }
      })()}
    </div>
  </div>
);


const NameCard: React.FC = () => (
  <div>
    <h2>Name</h2>
    <div className="margin-t">
      <label>Type : </label>
      <select>
        <option value="option1">Text</option>
        <option value="option2">Number</option>
      </select>
    </div>{" "}
    Example: <input placeholder="ruwan800@gmail.com" />
  </div>
);

const DateOfBirthCard: React.FC = () => (
  <div>
    <h2>Date Of Birth</h2>
    <div></div>
  </div>
);

const AddressLine01Card: React.FC = () => (
  <div>
    <h2>Address Line 01</h2>
    <div>
      <label>Type : </label>
      <select className="margin-t">
        <option value="option1">Text</option>
        <option value="option2">Number</option>
      </select>
    </div>
    Address Line 01:{" "}
    <input className="margin-t"placeholder="*7 44 A, Isuru Uyana, Kurunegala" />
    <br />
    Example: <input placeholder="ruwan800@gmail.com" />
  </div>
);

const EmailCard: React.FC = () => (
  <div>
    <h2>Email</h2>
    <div>
      <label>Type : </label>
      <select className="margin-t">
        <option value="option1">Text</option>
        <option value="option2">Number</option>
      </select>
    </div>
    Email:{" "}
    <input className="margin-t"placeholder="PramodNakandara@gmail.com" />
    <br />
    Example: <input placeholder="ruwan800@gmail.com" />
  </div>
);

const CategoryList: React.FC = () => {
  const [categoryType, setCategoryType] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const handleCategoryClick = (categoryType: string, categoryName: string) => {
    console.log(`Clicked ${categoryType} category: ${categoryName}`);
    setCategoryType(categoryType);
    setCategoryName(categoryName);
  };

  const categories: CategoryProps[] = [
    { title: "Name" },
    { title: "Email" },
    { title: "Date Of Birth" },
    {
      title: "Address",
      subcategories: ["Address Line 01", "Address Line 02"],
    },
    {
      title: "Category 2",
      subcategories: ["Subcategory 2.1", "Subcategory 2.2"],
    },
  ].map(category => ({ ...category, onCategoryClick: handleCategoryClick }));

  return <CardContainer categories={categories} categoryName={categoryName} />;
};

export default CategoryList;
