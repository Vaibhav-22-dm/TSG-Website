import * as React from "react";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classes from "../css/Accordion.module.css";
export default function ControlledAccordions(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let blogs = JSON.parse(props.blog);
  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        style={{ boxShadow: "none" }}
      >
        <AccordionSummary
          className={classes.content}
          expandIcon={
            <ExpandMoreIcon style={{ color: "rgba(118, 148, 255, 1)" }} />
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <span className={classes.circle}></span>
          <Typography>Blogs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className={classes.items}>
              {blogs.map((e) => (
                <div className={classes.linkcontainer}>
                  <span className={classes.symbol}></span>
                  <a href={e.link} className={classes.links}>
                    {e.name}
                  </a>
                </div>
              ))}
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <a href={props.notes} className={classes.link} target="_blank">
        {" "}
        <div className={classes.content1}>
          {" "}
          <span className={classes.circle1}></span>
          <span>Study Material</span>
        </div>
      </a>
      <a href={props.question} className={classes.link} target="_blank">
        {" "}
        <div className={classes.content1}>
          {" "}
          <span className={classes.circle1}></span>
          <span>Interview Questions</span>
        </div>
      </a>

      <Accordion
        className={classes.bcontent}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        style={{ boxShadow: "none" }}
      >
        <AccordionSummary
          className={classes.content}
          expandIcon={
            <ExpandMoreIcon style={{ color: "rgba(118, 148, 255, 1)" }} />
          }
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <span className={classes.circle}></span>
          <Typography>Others</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
