import React from "react";
import Backdrop from "./Backdrop";
import classes from "./Modal.module.css"

const Modal = props => {
    // expects a function onClose as prop which changes the state in parent component to close the modal
  return (
    <>
      <Backdrop onClick={props.onClose} />
      <div className={classes.modal_overlay}>{props.children}</div>
    </>
  );
};

export default Modal;
