import React, { useEffect, useState } from "react";
import classes from "./GradeData.module.css";

import Chart from "./GradedonutChart";
import Area from "./GradeareaChart";
import svg from "./course.svg";
import icon from "./icon.svg";
import DataLoader from "../DataLoader/DataLoader";
import { useSelector } from 'react-redux'
function Grade() {
  const {departmentList,hallList,courseList} = useSelector((state) => state.auth);
 
  const[dep,setdep]=useState(departmentList===null?"AE - Aerospace Engineering":departmentList[0].name);
  const[Data,setData]=useState(null);
  const[subject,setsubject]=useState(null);
  const[val,setval]=useState(null);
 
  useEffect(() => {
      fetch(`https://tsg-iitkgp.herokuapp.com/findsubjects/?param=dept&subparam=${dep} `)
        .then((res) => {
          if (!res.ok) {
            throw Error(res.status);
          }
          return res.json();
        })
        .then((data) => {
          setsubject(data.subject_list);
           setData(JSON.parse(data.subject.gradeStat));
           setval(data.subject.name)
           console.log(data);
           
          
        })
        .catch((e) => {
          console.log(e);
        });
    },[dep]);
    async function fetchdata(e)

    { setval(e);
      let response = await fetch(`https://tsg-iitkgp.herokuapp.com/findsubjects/?param=code&subparam=${e}`);
      let res = await response.json();
      
     setData(JSON.parse(res.gradeStat));
    };
  

  return (<>
    {!Data  && <DataLoader/>}
    {Data && <div className={classes.page}>
      <div className={classes.side}>
        <img src={svg}  className={classes.image}/>
        <h2 className={classes.search}>SEARCH COURSE</h2>
        <div className={classes.drop1}>
          <select id="icon" value={dep}  onChange={(e)=>{
            setData(null);
            setdep(e.target.value);
          
          }}>
          {departmentList && departmentList.map((e)=>{
            return(<option value={e.name}>{e.name}</option>
            )
          })}
            
          </select>
          <label htmlFor="icon" className={classes.exdrop}>  <img  className={classes.icon} src={icon}/> </label>
        </div>
        <div className={classes.drop2}>
          <select value={val} id="icon" onChange={(e)=>{
            setData(null);
            fetchdata(e.target.value);
          }}>
          { departmentList && JSON.parse(subject).map((e)=>{
            return(<option value={e.courseCode}>{e.courseCode}</option>
            )
          })}
          </select>
          <label htmlFor="icon" className={classes.exdrop}>  <img  className={classes.icon} src={icon}/> </label>
        </div>
        </div>



        <div className={classes.graphs}>
        <div className={classes.area} >
        <h2 className={classes.coursen}>{Data.coursen}</h2>
        <Area data={Data}/>
        </div>



        <div className={classes.donutsection}>
        <div className={classes.donut}>
        <Chart data={Data}/>
        </div>
        <div className={classes.coursecontent}><h3>
        ABOUT COURSE</h3>
        <div className={classes.about}>Lorem Ipsum is simply dummy text of the printing and typ industry. Lorem Ipsum has been the industry's standard dummy
        </div>
        </div>

        
        </div>
        </div>
      
    </div>}
    </>
  );
}
export default Grade;
