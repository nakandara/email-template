import { useState } from "react";
import "./Template.css";
import Button from "@mui/material/Button";
import { useCardContext } from "../context/CardContext";
import { Box, Modal, Typography } from "@mui/material";
import { events } from "../data/PayloadData";

type Payload = {
  [key: string]: string | Payload;
};

type PayloadRendererProps = {
  payload: Payload;
};

const generateJSXFromPayload = (payload: Payload): JSX.Element[] => {
  const elements: JSX.Element[] = [];

  for (let key in payload) {
    if (typeof payload[key] === "string") {
      elements.push(<p key={key}>{`${key}: ${payload[key]}`}</p>);
    } else if (typeof payload[key] === "object") {
      elements.push(
        <div key={key}>{generateJSXFromPayload(payload[key] as Payload)}</div>
      );
    }
  }

  return elements;
};

const PayloadList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [newPayload, setNewPayload] = useState<Payload | null>(null);
  const { setPayLoadData } = useCardContext();

  const handleModalOpen = (event: any, item: any) => {
    event.stopPropagation();
    setSelectedItem(item);
    setIsModalOpen(true);
    for (let i = 0; i < events.length; i++) {
      if (events[i].name === item) {
        
        setNewPayload(events[i].payload[0] as Payload);
        break;
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const NextStep = (item: any) => {
    setPayLoadData(item);
  };

  const PayloadRenderer: React.FC<PayloadRendererProps> = ({ payload }) => {
    return <div>{generateJSXFromPayload(payload)}</div>;
  };

  return (
    <div className="card-container">
     <div className="">
        <ul className="">
          <li className="cardItem">
            <div className="item-heading"> </div> {/* Display event name */}
            <div className="horizontal-line"></div>
            <div>
              This way, the card will adapt its size based on the screen width,
            </div>
            <div className="button-container">
              <Button
                sx={{ backgroundColor: "blue", borderRadius: "100px" }}
                variant="contained"
                color="success"
              >
                ADD +
              </Button>
            </div>
          </li>
        </ul>
      </div>

      <div className="card">
        <ul className="ul-class">
          {events.map((event, index) => (
            <li
              className="cardItem"
              onClick={() => NextStep(event.name)}
              key={index}
            >
              <div className="item-heading"> {event.name}</div>{" "}
              {/* Display event name */}
              <div className="horizontal-line"></div>
              <div>
                This way, the card will adapt its size based on the screen
                width,
              </div>
              <div className="button-container">
                <Button
                  onClick={(e) => handleModalOpen(e, event.name)} // Pass event name
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
            {newPayload && (
              <PayloadRenderer payload={newPayload} />
            )}
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
