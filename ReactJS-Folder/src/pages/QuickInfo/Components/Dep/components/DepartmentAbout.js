import React from 'react';
import classes from './css/DepartmentAbout.module.css'
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useRef } from 'react'

function DepartmentAbout({department, hod}) {
    const [readMore , setReadMore] = useState(department.about.length > 370?true:false)
    const toggleReadMore = () => {
         setReadMore(!readMore);
    }
    const [readMore1 , setReadMore1] = useState(department.hod_message.length > 540?true:false)
    const toggleReadMore1 = () => {
         setReadMore(!readMore1);
    }
    const [ach, setAch] = useState((department.achievements===null||department.achievements==='')?'no-data':JSON.parse(department.achievements).slice(0,4))
    const [loadMore, setLoadMore] = useState((department.achievements === null || department.achievements === '' || JSON.parse(department.achievements).length<=4)?false:true)
    const toggleLoadMore = () => {
        setLoadMore(!loadMore);
        setAch(ach.length > 4 ? JSON.parse(department.achievements).slice(0,4) : JSON.parse(department.achievements))
    }
    const [rlabs, setRlabs] = useState((department.labs === null || department.labs === "") ? 'no-data' : JSON.parse(department.labs))

    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL

    return(
        <>          
            <div className={classes.departmentAboutContainer}>
                <div className={classes.departmentAboutLeftBox}>
                    <div className={classes.departmentAboutBox}>
                        <div className={classes.departmentAboutInnerBox}>
                            <div className={classes.departmentBoxHeader}>About</div>
                            <div className={classes.departmentAboutText}>{readMore ? `${department.about.slice(0, 370)} ...` : department.about}</div>
                            {department.about.length > 370 ?
                            <div className={classes.departmentAboutReadMore}>
                                <button onClick={toggleReadMore} className={classes.departmentReadMoreBtn}>
                                    {readMore ? "Read More" : "Show Less"}
                                </button>
                            </div>:
                            null
                            }
                            
                        </div>
                    </div>
                    <div className={classes.departmentAchievementsBox}>
                        <div className={classes.departmentAchievementsInnerBox}>
                            <div className={classes.departmentBoxHeader}>Achievements</div>
                            <div className={classes.departmentAchievementsList}>
                                {ach!='no-data' && ach.map((item, index) => 
                                    <div key={index} className={classes.departmentAchievementsListItem}>
                                        <div className={classes.departmentAchievementsBullets}>
                                            <div className={classes.departmentAchievementsBulletsCircle}></div>
                                        </div>
                                        <div className={classes.departmentAchievementsText}>{ach[index]}</div>
                                    </div>
                                    )
                                }
                                {department.achievements != '' && JSON.parse(department.achievements).length > 4 ?
                                <div className={classes.departmentAboutReadMore}>
                                    <button onClick={toggleLoadMore} className={classes.departmentReadMoreBtn}>
                                        {loadMore ? "Read More" : "Show Less"}
                                    </button>
                                </div>:
                                null
                                }
                            </div>
                        </div>
                    </div>
                    <div className={classes.departmentLabsBox}>
                        <div className={classes.departmentLabsInnerBox}>
                            <div className={classes.departmentBoxHeader}>Research Labs</div>
                            <div className={classes.departmentLabsList}>
                                <ul style={{columns:rlabs.length>5?2:1}}>
                                    {rlabs!='no data' && rlabs.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.departmentAboutRightBox}>
                    <div className={classes.departmentHODBox}>
                        <div className={classes.departmentHODInnerBox}>
                            <div className={classes.departmentBoxHeader}>HOD</div>
                            <div className={classes.departmentHODCard}>
                                <div className={classes.departmentHODProfilePicBox}>
                                    <div className={classes.departmentHODProfileCircle} style={{
                                        background:`url(${hod.profilePic===null||hod.profilePic===''?`${baseUrl}QuickInfo/jk_profile_pic.png`:hod.profilePic}')`
                                    }}></div>
                                </div>
                                <div className={classes.departmentHODDetails}>
                                    <div className={classes.departmentHODName}>{hod.firstName} {hod.lastName}</div>
                                    <div className={classes.departmentHODContent}>
                                        <div className={classes.departmentHODDept}>{department.name.slice(4,-1)}</div>
                                        <div className={classes.departmentHODPost}>Head of the Department</div>
                                    </div>
                                    <div className={classes.departmentHODEmailBox}>
                                        <AlternateEmailOutlinedIcon className={classes.departmentHODEmailIcon} />
                                        <div className={classes.departmentHODEmailContent}>{hod.email?hod.email:'not available'}</div>
                                    </div>
                                    <div className={classes.departmentHODPhoneBox}>
                                        <AddIcCallOutlinedIcon className={classes.departmentHODPhoneIcon} />
                                        <div className={classes.departmentHODPhoneContent}>{hod.phone?hod.phone:'not available'}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.departmentHODMessageBox}>
                                <div className={classes.departmentHODMessageHeader}>Message from HOD</div>
                                <div className={classes.departmentHODMessageContent}>
                                {readMore1 ? `${department.hod_message.slice(0, 540)} ...` : department.hod_message}
                                </div>
                                    
                                {department.hod_message.length > 540 ?
                                <div className={classes.departmentAboutReadMore}>
                                    <button onClick={toggleReadMore1} className={classes.departmentReadMoreBtn}>
                                        {readMore1 ? "Read More" : "Show Less"}
                                    </button>
                                </div>:
                                null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default DepartmentAbout;
