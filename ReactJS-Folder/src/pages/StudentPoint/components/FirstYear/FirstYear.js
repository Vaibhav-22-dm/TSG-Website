import React,{useEffect , useState} from "react";
import classes from "../../css/FifthYear.module.css"
import Button from '@mui/material/Button'
import Accor from "../Accordion";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DataLoader from "../../../../components/DataLoader/DataLoader";
import Loader from '../../../QuickInfo/Components/Dep/Loader'


export default function FirstYear(props){
    const[data,setdata]=useState(null);
    useEffect(() => {
        fetch("https://tsg-iitkgp.herokuapp.com/findsubjects/?param=default&subparam=null ")
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
      
      

let n=7;
let i;
let a=[];
const physem=()=>{
    a=[];
    for(i=1;i<=data.phySem.length;i++)
    {
        a[i-1]=<Accor width="90%" course={data.phySem[i-1].name}/>
    }
    return a;
    
};
const chemsem=()=>{
    a=[];
    for(i=1;i<=data.chemSem.length;i++)
    {
        a[i-1]=<Accor  width="90%" course={data.chemSem[i-1].name}/>
    }
    return a;
    
}
return(
    <>
   {!data && <Loader/>}
  {data && <div className={classes.container}>
  <Button onClick={
  props.back
  } className={classes.btback} variant="contained"><ArrowBackIosIcon style={{fontSize:'1em'}}/> BACK</Button>
  <p className={classes.heading}>Physics Semester</p>

  {
      physem()
  }
  <p className={classes.heading}>Chemistry Semester</p>
  {
      chemsem()
  }
  </div>}
    </>
)

}