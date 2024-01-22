import LanguageIcon from '@mui/icons-material/Language';
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import React from 'react';
import classes from './css/DepartmentFaculty.module.css'
import { useState, useEffect } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const FacultyCard = ({faculty}) => {
  const baseUrl = process.env.REACT_APP_ASSETS_BASEURL
  const [show, setShow] = useState(false)
  console.log(faculty)

  return(
      <div className={classes.departmentFacultyInnerCard}>
        <div className={classes.departmentFacultyCardLayerOne}>
          <div className={classes.departmentFacultyProfilePic}>
            <div className={classes.departmentFacultyProfilePicCircle} style={{
                background:`url('${baseUrl}QuickInfo/jk_profile_pic.png')`
            }}>
            </div>
          </div>
          <div className={classes.departmentFacultyDetails}>
            <div className={classes.departmentFacultyName}>{faculty.firstName} {faculty.lastName}</div>
            <div className={classes.departmentFacultyPost}>{faculty.designation}</div>
            <div className={classes.departmentFacultyLinkBox}>
              <LanguageIcon className={classes.departmentFacultyIcon}/>
              <a target="_blank" href={faculty.instiPageLink} style={{color:"grey"}} className={classes.departmentFacultyLink}>Institute Page Link</a>
            </div>
            <div className={classes.departmentFacultyLinkBox}>
              <AlternateEmailOutlinedIcon className={classes.departmentFacultyIcon}/>
              <a className={classes.departmentFacultyLink}  style={{color:"grey"}} >{faculty.email}</a>
            </div>
            <div className={classes.departmentFacultyLinkBox}>
              <AddIcCallOutlinedIcon className={classes.departmentFacultyIcon}/>
              <a className={classes.departmentFacultyLink}  style={{color:"grey"}} >{faculty.phone}</a>
            </div>
          </div>
        </div>
        <div className={classes.departmentFacultyCardLayerTwo} style={{bottom:show===true?`0px`:`-100%`}}>
          <ul>
            {/* <li>BioMEMS</li>
            <li>MEMS and Microsystems</li>
            <li>Circuits, Devices and Sensors</li>
            <li>Nanofabrication</li>
            <li>BioMEMS</li>
            <li>MEMS and Microsystems</li>
            <li>Circuits, Devices and Sensors</li>
            <li>Nanofabrication</li>
            <li>BioMEMS</li>
            <li>MEMS and Microsystems</li>
            <li>Circuits, Devices and Sensors</li>
            <li>Nanofabrication</li>
            <li>BioMEMS</li>
            <li>MEMS and Microsystems</li>
            <li>Circuits, Devices and Sensors</li>
            <li>Nanofabrication</li> */}
            {faculty.researchArea && JSON.parse(faculty.researchArea).map((item, index) => <li>{item}</li>)}
          </ul>
        </div>
        <div className={classes.departmentFacultyCardButtonBox}>
          <button className={classes.departmentFacultyCardButton} onClick={() => setShow(!show)}
            style={{
                background:show===true?'white':'#7694FF',
                color:show===true?'#7694FF':'white'
                }}>
            <span>Research Areas</span>
            <span style={{
                transition:'all 0.3s ease',
                transform:show===true?'rotateZ(180deg)':'rotateZ(0deg)',
                background:show===true?'#7694FF':'white',
                borderRadius:'50%', 
                width: '25px',
                height: '25px'
            }}>
                <KeyboardArrowUpIcon style={{
                    transition:'all 0s ease',
                    color:show===true?'white':'#7694FF'
                }}/>
            </span>
            
          </button>
        </div>
      </div>
  )
}

export default FacultyCard;