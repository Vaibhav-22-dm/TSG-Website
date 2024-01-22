import React, {useEffect, useState } from "react";
import Graph from "./CdcGraph";
import classes from "./CdcData.module.css"
import Content from "./Data";
import stats from"./stats.svg"
import stats1 from"./stats1.svg"
import icon from "./icon.svg";
import useMediaQuery from '@mui/material/useMediaQuery';
function Data() {
  const [Year, setYear] = useState("2020");
  const[Day,setDay]=useState("firstday");
  
  const [Data, setData] = useState(Content[0]);
  console.log(Content[0]);
  /*useEffect(() => {
    fetch()
    .then(response=>{
        if(response.ok){
            return response.json();
        }
        throw Response;
        
    })
    .then(data=>{
        setData(data);

    })
    .catch(error=>{
        console.log(error);
    })
  }, []);*/
var i;
const matches = useMediaQuery('(min-width:501px)');
let component= <div className={classes.bar}>
<div>
  <select  id="icon" className={classes.selectbar} onChange={(e) => 
    {setYear(e.target.value);
        for(i=0;i<Content.length;i++)
        {
            if((Content[i].year===e.target.value) && (Content[i].day==Day) )
            {
             setData(Content[i]);
             break;
            }
        }
    }
} >
  
    <option value="2020">2020</option>
    <option value="2019">2019</option>
    <option value="2018">2018</option>
    <option value="2017">2017</option>
    <option value="2016">2016</option>
    
  </select>
 <label htmlFor="icon" className={classes.exdrop}>  <img  className={classes.icon} src={icon}/> </label>
 </div>
 <div>
 <select  id="icon1" className={classes.selectbar} onChange={(e) => 
  {setDay(e.target.value);
      for(i=0;i<Content.length;i++)
      {
          if((Content[i].day===e.target.value) && (Content[i].year===Year))
          {
           setData(Content[i]);
           break;
          }
      }
  }
} >
 
 <option value="firstday">FIRST DAY</option>
 <option value="secondday">SECOND DAY</option>
 <option value="thirdday">THIRD DAY</option>

 
 </select>
 <label htmlFor="icon1" className={classes.exdrop1}>  <img  className={classes.icon1} src={icon}/> </label>
 </div>
 </div>
  return (
    <div className={classes.wrap} >
   
    <img className={classes.svg} src={stats}/>
    <img className={classes.svg1} src={stats1}/>
    {!matches && component}
    <div className={classes.outer} >
    {matches && component}
   

      <Graph year={Year} data={Data}/>

      </div>
    </div>
  );
}
export default Data;
