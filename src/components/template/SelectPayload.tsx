import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import CustomizedSteppers from "../linearSteps/CustomizedSteppers";
import "./Template.css";
import PayloadList from "./PayloadList";
import { useCardContext } from "../context/CardContext";
import Category2 from "../category/UserRegCategory";
import { useState } from "react";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];



const Item = styled(Paper)(({ theme }) => ({

  
  
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SelectPayload = () => {
  const [activeStep, setActiveStep] = useState(0);
  const {
    payLoadData
  } = useCardContext();

  console.log(activeStep,'tttttttttttt');



  return (
    <div className="template_card">
      <div className="fixed-header">
        <CustomizedSteppers
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>
      <div className="template_content">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Item>
              {payLoadData === "EVENT" &&  <Category2 payload={"EVENT"} />}
              {payLoadData === "ORDER" && <Category2 payload={"ORDER"} />}
              {payLoadData === "USER" && <Category2 payload={"USER"} />}
              {payLoadData === "DATA" && <Category2 payload={"DATA"} />}

                {payLoadData === "FIRST" && <PayloadList />}
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default SelectPayload;
