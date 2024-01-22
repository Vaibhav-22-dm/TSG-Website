
import React from "react"
import classes from "../css/LatestEvent.module.css" 
import technology from "../image/technology.svg"
import money from "../image/money.svg"
import time from "../image/time.svg"
import { Link } from 'react-router-dom';
  function LatestEvent (props){
    let a=`/event/${props.id}`
    
  return(
  <Link to={a}> <div className={classes.container} >
      <img className={classes.image} src={'http://127.0.0.1:8000/' +props.poster}>
      </img>
      <div className={classes.data}>
      <div className={ classes.content}>
      <div className={classes.heading}> {props.name} </div>
      <div className={classes.name}>{props.about}...</div>
      </div>
      
      <div className={classes.wrap}>
      <span className={classes.tags}>#{props.tag}</span>
      <span className={classes.time}><img className={classes.icon} src={time} ></img>
      <span className={classes.timevalue}>{props.left}</span>
      </span>
      </div>
     
      </div>
      </div></Link>
  )
  }
  export default LatestEvent