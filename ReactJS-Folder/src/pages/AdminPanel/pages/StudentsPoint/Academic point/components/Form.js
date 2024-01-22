import { ClassNames } from "@emotion/react";
import React,{useState} from "react"
import classes from "../css/Form.module.css"
import icon from "../image/icon.svg"

 function Form(props){
        const[course,setcourse]=useState([]);
         const[display,setdisplay]=useState(true);
         function setdropdown(e)
         {          setcourse([]);
                   if(e=="Chemistry Semester"||e=="Physics Semester")
                 {     
                   console.log("");
                 }
                 else if(e=="Ninth Semester"|| e=="Tenth Semester"){
                        setcourse(props.b);
                    }
                 else{
                        setcourse(props.course);
                        console.log(props.course)
                    }
         }
     return(
<div className={classes.container}>
<div className={classes.update}>Academics Update Form</div>
<form>
<div className={classes.semester}>Select Semester</div>
<select id="icon" className={classes.semesterdrop} onChange={(e)=>{
        console.log(e.target.value);
        setdropdown(e.target.value);
}}>
<option value="none" disabled selected hidden></option>
<option value="Physics Semester">Physics Semester</option>
        <option value="Chemistry Semester">Chemistry Semester</option>
        <option value="Third Semester">Third Semester</option>
        <option value="Forth Semester">Forth Semester</option>
        <option value="Fifth Semester">Fifth Semester</option>
        <option value="Sixth Semester">Sixth Semester</option>
        <option value="Seventh Semester">Seventh Semester</option>
        <option value="Eighth Semester">Eighth Semester</option>
        <option value="Ninth Semester">Ninth Semester</option>
        <option value="Tenth Semester">Tenth Semester</option>
</select>
<label htmlFor="icon" className={classes.exdrop}>  <img  className={classes.icon} src={icon}/> </label>
<div className={classes.course}>Select Course</div>
<select id="icon" className={classes.coursedrop}>
<option value="none" disabled selected hidden></option>
{
        course.map((e)=>{
           return (
               <option value={e}>{e}</option>
           )
        })
    }
</select>
<label htmlFor="icon" className={classes.exdrop}>  <img  className={classes.icon} src={icon}/> </label>
<div className={classes.subject}>Select subject</div>
<select  id="icon" className={classes.subjectdrop}>
<option value="none" disabled selected hidden></option>
</select>
<label htmlFor="icon" className={classes.exdrop}>  <img  className={classes.icon} src={icon}/> </label>
{display &&<div className={classes.addsubject} onClick={()=>{
        setdisplay(false)
}}><div className={classes.plus} >+</div> <div className={classes.addsub}>Add Subject</div>
</div>}
{ !display && <div><div className={classes.add}>Add Subject</div>
<input className={classes.link} type="text"/></div>}
<div className={classes.add}>Notes</div>
<input className={classes.link} type="text" placeholder="Add a link"/>
<div className={classes.add}>Books</div>
<input className={classes.link} type="text" placeholder="Add a link"/>
<div className={classes.add}>PYQs</div>
<input className={classes.link} type="text" placeholder="Add a link"/>
<div className={classes.add}>Other</div>
<input className={classes.link} type="text" placeholder="Add a link"/>
<div className={classes.button}><input type="submit" value="Update" className={classes.updatebutton}/></div>
</form>
</div>)

 }
 export default Form;