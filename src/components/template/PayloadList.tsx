import "./Template.css";
import Button from "@mui/material/Button";

const sampleItems = ["EVENT", "USER", "ORDER", "Item 4"];

const PayloadList = () => {
  return (
    <div className="card-container">
      <div className="card">
        <ul className="ul-class">
          {sampleItems.map((item, index) => (
            <li className="cardItem" key={index}>
              <div className="item-heading"> {item}</div>
             
              <div className="button-container">
                <Button sx={{ backgroundColor: 'blue',borderRadius:"100px" }} variant="contained" color="success">
                  View
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PayloadList;
