import React from "react";
import classes from "./CardsContainer.module.css";

const CardsContainer = (props) => {
  // expects width value in percentage (only value without adding %) as a prop
  // adjust width and margin of child cards as per requirement

  return (
    <div
      style={{ width: `${props.width}%` }}
      className={classes.cards_container}
    >
      {props.children}
    </div>
  );
};

export default CardsContainer;
