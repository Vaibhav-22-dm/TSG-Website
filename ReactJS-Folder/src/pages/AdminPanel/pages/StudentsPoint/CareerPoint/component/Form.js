import { ClassNames } from "@emotion/react";
import React,{useState} from "react"
import classes from "../css/Form.module.css"
import icon from "../../Academic point/image/icon.svg"
 function Form(props){
     const[notes,setnotes]=useState("");
     const[question,setquestion]=useState("");
     const[blog,setblog]=useState("");
     const[blogtitle,setblogtitle]=useState("");
     
     const[id,setid]=useState("");
    
     let i;
     function set(e)
     { 
      for(i=0;i<props.data.length;i++)
      {
          if(e==props.data[i].name)
          {
              
              setnotes(props.data[i].notesDriveLink)
              setquestion(props.data[i].qnasDriveLink);
              setid(props.data[i].id);
              break;
          }
      }
     }

     function submit(e)
     {  e.preventDefault();
        
          let a=JSON.parse(props.data[id-1].blogsLinkList);
          if(blogtitle!="" && blog!="" )
          {
          a.push({name:blogtitle,link:blog});
          }
          a=a.toString();
         let item={
            notesDriveLink:notes,
            qnasDriveLink:question,
            blogsLinkList:a
        };
       
        fetch(`https://tsg-iitkgp.herokuapp.com/cdc/${id}/`, {
            method: "PATCH",
            body: JSON.stringify(item),
            headers: {
            "Content-type": "application/json"
            }
            })
            .then(response => response.json())
            .then(json => console.log(json))
     }
     return(
<div className={classes.container}>
<div className={classes.update}>Career Update Form</div>
<form onSubmit={submit}>
<div className={classes.stream}>Select Stream</div>
<select id="icon" className={classes.streamdrop} onChange={(e)=>{
    set(e.target.value)
}}>
<option value="none" disabled selected hidden></option>
<option value="Software Development">SDE</option>
    <option value="Quant">Quant</option>
    <option value="Analytics">Analytics</option>
    <option value="Research">Research</option>
    <option value="Finance">Finance</option>
    <option value="Core">Core</option>
    <option value="Consulting & FMCG">Consulting & FMCG</option>
    <option value="Government Exams">Government Exams</option>
</select>
<label htmlFor="icon" className={classes.exdrop}>  <img  className={classes.icon} src={icon}/> </label>
<div className={classes.alert}>Enter only those links that you want to be updated else leave empty.</div>
<div className={classes.add}>Blog Heading</div>
<input value={blogtitle} onChange={(e)=>{
    setblogtitle(e.target.value);
}} className={classes.link} type="text" placeholder="Add a heading"/>
<div className={classes.add}>Blog link</div>
<input value={blog} onChange={(e)=>{
    setblog(e.target.value);
}} className={classes.link} type="text" placeholder="Add a link"/>
<div className={classes.add}>Study Materials</div>
<input value={notes} onChange={(e)=>{
    setnotes(e.target.value);
}} className={classes.link} type="text" placeholder="Add a link"/>
<div className={classes.add}>Interview Questions</div>
<input value={question} onChange={(e)=>{
    setnotes(e.target.value);
}} className={classes.link} type="text" placeholder="Add a link"/>
<div className={classes.add}>Others</div>
<input className={classes.link} type="text" placeholder="Add a link"/>
<div className={classes.button}><input type="submit" value="Update" className={classes.updatebutton}/></div>
</form>
</div>)

 }
 export default Form;