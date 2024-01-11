
import React, { useState } from "react";
import "./CardBoxes.css"; // Import the CSS file
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface SubCategoryProps {
  title: string;
  onSelect: () => void;
}

const SubCategory: React.FC<SubCategoryProps> = ({ title, onSelect }) => (
  <div className="subcategory" onClick={onSelect}>
    <p>{title.toLowerCase()}.</p>
  </div>
);

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

  return (
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
              return (
                <div>
                  <h2>{categoryName}</h2>
                  <div className="margin-t">
                    <label> Type : </label>
                    <select>
                      <option value="option1">Text</option>
                      <option value="option2">Number</option>
                    </select>
                  </div>{" "}
                  Example: <input placeholder="ruwan800@gmail.com" />
                </div>
              );
            case "Date Of Birth":
              return (
                <div>
                  <h2>{categoryName}</h2>
                  <div></div>
                </div>
              );
            case "Address Line 01":
              return (
                <div>
                  <h2>{categoryName}</h2>
                  <div>
                    <label> Type : </label>
                    <select>
                      <option value="option1">Text</option>
                      <option value="option2">Number</option>
                    </select>
                  </div>
                  Address Line 01:{" "}
                  <input
                    className=""
                    placeholder="*7 44 A, Isuru Uyana, Kurunegala"
                  />
                  <br />
                  Example: <input placeholder="ruwan800@gmail.com" />
                </div>
              );
            default:
              return "Select Options";
          }
        })()}
      </div>
    </div>
  );
};

export default CategoryList;
