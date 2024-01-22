import React from "react";
import classes from "../../News/Components/EventItem.module.css";
function NewsItem({ title, id }) {
  return (
    <li className={classes.event_item}>
      <p className={classes.title}>{title}</p>
      <div className={classes.line}></div>
    </li>
  );
}

export default NewsItem;
