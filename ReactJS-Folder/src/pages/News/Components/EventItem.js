import React from "react";
import classes from "./EventItem.module.css";
import { useNavigate } from "react-router-dom";
function EventItem({ title, id }) {
  const navigate = useNavigate();
  return (
    <li className={classes.event_item} onClick={() => navigate(`/event/${id}`)}>
      <p className={classes.title}>{title.slice(0,30) + '...'}</p>
      <div className={classes.line}></div>
    </li>
  );
}

export default EventItem;
