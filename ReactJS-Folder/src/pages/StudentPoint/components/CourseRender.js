import React,{useEffect , useState} from "react";
import FirstYear from"./FirstYear/FirstYear";
import OtherYear from "./OtherYear/OtherYear";
import FifthYear from "./FifthYear/FifthYear";
import Common from "./Common/Common";
import PreLoader from "../../../components/PreLoader/PreLoader";

export default function CourseRender(props){
   
 let a;
 let sem1;
 let sem2;
   function choose()
   {
    if(props.year=="1")
    {
    return (<FirstYear back={props.back}/>)
    }
    if(props.year=="2" )
    {  sem1="3rd Semester"
       sem2="4th Semester"
        return(<OtherYear year={props.year} sem1={sem1} sem2={sem2} back={props.back} course={props.course}/>)
    }
    if(props.year=="3")
    {sem1="5th Semester"
    sem2="6th Semester"
    return(<OtherYear year={props.year} sem1={sem1} sem2={sem2} back={props.back} course={ props.course}/>)
    }
    if(props.year=="4")
    { sem1="7th Semester"
    sem2="8th Semester"
        return(<OtherYear year={props.year} sem1={sem1} sem2={sem2} back={props.back} course={ props.course}/>)
    }
    if(props.year=="5")
    {
    return(<FifthYear back={props.back}  year={props.year} course={props.course} />)
    }
    if(props.year=="all")
    {
    return(<Common back={props.back} department={props.department}/>)
    }
   }
    return(
        <>
        
      { choose()}

        </>
             
)
}