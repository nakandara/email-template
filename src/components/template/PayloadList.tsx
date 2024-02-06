import { useState } from "react";
import "./Template.css";
import Button from "@mui/material/Button";
import { useCardContext } from "../context/CardContext";
import { Box, Modal, Typography } from "@mui/material";

const sampleItems = ["EVENT", "USER", "ORDER", "DATA"];

const EventModalContent = () => {
  
  return (
    <>
      <Typography variant="body1">ID: #223033</Typography>
      <Typography variant="body1">Total Price: 4000</Typography>
      <Typography variant="body1">Payment Method: BANK_TRANSFER</Typography>
      <Typography variant="body1">Items:</Typography>
      <ul>
        <li>HB Pencil - Quantity: 20, Unit Price: 100</li>
        <li>Blue Pencil - Quantity: 10, Unit Price: 50</li>
        <li>Red Pencil - Quantity: 20, Unit Price: 70</li>
      </ul>
    </>
  );
};

const UserModalContent = () => {
  return (
    <>
      <Typography variant="body1">Name: Ruwan</Typography>
      <Typography variant="body1">Email: ruwan@gmail.com</Typography>
      <Typography variant="body1">Date OF Birthday: 2024-01091</Typography>
      <Typography variant="body1">Address:</Typography>
      <ul>
        <li>Line 1 - Samagi Mawatha</li>
        <li>Line 2 - Kaduwela</li>
        <li>City - Panadura</li>
        <li>Zip Code - 11234</li>
      </ul>
    </>
  );
};

const OrderModalContent = () => {
  return (
    <>
      <Typography variant="body1">ID: #223033</Typography>
      <Typography variant="body1">Total Price: 4000</Typography>
      <Typography variant="body1">Payment Method: BANK_TRANSFER</Typography>
      <Typography variant="body1">Items:</Typography>
      <ul>
        <li>HB Pencil - Quantity: 20, Unit Price: 100</li>
        <li>Blue Pencil - Quantity: 10, Unit Price: 50</li>
        <li>Red Pencil - Quantity: 20, Unit Price: 70</li>
      </ul>
    </>
  );
};

const DataModalContent = () => {
  return (
    <>
      <Typography variant="body1">ID: #223033</Typography>
      <Typography variant="body1">Total Price: 4000</Typography>
      <Typography variant="body1">Payment Method: BANK_TRANSFER</Typography>
      <Typography variant="body1">Items:</Typography>
      <ul>
        <li>HB Pencil - Quantity: 20, Unit Price: 100</li>
        <li>Blue Pencil - Quantity: 10, Unit Price: 50</li>
        <li>Red Pencil - Quantity: 20, Unit Price: 70</li>
      </ul>
    </>
  );
};

const PayloadList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const {
    setPayLoadData
  } = useCardContext();

  const handleModalOpen = (event: React.MouseEvent<HTMLButtonElement>, item: any) => {
    // Prevent the event from propagating to the parent element
    event.stopPropagation();
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const renderModalContent = () => {
    console.log(selectedItem);

    switch (selectedItem) {
      case "EVENT":
        return <EventModalContent />;
      case "USER":
        return <UserModalContent />;
      case "ORDER":
        return <OrderModalContent />;
        case "DATA":
          return <DataModalContent />;
      // Add more cases for other items if needed
      default:
        return null;
    }
  };

  const NextStep = (item: any) => {
    console.log(item);
    setPayLoadData(item)
  };

  return (
    <div className="card-container">
      <div className="card">
        <ul className="ul-class">
          {sampleItems.map((item, index) => (
            <li className="cardItem" onClick={() => NextStep(item)} key={index}>
              <div className="item-heading"> {item}</div>
              <div className="horizontal-line"></div>
              <div>This way, the card will adapt its size based on the screen width,</div>
              <div className="button-container">
               
                <Button
                 onClick={(event) => handleModalOpen(event, item)}
                  sx={{ backgroundColor: "blue", borderRadius: "100px" }}
                  variant="contained"
                  color="success"
                >
                  View
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedItem} Data
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, maxHeight: "400px", overflowY: "auto" }}
          >
            {renderModalContent()}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default PayloadList;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
