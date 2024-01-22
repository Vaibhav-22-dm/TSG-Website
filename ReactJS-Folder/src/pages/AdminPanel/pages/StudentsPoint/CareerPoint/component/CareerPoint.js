import React,{useState,useEffect} from "react"
import Main from "./Main"
import classes from "../css/CareerPoint.module.css"
import DataLoader from "../../../../../../components/DataLoader/DataLoader";
import academicpoint from "../academicpoint.svg"
import { Link } from 'react-router-dom';
function CareerPoint()
{ const[data,setdata]=useState(null);
    useEffect(() => {
        fetch("https://tsg-iitkgp.herokuapp.com/cdc/")
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
      }, []);
return(
    <>
    {!data && <DataLoader/>}
    { data &&<div className={classes.container}>
    <div className={classes.wrap}>
    <div className={classes.heading}>Student Point</div>
     <div><Link to="/tsgadmin/studpoint"><img src={academicpoint} className={classes.image}/></Link></div>
        
    </div>
    <Main data={data}/></div>}
    </>
)
}
export default CareerPoint;