import * as React from 'react';
import {useState} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import result from "../image/result.svg"
import classes from "../css/Accordion.module.css"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export default function ControlledAccordions(props) {
  const [expanded, setExpanded] = React.useState(false);
  const[border,setborder]=useState(true);
  let style1={boxShadow:"none"};
  let style2={boxShadow:" 3px 3px 18px rgba(118, 148, 255, 0.25)"};

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion className={classes.container} expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={border?style1:style2} onClick={()=>{
         if(border==true)
         {
            setborder(false);
         }
         else{
            setborder(true);
         }
      }}>
        <AccordionSummary className={ border ? classes.summary:null}
          expandIcon={<VisibilityOutlinedIcon  style={{color:"rgba(118, 148, 255, 1)"}} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          
        >
          <Typography sx={{ width: '95%', flexShrink: 0 }}>
           <div className={classes.wrap}> 
           <img className={classes.image} src={props.logo?props.logo:result}></img>
           <div className={classes.event}> 
           <div className={classes.eventname}>{props.name}</div>
           <div className={classes.organiser}>{props.organiser}</div>
           </div>
           </div>
          </Typography>
         
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Typography>
          <div > <img  src={props.image} className={classes.themeimage} /></div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}
 