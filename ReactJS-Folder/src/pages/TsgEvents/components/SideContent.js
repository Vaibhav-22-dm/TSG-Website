import React,{useState} from "react"
import icon from "../image/eventicon.svg"
import classes from "../css/SideContent.module.css"
import techevent from "../image/techevent.svg"
import { Link } from 'react-router-dom';
 function SideContent(props){

let style1={boxShadow: "3px 3px 18px rgba(118, 148, 255, 0.25)"}
return(
    <span className={classes.container}>
    <span className={classes.wrap}>
    
    <div className={classes.name} style={props.active[0]?style1:null}>
   <Link to="/events/technology" className={classes.link}>Technology</Link></div>
   <div className={classes.name} style={props.active[1]?style1:null}>
   <Link to="/events/social" className={classes.link}>Social/Culture</Link></div>
   <div className={classes.name} style={props.active[2]?style1:null}>
   <Link to="/events/sports" className={classes.link}>Sports & games</Link></div>
   <div className={classes.name} style={props.active[3]?style1:null}>
   <Link to="/events/welfare" className={classes.link}>Student Welfare</Link></div>
    
    </span>
    
    <img className={classes.image} src={techevent}></img>
  
    </span>
)
 }
 export default SideContent