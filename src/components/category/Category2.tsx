import React, { useState } from "react";
import { useCardContext } from "../context/CardContext";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EastIcon from "@mui/icons-material/East";

import "./CardBoxes.css";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import CustomCard from "./CustomCardProps";
import PastOrders from "./PastOrders";

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
  const {
    nameCardType,
    nameNameCard,
    addressLine1CardName,
    addressLine2CardName,
    cityCardName,
    zipCodeCardName,
    birthdayCardName,
    pastOrderTypeCardName,
    pastOrderPriceCardName,
  } = useCardContext();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleCategory = (title: string) => {
    if (expandedCategories.includes(title)) {
      setExpandedCategories(
        expandedCategories.filter((category) => category !== title)
      );
      setSelectedCategory(title);
    } else {
      setExpandedCategories([...expandedCategories, title]);
      setSelectedCategory(title);
    }
  };

  const renderCategory = (category: Category) => (
    <div key={category.title}>
      <ListItem
        button
        onClick={() => toggleCategory(category.title)}
        sx={{
          backgroundColor:
            selectedCategory === category.title ? "lightblue" : "inherit",
        }}
      >
        <ListItemText primary={category.title} />
        {category.subcategories && category.subcategories.length > 0 && (
          <Typography variant="body2">
            {expandedCategories.includes(category.title) ? (
              <ExpandLessIcon />
            ) : (
              <ExpandMoreIcon />
            )}
          </Typography>
        )}
      </ListItem>
      {category.subcategories && category.subcategories.length > 0 && (
        <Collapse
          sx={{ marginLeft: "50px" }}
          in={expandedCategories.includes(category.title)}
        >
          <List component="div" disablePadding>
            {category.subcategories.map(renderCategory)}
          </List>
        </Collapse>
      )}
    </div>
  );

  const newData: DataItem[] = [
    {
      variable: "Name",
      example: "Ruwan",
      type: "string",
    },
    {
      variable: "Address",
      example: null,
      type: "object",
      itemKeys: [
        {
          variable: "Address Line 1",
          example: "Madurupitiya",
          type: "string",
        },
        {
          variable: "Address Line 2",
          example: "Loluwagoda",
          type: "string",
        },
        {
          variable: "City",
          example: "Mirigama",
          type: "string",
        },
        {
          variable: "Zip Code",
          example: "11204",
          type: "string",
        },
      ],
    },
    {
      variable: "Birthday",
      example: "1888-07-17T00:00:00.000Z",
      type: "date",
    },
    {
      variable: "Past Orders",
      example: null,
      type: "array",
      itemType: "object",
      itemKeys: [
        {
          variable: "Type",
          example: "cat food",
          type: "string",
        },
        {
          variable: "Price",
          example: 100,
          type: "number",
        },
      ],
    },
  ];

  const transformedData: Category[] = newData.map(transformDataToCategory);

  const CardContainer: React.FC<{
    selectedCategory: any;
    type: string;
    name: string;
  }> = ({ selectedCategory, type, name }) => (
    <div className="card-container">
      <div className="card">
        {(() => {
          switch (selectedCategory) {
            case "Name":
              return <NameCard type={type} name={name} />;
            case "Address Line 1":
              return <AddressCardOne type={type} name={name} />;
            case "Address Line 2":
              return <AddressCardTwo type={type} name={name} />;
            case "City":
              return <CityCard type={type} name={name} />;
            case "Zip Code":
              return <ZipCodeCard type={type} name={name} />;
            case "Birthday":
              return <BirthDayCard type={type} name={name} />;
            case "Type":
              return <PastOrdersTypeCard />;
            case "Price":
              return <PastOrdersPriceCard />;
            default:
              return "Select Options";
          }
        })()}
      </div>
    </div>
  );

  const NameCard: React.FC<{ type: string; name: string }> = ({
    type,
    name,
  }) => (
    <CustomCard
      title="Sadun Perera"
      cardName="NameCard"
      type={type}
      name={name}
    >
      {/* Additional content for the NameCard component */}
    </CustomCard>
  );

  const AddressCardOne: React.FC<{ type: string; name: string }> = ({
    type,
    name,
  }) => (
    <CustomCard
      title="Madurupitiya"
      cardName="AddressCardOne"
      type={type}
      name={name}
    >
      {/* Additional content for the NameCard component */}
    </CustomCard>
  );

  const AddressCardTwo: React.FC<{ type: string; name: string }> = ({
    type,
    name,
  }) => (
    <CustomCard
      title="Loluwagoda"
      cardName="AddressCardTwo"
      type={type}
      name={name}
    >
      {/* Additional content for the NameCard component */}
    </CustomCard>
  );

  const CityCard: React.FC<{ type: string; name: string }> = ({
    type,
    name,
  }) => (
    <CustomCard title="Mirigama" cardName="CityCard" type={type} name={name}>
      {/* Additional content for the NameCard component */}
    </CustomCard>
  );

  const ZipCodeCard: React.FC<{ type: string; name: string }> = ({
    type,
    name,
  }) => (
    <CustomCard title="11204" cardName="ZipCodeCard" type={type} name={name}>
      {/* Additional content for the NameCard component */}
    </CustomCard>
  );

  const BirthDayCard: React.FC<{ type: string; name: string }> = ({
    type,
    name,
  }) => (
    <CustomCard
      title="1888-07-17"
      cardName="BirthDayCard"
      type={type}
      name={name} children={undefined}    ></CustomCard>
  );

  const PastOrdersTypeCard: React.FC = () => (
    <PastOrders
      title={""}
      children={undefined}
      cardName={"PastOrdersTypeCard"}
      type={""}
      name={""}
    />
  );

  const PastOrdersPriceCard: React.FC = () => (
    <PastOrders
      title={""}
      children={undefined}
      cardName={"PastOrdersPriceCard"}
      type={""}
      name={""}
    />
  );

  return (
    <List>
      <div className="card-container">
        <div className="card">{transformedData.map(renderCategory)}</div>
        <div className="card" style={{ background: "lightgray" }}>
          <h2>{selectedCategory}</h2>
          <CardContainer
            selectedCategory={selectedCategory}
            type={""}
            name={""}
          />
        </div>
      </div>
      <div className="card-variable" style={{ background: "lightgray" }}>
        <h2>Created Variables</h2>
        <div className="create_list">
          {nameNameCard}
          <br />
          {addressLine1CardName}
          <br />
          {addressLine2CardName}
          <br />
          {cityCardName}
          <br />
          {zipCodeCardName}
          <br />
          {birthdayCardName}
          <br />
          {pastOrderTypeCardName}
          <br />
          {pastOrderPriceCardName}
        </div>
      </div>
    </List>
  );
};

export default Category2;
