import React, { useState } from "react";
import { useCardContext } from "../context/CardContext";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { transformPayloadToData } from "../data/transformPayloadToData";
import {
  payloadData,
  payloadEvent,
  payloadOrder,
  payloadUser,
} from "../data/PayloadData";
import "./CardBoxes.css";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import CustomCard from "./CustomCardProps";
import PastOrders from "./PastOrders";
import UserRegData from "../data/UserRegData";

interface DataItem {
  variable: string;
  example?: any;
  type: string;
  itemType?: string;
  itemKeys?: DataItem[];
}

interface Order {
  type: string;
  price: number;
}

interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  zipCode: string;
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const newData: DataItem[] = transformPayloadToData(payloadData[0]);
  console.log(newData);

  const jsonData = JSON.stringify(newData, null, 2);

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
            case "name":
              return <NameCard type={type} name={name} />;
            case "addressLine1":
              return <AddressCardOne type={type} name={name} />;
            case "addressLine2":
              return <AddressCardTwo type={type} name={name} />;
            case "city":
              return <CityCard type={type} name={name} />;
            case "zipCode":
              return <ZipCodeCard type={type} name={name} />;
            case "birthday":
              return <BirthDayCard type={type} name={name} />;
            case "type":
              return <PastOrdersTypeCard />;
            case "price":
              return <PastOrdersPriceCard />;
            case "totalGuests":
              return <TotalGuestsCard type={""} name={""} />;
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
      children={undefined}
    />
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
      children={undefined}
    />
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
      children={undefined}
    />
  );

  const CityCard: React.FC<{ type: string; name: string }> = ({
    type,
    name,
  }) => (
    <CustomCard
      title="Mirigama"
      cardName="CityCard"
      type={type}
      name={name}
      children={undefined}
    />
  );

  const ZipCodeCard: React.FC<{ type: string; name: string }> = ({
    type,
    name,
  }) => (
    <CustomCard
      title="11204"
      cardName="ZipCodeCard"
      type={type}
      name={name}
      children={undefined}
    />
  );

  const BirthDayCard: React.FC<{ type: string; name: string }> = ({
    type,
    name,
  }) => (
    <CustomCard
      title="1888-07-17"
      cardName="BirthDayCard"
      type={type}
      name={name}
      children={undefined}
    />
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

  const TotalGuestsCard: React.FC<{ type: string; name: string }> = ({
    type,
    name,
  }) => (
    <CustomCard
      title="1888-07-17"
      cardName="TotalGuestsCard"
      type={type}
      name={name}
      children={undefined}
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
      <div>
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
          <button
            className="custom-button"
            onClick={handleModalOpen}
            style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
          >
            Out json data
          </button>

          <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                JSON Data
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, maxHeight: "400px", overflowY: "auto" }}
              >
                <UserRegData />
              </Typography>
            </Box>
          </Modal>
        </div>
        {/* <div>
          <pre>
            <code>{jsonData}</code>
          </pre>
        </div> */}
      </div>
      
    </List>
  );
};

export default Category2;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
