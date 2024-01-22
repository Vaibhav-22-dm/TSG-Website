import React, { useState, useEffect } from "react";
import classes from "../../css/Common.module.css";
import Accor from "../Accordion";
import icon from "../../icon.svg"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button'
import DataLoader from "../../../../components/DataLoader/DataLoader";
import Loader from '../../../QuickInfo/Components/Dep/Loader'
import API from '../../../../api/index'

export default function Common(props) {
  const[dep,setdep]=useState(props.department[0]);
  const[data,setdata]=useState(null);
  const[subject,setsubject]=useState(null);
  const[val,setval]=useState(null);
  useEffect(() => {
      API.get("/findsubjects/?param=dept&subparam=${dep}")
        .then((data) => {
          setsubject(data.subject_list);
           setdata(data);
           setval(data.subject.name)
           
          
        })
        .catch((e) => {
          console.log(e);
        });
    },[dep]);


    async function fetchdata(e)

    { setval(e);
      let response = await fetch(`http://127.0.0.1:8000/findsubjects/?param=code&subparam=${e}`);
      let res = await response.json();
      console.log(res);
     setdata(res);
    };
  return (
    <>
    {!data && <Loader/>}

     {data && <div className={classes.container}>
      <Button onClick={
    props.back
    } className={classes.btback} variant="contained"><ArrowBackIosIcon style={{fontSize:'1em'}}/> BACK</Button>

      <div className={classes.department}>
      <select  value={dep} className={classes.list} id="icon" onChange={(e)=>{
        setdata(null);
        setdep(e.target.value);
      
      }}>
       {props.department.map((e)=>{
         return(<option value={e}>{e}</option>
         )
       })}
     </select>
    
     <label htmlFor="icon" className={classes.exdrop}>  <img  className={classes.icon} src={icon}/> </label>
     </div>

     <div className={classes.department1}>
     <select  value={val} className={classes.list} id="icon"  onChange={(e)=>{
      setdata(null);
      fetchdata(e.target.value);

     }}>
     {JSON.parse(subject).map((e)=>{
      return(<option value={e.courseCode}>{e.courseCode}</option>
      )
    })}
       
     </select>
     <label htmlFor="icon" className={classes.exdrop}>  <img  className={classes.icon} src={icon}/> </label>
     </div>
     
       

        { data.subject && <Accor width="90%"  course={data.subject.name}/>}
        { !data.subject && <Accor width="90%"  course={data.name}/>}
    
      </div>}
    </>
  );
}
