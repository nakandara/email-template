import React, { useState } from "react";
import { useCardContext } from "../context/CardContext";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { transformPayloadToData } from "../data/transformPayloadToData";

import { events } from "../data/PayloadData";

// import {
//   payloadData,
//   payloadEvent,
//   payloadOrder,
//   payloadUser,
// } from "../data/PayloadData";
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
  example: string;
  type: string;
}

const transformDataToCategory = (data: DataItem): Category => {
  return {
    title: data.variable,
    subcategories: data.itemKeys?.map(transformDataToCategory),
    example: data.example,
    type: data.type,
  };
};

const Category2: React.FC<{ payload?: string }> = ({ payload }) => {
  console.log(events);
  const jsonData = JSON.stringify(events, null, 2);

  const payloadMap: { [key: string]: any[] } = {};

  events.forEach(event => {
    payloadMap[event.name] = event.payload;
  });

  const getPayloadByEventName = (eventName: string) => {
    return payloadMap[eventName] || [];
  };

  // Usage



  const payloadVariables: { [key: string]: any } = {};

  const testOne = events.forEach(event => {
    const eventName = event.name;
    payloadVariables[`${eventName.toLowerCase()}CreatedPayload`] = getPayloadByEventName(eventName);
  });




  const { outPayLoad, setSelectPayLoad } = useCardContext();
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

  let payloadDataT;

  if (payload && payloadVariables[payload.toLowerCase() + "CreatedPayload"]) {
    payloadDataT = payloadVariables[payload.toLowerCase() + "CreatedPayload"][0];
    setSelectPayLoad(payloadVariables[payload.toLowerCase() + "CreatedPayload"][0]);
  }
  const newData: DataItem[] = transformPayloadToData(payloadDataT);

  const transformedData: Category[] = newData.map(transformDataToCategory);

  const CardContainer: React.FC<{
    selectedCategory: any;
    type: string;
    name: string;
  }> = ({ selectedCategory, type, name }) => (
    <div className="card-container">
      <div className="card">
        {transformedData.map((dataItem, index) => {
          return (
            <div key={index}>
              {selectedCategory === dataItem.title && (
                <>
                  {dataItem.subcategories &&
                    dataItem.subcategories.length > 0 ? (
                    "Select Sub Category"
                  ) : (
                    <NameCard
                      key={index}
                      type={dataItem.title}
                      name={name}
                      title={dataItem.example}
                      card_Name={dataItem.title}
                    />
                  )}
                </>
              )}

              {dataItem.subcategories?.map((subCategory, subIndex) => (
                <div key={`sub-${subIndex}`}>
                  {selectedCategory === subCategory.title &&
                    (dataItem.type === "object" ? (
                      <NameCard
                        type={dataItem.title}
                        name={name}
                        card_Name={dataItem.title + "." + subCategory.title}
                        title={subCategory.example}
                      />
                    ) : (
                      <PastOrders
                        title={dataItem.title}
                        children={undefined}
                        subCategory={dataItem.subcategories}
                        tableColumn={dataItem.subcategories?.length ?? 0}
                        card_Name={dataItem.title + "." + subCategory.title}
                        typeItem={dataItem.type}
                        name={""}
                      />
                    ))}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );

  const NameCard: React.FC<{
    type: string;
    name: string;
    title: string;
    card_Name: string;
  }> = ({ type, name, title, card_Name }) => (
    <CustomCard
      title={title}
      cardName={card_Name}
      type={type}
      name={name}
      children={undefined}
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
            <div>
              <h2> Information:</h2>
              {Array.isArray(outPayLoad) &&
                outPayLoad.map((item: any, index: any) => (
                  <div key={index}>
                    <p>{item.name}</p>
                  </div>
                ))}
            </div>
          </div>
          <button
            className="custom-button"
            onClick={handleModalOpen}
            style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
          >
            Generate Json Data
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
        <div></div>
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
