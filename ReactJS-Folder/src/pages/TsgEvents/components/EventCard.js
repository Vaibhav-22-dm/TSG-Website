
import React from "react"
import classes from "../css/EventCard.module.css" 
import technology from "../image/technology.svg"
import money from "../image/money.svg"
import time from "../image/time.svg"
import { Link } from 'react-router-dom';
  function EventCard (props){
    let style1={
      boxShadow: "3px 3px 18px rgba(118, 148, 255, 0.25)"
    };
    let a=`/event/${props.id}`
  return(
    <Link to={a}><div className={classes.container}  style={ style1 } >
      <img className={classes.image} src={"http://127.0.0.1:8000/"+props.poster}>
      </img>
      <div className={classes.data}>
      <div className={ classes.content}>
      <div className={classes.heading}> {props.name} </div>
      <div className={classes.name}>{props.about}...</div>
      </div>


      
      <div className={classes.wrap}>
      <span className={classes.tags}>#{props.tag}</span>
      <span className={classes.time}><img className={classes.icon} src={time}></img>
      <span className={classes.timevalue}>{props.left}</span>
      </span>
      </div>
     
      </div>
      </div></Link>
  )
  }
  export default EventCard