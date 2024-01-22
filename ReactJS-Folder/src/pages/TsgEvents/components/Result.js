import React,{useState,useEffect} from "react";
import classes from "../css/Result.module.css"
import eventresult from "../image/eventresult.svg"
import icon from "../image/icon.svg"
import visibility from "../image/visibility.svg"
import downloadfile from "../image/downloadfile.svg"
import back from "../image/back.svg"
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import DataLoader from "../../../components/DataLoader/DataLoader"
import Loader from "../../../components/DataLoader/Loader"

 function Result()
 
 { const[display,setdisplay]=useState(true);
    const[val,setval]=useState("none");
    const[societyval,setsocietyval]=useState("none");
     const soc_list = useSelector((state) => state.auth.societyList)
 const hall_list = useSelector((state) => state.auth.hallList)
 console.log(soc_list)
 const[resultdata,setresultdata]=useState(null)
 useEffect(() => {

       fetch("http://tsg-iitkgp.herokuapp.com/tsgeventresults/")
       .then((res) => {
         if (!res.ok) {
           throw Error(res.status);
         }
         return res.json();
       })
       .then((data) => {
         
          setresultdata(data.event_list);
         
         
       })
       .catch((e) => {
         console.log(e);
       });

   },[]);
 
   const download = e => {
    console.log(e.target.href);
    fetch(e.target.href, {
      method: "GET",
      headers: {}
    })
      .then(response => {
        response.arrayBuffer().then(function(buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  async function category (e)
  { setval(e.target.value);

   if(societyval==="none")
   {
     console.log(e.target.value);
   }
   if(societyval!="none"){
    setresultdata(false)
    let response = await fetch(
      `https://tsg-iitkgp.herokuapp.com/tsgeventresults/?param=${e.target.value}&subparam=${societyval}`)
    let res = await response.json();
    console.log(res.event_list.length)
       if(res.event_list !=0)
       {
        setresultdata(res.event_list);
        setdisplay(true);
       }
       else{
        setresultdata(true);
        setdisplay(false);
       
        
       }
   
   }
  }
  async function society (e)
  { setsocietyval(e.target.value);
    setresultdata(false);

   if(val==="none")
   {
     console.log(e.target.value);
   }
   if(val!="none"){
    let response = await fetch(
      `https://tsg-iitkgp.herokuapp.com/tsgeventresults/?param=${val}&subparam=${e.target.value}`)
    let res = await response.json();
    console.log(res.event_list.length)
    if(res.event_list.length !=0)
       {
         console.log("hello");
        setdisplay(true);
        setresultdata(res.event_list);
        
       }
       else{
        setdisplay(false);
        setresultdata(true);
         

       }
   }
  }
     return(
         <div>
       
         <div>
         <div className={classes.result}><span className={classes.events}>Results</span><Link to="/events" className={classes.back} ><img src={back}></img></Link></div>
         <div className={classes.container}>
         <div className={classes.conone} >
         <img className={classes.eventresult} src={eventresult}></img>
         <h2 className={classes.search}>SEARCH EVENT</h2>
         <div className={classes.drop1}>
          <select id="icon" className={classes.dropdown} value={val} onChange={(e)=>{
            category(e);
          }}>
          <option value="none" disabled selected hidden>
         Select Category
        </option>
            <option value="technology">TECHNOLOGY</option>
            <option value="social-culture">SOCIAL/CULTURE</option>
            <option value="Sports">SPORTS & GAMES</option>
            <option value="student-welfare">STUDENT WELFARE</option>
            
          </select>
          <label htmlFor="icon" className={classes.exdrop}>  <img  className={classes.icon} src={icon}/> </label>
        </div>
        <div className={classes.drop2}>
        <select id="icon" value={societyval}  onChange={(e)=>{
          society(e);
        }}>
        <option value="none" disabled selected hidden>
                 Organiser
                </option>
         {
           soc_list && soc_list.map((e)=><option value={e.name}>{e.name}</option>)
           
         }
         {
          hall_list && hall_list.map((e)=><option value={e.name}>{e.name}</option>)
          
        }
          
        </select>
        <label htmlFor="icon" className={classes.exdrop}>  <img  className={classes.icon} src={icon}/> </label>
      </div>
         
         </div>
         <div className={classes.contwo} >
         <div className={classes.heading}>
         <span >Event</span>
         <span className={classes.date} >Date</span>
         <span>Result</span>
         </div>
        <div className={classes.blockcontainer}>
        {!resultdata && <Loader/>}
      { (display && resultdata) &&
          resultdata.map((b)=>{
              return( 
                <div className={classes.block}>
                <div className={classes.eventname}>{b.eventName} </div>
                <div className={classes.datevalue}>{b.eventDate}</div>
                <div>
                <a href={b.report} target="_blank"><img src={visibility} className={classes.visibility}></img></a>
               <a href={b.report}  target="_blank" download onClick={e => download(e)}> <img src={downloadfile} className={classes.download}></img></a>
                </div>
               
                </div>)
          })
      }
      { (!display && resultdata) && <div className={classes.displaysvg}><img className={classes.nodata} src="https://raw.githubusercontent.com/TSG-Website/media/b41456f206d423d041b7b4e09eaf243990ed3f24/SocietyEvents/nodata.svg"></img></div>}
      
    
      </div>
         </div>
         </div> </div>
         </div>
     )
 }
 export default Result;