import React from "react"
import Subject from "./Subject"
import Form from "./Form"
import classes from "../css/AcademicPoint.module.css"
 function AcademicPoint(props){
     return(
         <div className={classes.container}>
         <Subject data={props.data} course={props.course}/>
         
         </div>
     )
 };
 export default AcademicPoint;