import React, { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import classes from "../css/Accordion.module.css";
import { fontSize, textAlign } from "@mui/system";
import icon from "../icon.svg";
import useMediaQuery from '@mui/material/useMediaQuery';
export default function Accor(props) {
  const [toggle, settoggle] = useState(false);
  let style1 = {
    backgroundColor: "rgba(118, 148, 255, 1)",
  };
  let style2 = {
    backgroundColor: "white",
  };
  let style3 = {
    backgroundColor: "rgba(118, 148, 255, 1)",
    borderRadius: 50,
    color: "white",
    padding: 4,
    
    
  };
  let style4 = {
    backgroundColor: "white",
    borderRadius: 50,
    color: "rgba(118, 148, 255, 1)",
    padding: 4
   
  };
 let style5;
  let style6;
  const matches = useMediaQuery('(min-width:400px)');
  if(matches==false)
  {
    style5={
      fontWeight: 10,
  fontFamily: "Poppins",
  color:"white",
  fontSize:"14px"
    }
    style6={
      fontWeight: 10,
      fontFamily: "Poppins",
      color:"black",
      fontSize:"14px"

    }

  }
 else{

  style5={
    fontWeight: 10,
fontFamily: "Poppins",
color:"white",

  }
  style6={
    fontWeight: 10,
    fontFamily: "Poppins",
    color:"black",
    

  }
}
  return (
    <div className={classes.container} style={{width:props.width}}>
      <Accordion>
        <AccordionSummary
          style={toggle ? style1 : style2}
          onClick={() => {
            if (toggle == false) {
              settoggle(true);
            } else {
              settoggle(false);
            }
          }}
          expandIcon={<ExpandMoreIcon className={classes.color} style={toggle ? style4 : style3} />}
          aria-controls="panel1a-content"
        >
          <Typography 
            
            style={toggle ? style5 : style6}
          >
            {props.course}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            style={{
              fontWeight: 10,
              fontFamily: "Poppins",
            }}
          >
            <div className={classes.items}>
              <div className={classes.linkcontainer}>
                <span className={classes.symbol}></span>
                <a className={classes.link}>Notes</a>
              </div>
              <div className={classes.linkcontainer}>
                <span className={classes.symbol}></span>
                <a className={classes.link}>Books</a>
              </div>
              <div className={classes.linkcontainer}>
                <span className={classes.symbol}></span>
                <a className={classes.link}>PYQs</a>
              </div>
              <div className={classes.linkcontainer}>
               
                <span className={classes.symbol}></span>
                <a className={classes.link}>Others</a>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
