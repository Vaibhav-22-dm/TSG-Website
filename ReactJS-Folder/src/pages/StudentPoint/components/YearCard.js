import React,{useState,useEffect}from 'react'
import Header from "./Header"

import Courserender from './CourseRender'
import classes from "../css/YearCard.module.css"
import Carousel1 from "./CardCarousel"
import DisplayCards from "./DisplayCards"
import DataLoader from "../../../components/DataLoader/DataLoader";
import Loader from '../../QuickInfo/Components/Dep/Loader'
import API from '../../../api/index'

export default function YearCard()
{  const[data,setdata]=useState(null);
    const[Year,setYear]=useState(null);
    var courselist=null;
    useEffect(() => {
      API.get("/findsubjects/?param=list&subparam=null")
          .then((data) => {
             setdata(data);
             console.log(data);
            
          })
          .catch((e) => {
            console.log(e);
          });
      },[]);
    
    
function Back (){
    setYear(null);
}
 let a=[];
let b=["1st Year","2nd year","3rd Year","4th Year","5th Year"];
let width=125;
for (let i=1;i<=5;i++)
{
a[i-1]=<div  className={classes.card} onClick={(e)=>{
    setYear(i);
}}><h1 className={classes.heading}>{i}</h1><p className={classes.words}>{b[i-1]}</p></div>
}
a[5]=<div  className={classes.card} onClick={(e)=>{
    setYear("all");
}}><h1 className={classes.All}>All</h1></div>
return(
    <>
    <Header/>
   
    {!data && <div> <Loader /> </div>}
    {data && <DisplayCards a={a} Year={Year} Back={Back} course={data.course_list} department={data.department_list} />}
    
    
  
    </>
)
}