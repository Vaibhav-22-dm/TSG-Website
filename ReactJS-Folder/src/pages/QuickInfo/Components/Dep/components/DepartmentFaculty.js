import LanguageIcon from '@mui/icons-material/Language';
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import React from 'react';
import classes from './css/DepartmentFaculty.module.css'
import { useState, useEffect } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FacultyCard from './FacultyCard.js'

function DepartmentFaculty({faculty}) {
  // const [imgs, setImgs] = useState([0, 1, 2, 3, 4, 5, 6, 7])
  const baseUrl = process.env.REACT_APP_ASSETS_BASEURL

  return(
    <>
      <div className={classes.departmentFacultyContainer}>
        {faculty && faculty.map(item => 
          <div key={item.id} className={classes.departmentFacultyCard}>
            <FacultyCard faculty={item}/>
          </div>  
        )}
      </div>
    </>
  )
}

export default DepartmentFaculty;
