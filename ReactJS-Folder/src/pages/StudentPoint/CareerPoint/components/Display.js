import React from "react";
import classes from "../css/Display.module.css";
import ControlledAccordions from "./Accordion";
function Display(props) {
  return (
    <div id="content" className={classes.container}>
      <div className={classes.heading}>{props.header}</div>
      <div className={classes.contone}>
        <div className={classes.about}>{props.about}</div>
        <img className={classes.image} src={props.image}></img>
      </div>
      <div className={classes.contwo}>
        <div className={classes.content1}>
          
          <ControlledAccordions
            notes={props.notes}
            question={props.question}
            blog={props.blog}
          />
        </div>
      </div>
    </div>
  );
}
export default Display;
