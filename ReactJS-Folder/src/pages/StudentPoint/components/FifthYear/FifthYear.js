import React, { useState, useEffect } from "react";
import classes from "../../css/FifthYear.module.css";
import Accor from "../Accordion";
import icon from "../../icon.svg"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button'
import DataLoader from "../../../../components/DataLoader/DataLoader";
import Loader from '../../../QuickInfo/Components/Dep/Loader'

 
export default function FirstYear(props) {

 
  console.log(props.course);
  let cou=JSON.parse(props.course);
 let course= cou.filter(course => course.includes("5"));
  const[data,setdata]=useState(null);
  const[val,setval]=useState(null);
    useEffect(() => {
        fetch(`https://tsg-iitkgp.herokuapp.com/findsubjects/?param=AEROSPACE%20ENGINEERING(B.TECH%205Y)&subparam=${props.year}`)
          .then((res) => {
            if (!res.ok) {
              throw Error(res.status);
            }
            return res.json();
          })
          .then((data) => {
             setdata(data);
            
            
          })
          .catch((e) => {
            console.log(e);
          });
      },[]);
  let n = 7;
  let i;
  let a = [];
async function fetchdata(e)

{ setval(e);
  let response = await fetch(`https://tsg-iitkgp.herokuapp.com/findsubjects/?param=${e}&subparam=${props.year}`);
  let res = await response.json();
 setdata(res);
};
  
  const autumn = () => {
    a=[];
    for (i = 1; i <= data.autumn.length; i++) {
      a[i - 1] = <Accor width="90%" course={data.autumn[i-1].name} />;
    }
    return a;
  };
  const spring = () => {
    a=[];
    for (i = 1; i <= data.spring.length; i++) {
      a[i - 1] = <Accor width="90%"  course={data.spring[i-1].name} />;
    }
    return a;
  };



  return (
    <>
    {!data && <Loader/>}
      {data && <div className={classes.container}>
      <Button onClick={
    props.back
    } className={classes.btback} variant="contained"><ArrowBackIosIcon style={{fontSize:'1em'}}/> BACK</Button>
      <div className={classes.department}>
      <select value={val} className={classes.list} id="icon" onChange={(e)=>{
        setdata(null);
       fetchdata(e.target.value);
      }}>
       {
         course.map((e)=>{
           return(  <option value={e}>{e}</option>)
        
        
         })
       }
       
     </select>
     <label htmlFor="icon" className={classes.exdrop}>  <img  className={classes.icon} src={icon}/> </label>
     </div>
        <p className={classes.heading}>9th Semester</p>

        {autumn()}
        <p className={classes.heading}>10th Semester</p>
        {spring()}
      </div>}
    </>
  );
}
