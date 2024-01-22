import React, {useEffect , useState} from 'react'
import { Link } from 'react-router-dom';
import AcademicPoint from './Academic point/components/AcademicPoint'
import DataLoader from "../../../../components/DataLoader/DataLoader";
import { useSelector } from 'react-redux'
import careerpoint from "./Academic point/image/careerpoint.svg"
import classes from "./StudentPoint.module.css"
function StudentPoint() {
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
     let i;
     let course=[];
      const {departmentList,hallList,courseList} = useSelector((state) => state.auth);
    
      for ( i=0;i<courseList.length;i++){
         course[i]=courseList[i].name;
      }
      console.log(course);
    return (
        <div>
        {!data && <DataLoader/>}
        {data && <div>
        <div className={classes.wrap}>
        <div  className={classes.heading}>StudentPoint</div>
        <div  ><Link to="/tsgadmin/studpoint/careerpoint"><img  className={classes.image} src={careerpoint}/></Link></div>
        </div>
        <AcademicPoint data={data} course={course}/>
        </div>}
        </div>

    )
}

export default StudentPoint
