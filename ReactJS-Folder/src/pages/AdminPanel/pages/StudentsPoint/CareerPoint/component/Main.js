import React,{useState} from "react"
import classes from "../css/Main.module.css"
import dropdown from "../../Academic point/image/dropdown.svg"
import image from "../../Academic point/image/sde1.svg"
import ControlledAccordions from "./Accordion"
import Form from "./Form"
function Main(props)
{ let i;
    const[heading,setheading]=useState(props.data[0].name);
    const[about,setabout]=useState(props.data[0].about);
    const[val,setval]=useState(props.data[0].name);
    const[notes,setnotes]=useState(props.data[0].notesDriveLink)
    const[question,setquestion]=useState(props.data[0].qnasDriveLink)
    const[blog,setblog]=useState(props.data[0].blogsLinkList)
    function set(e)
    { setval(e);
     for(i=0;i<props.data.length;i++)
     {
         if(e==props.data[i].name)
         {
             setheading(props.data[i].name);
             setabout(props.data[i].about);
             setnotes(props.data[i].notesDriveLink)
             setquestion(props.data[i].qnasDriveLink)
             setblog(props.data[i].blogsLinkList)
             break;
         }
     }
    }
return(
    <div className={classes.container}>
    <div className={classes.wrap}>
    <div className={classes.dropdown}>
    <select  value={val} id="icon" className={classes.select1} onChange={(e)=>{
        set(e.target.value)
    }}>
    <option value="Software Development">SDE</option>
    <option value="Quant">Quant</option>
    <option value="Analytics">Analytics</option>
    <option value="Research">Research</option>
    <option value="Finance">Finance</option>
    <option value="Core">Core</option>
    <option value="Consulting & FMCG">Consulting & FMCG</option>
    <option value="Government Exams">Government Exams</option>
    </select>
    <label htmlFor="icon" className={classes.exdrop}>  <img  className={classes.icon} src={dropdown}/> </label>
    
    </div>
    <div className={classes.heading}>{heading}</div>
    <div className={classes.contone}>
      <div className={classes.about}>{about}</div>
      <img className={classes.image} src={image}></img>
    </div>
    <div className={classes.contwo}>
    <ControlledAccordions  notes={notes}
    question={question}
    blog={blog} />
    </div>
    </div>
    <div className={classes.wrap1}>
    <Form data={props.data}/>
    </div>
    </div>

)
}
export default Main;