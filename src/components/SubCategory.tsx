import React from 'react';

interface SubCategoryProps {
  title: string;
  onSelect: () => void;
}

const SubCategory: React.FC<SubCategoryProps> = ({ title, onSelect }) => (
  <div className="subcategory" onClick={onSelect}>
    <p>{title.toLowerCase()}.</p>
  </div>
);

export default SubCategory;
