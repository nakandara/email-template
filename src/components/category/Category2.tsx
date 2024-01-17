import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";

interface DataItem {
  variable: string;
  example?: any;
  type: string;
  itemType?: string;
  itemKeys?: DataItem[];
}

interface Category {
  title: string;
  subcategories?: Category[];
}

const transformDataToCategory = (data: DataItem): Category => {
  return {
    title: data.variable,
    subcategories: data.itemKeys?.map(transformDataToCategory),
  };
};

const Category2: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleCategory = (title: string) => {
    if (expandedCategories.includes(title)) {
      setExpandedCategories(
        expandedCategories.filter((category) => category !== title)
      );
      setSelectedCategory(null);
    } else {
      setExpandedCategories([...expandedCategories, title]);
      setSelectedCategory(title);
    }
  };
  const renderCategory = (category: Category) => (
    <div key={category.title}>
      <ListItem button onClick={() => toggleCategory(category.title)}>
        <ListItemText primary={category.title} />
        {category.subcategories && category.subcategories.length > 0 && (
          <Typography variant="body2">
            {expandedCategories.includes(category.title) ? "[-]" : "[+]"}
          </Typography>
        )}
      </ListItem>
      {category.subcategories && category.subcategories.length > 0 && (
        <Collapse sx={{ marginLeft: "50px" }} in={expandedCategories.includes(category.title)}>
          <List component="div" disablePadding>
            {category.subcategories.map(renderCategory)}
          </List>
        </Collapse>
      )}
    </div>
  );

  const newData: DataItem[] = [
    {
      variable: "name",
      example: "Ruwan",
      type: "string",
    },
    {
      variable: "address",
      example: null,
      type: "object",
      itemKeys: [
        {
          variable: "addressLine1",
          example: "Madurupitiya",
          type: "string",
        },
        {
          variable: "addressLine2",
          example: "Loluwagoda",
          type: "string",
        },
        {
          variable: "city",
          example: "Mirigama",
          type: "string",
        },
        {
          variable: "zipCode",
          example: "11204",
          type: "string",
        },
      ],
    },
    {
      variable: "birthday",
      example: "1888-07-17T00:00:00.000Z",
      type: "date",
    },
    {
      variable: "pastOrders",
      example: null,
      type: "array",
      itemType: "object",
      itemKeys: [
        {
          variable: "type",
          example: "cat food",
          type: "string",
        },
        {
          variable: "price",
          example: 100,
          type: "number",
        },
      ],
    },
  ];

  const transformedData: Category[] = newData.map(transformDataToCategory);

  return (
    <List>
      <div className="card-container">
        <div className="card">{transformedData.map(renderCategory)}</div>
        <div className="card" style={{ background: "lightgray" }}>
          <h2>{selectedCategory || "Content"}</h2>
          {/* Add additional content based on the selected category */}
        </div>
      </div>
    </List>
  );
};

export default Category2;
