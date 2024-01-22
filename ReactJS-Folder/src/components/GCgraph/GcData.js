import React, { useEffect, useState } from "react";
import Bar from "./GcGraph";
import Content from "./Data";
import classes from "./GcData.module.css";
import gc from "./chart.svg";
import gc1 from "./chart1.svg";
import icon from"./icon.svg";
import useMediaQuery from '@mui/material/useMediaQuery';
import DataLoader from "../DataLoader/DataLoader"
function Bardata() {
  /* "rgba(111, 78, 124, 1)",
    "rgba(246, 200, 95, 1)",*/
    /*"GOKHLE",
    "NIVEDITA",
    "RLB",
    "VSRC",*/
  let a = [
    "NH",
    "PH",
    "AZ",
    "RK",
    "RP",
    "LLR",
    "BRH",
    "LBS",
    "MS",
    "JCB",
    "MMM",
    "HJB",
    "BCR",
    "VSRC(BOYS)",
    "ZKH",
  ];
  let b = [
    "NEHRU",
    "PATEL",
    "AZAD",
    "RK",
    "RP",
    "LLR",
    "BRH",
    "LBS",
    "MS",
    "SN",
    "JCB",
    "MT",
    "MMM",
    "ZKH",
    "HJB",
    "VS",
    "BCR",
    "SAM"
    
  ];
  let sports=[
    "rgba(227, 140, 169, 1)",
    "rgba(211, 153, 217, 1)",
    "rgba(88, 136, 203, 1)",
    "rgba(209, 164, 113, 1)",
    "rgba(225, 87, 156, 1)",
    "rgba(181, 119, 223, 1)",
    "rgba(106, 188, 221, 1)",
    "rgba(105, 192, 105, 1)",
    "rgba(179, 188, 72, 1)",
    "rgba(148, 142, 198, 1)",
    "rgba(204, 204, 204, 1)",
    "rgba(202, 71, 47, 1)",
    "rgba(158, 216, 102, 1)",
    
  ];
  let socults=[
    "rgba(227, 140, 169, 1)",
    "rgba(211, 153, 217, 1)",
    "rgba(88, 136, 203, 1)",
    "rgba(209, 164, 113, 1)",
    "rgba(225, 87, 156, 1)",
    "rgba(181, 119, 223, 1)",
    "rgba(106, 188, 221, 1)",
    "rgba(105, 192, 105, 1)",
    "rgba(179, 188, 72, 1)",
    "rgba(148, 142, 198, 1)",
    "rgba(204, 204, 204, 1)",
    "rgba(202, 71, 47, 1)",
    "rgba(158, 216, 102, 1)",
    "rgba(111, 78, 124, 1)",
    "rgba(246, 200, 95, 1)",
    "rgba(11, 132, 165, 1)",
    "rgba(141, 220, 208, 1)",
    "rgba(254, 157, 82, 1)",
    "rgba(231, 86, 86, 1)",
    "rgba(61, 212, 153, 1)",
    "rgba(122, 94, 188, 1)",
    "rgba(217, 183, 76, 1)",
    "rgba(60, 151, 218, 1)"
  ];
  const [Year, setYear] = useState("2018-2019");
  const [Event, setEvent] = useState("sports");


  const [label, setlabel] = useState(a);
  const [Colors,setColors]=useState(sports);
  const [series, setseries] = useState(null);
 
  let i;
  let array=[];
  useEffect(() => {
    fetch(`https://tsg-iitkgp.herokuapp.com/gcstats/?param=2018-2019&subparam=sports`)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.status);
        }
        return res.json();
      })
      .then((data) => {
       let arr= Object.keys(data);
       for(i=2;i<arr.length;i++)
       {
        array.push({name:arr[i],data:JSON.parse(data[arr[i]]).slice(0, 15)})
       }
      setseries(array);
      console.log(array)
      })
      .catch((e) => {
        console.log(e);
      });
  },[]);
  function change(e)
  {  setseries(null) 
    if(e=="sports")
  {
    setlabel(a);
    setColors(sports);
  }
  else{
    setlabel(b);
    setColors(socults);
  }
    
    setEvent(e);
    fetch(`https://tsg-iitkgp.herokuapp.com/gcstats/?param=2018-2019&subparam=${e}`)
    .then((res) => {
      if (!res.ok) {
        throw Error(res.status);
      }
      return res.json();
    })
    .then((data) => {
     let arr= Object.keys(data);
     for(i=2;i<arr.length;i++)
     {
      array.push({name:arr[i],data:JSON.parse(data[arr[i]])})
     }
    setseries(array);
    console.log(array)
    })
    .catch((e) => {
      
    });

  }



  function eventyear(e)
  {
    setseries(null);
    
    
    setYear(e);
    fetch(`https://tsg-iitkgp.herokuapp.com/gcstats/?param=2018-2019&subparam=${Event}`)
    .then((res) => {
      if (!res.ok) {
        throw Error(res.status);
      }
      return res.json();
    })
    .then((data) => {
     let arr= Object.keys(data);
     for(i=2;i<arr.length;i++)
     {
      array.push({name:arr[i],data:JSON.parse(data[arr[i]])})
     }
    setseries(array);
    console.log(array)
    })
    .catch((e) => {
      
    });
  }
  /*************************************************************************************************************************/
  let component =  <div className={classes.cover}>
  <div >
    <select  value={Year} id="icon" className={classes.selectbar} 
      onChange={(e) => {
        eventyear(e.target.value)
       
      }}
    >
      <option value="2018-2019">2018-2019</option>
      <option value="2017-2018">2017-2018</option>
    </select>
    <label htmlFor="icon" className={classes.exdrop}>  <img  className={classes.icon} src={icon}/> </label>
    </div>






    <div className={classes.selectwrapper}>
    <select  value={Event} id="icon1" className={classes.selectbar} onChange={(e)=>{
    change(e.target.value);
    }}>
      <option value="sports">Sports and Games</option>
      <option value="socult">socult</option>
    </select>
    <label htmlFor="icon1" className={classes.exdrop}>  <img  className={classes.icon} src={icon}/> </label>
    </div>
    </div>
    /************************************************************************************************************************/
 
  const matches = useMediaQuery('(min-width:561px)');
  
  return (<>
    {!series && <DataLoader/>}
    {series &&
    <div className={classes.wrap}>
      <img className={classes.svg} src={gc} />
      <img className={classes.svg1} src={gc1}/>
      {!matches && component}
      <div className={classes.bar}>
     
        {matches && component}
        <Bar year={Year} series={series} label={label} colors={Colors} />
      </div>
    </div>}
    </>
  );
}
export default Bardata;
