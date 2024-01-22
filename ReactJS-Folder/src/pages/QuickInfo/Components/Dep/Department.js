import React from 'react'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import API from '../../../../api'
import Loader from "../../../../components/DataLoader/Loader"
import { Link } from 'react-router-dom';
import Header from '../Header/Header'
import classes from  './Department.module.css'
import DataLoader from "../../../../components/DataLoader/DataLoader"
import DepartmentAbout from './components/DepartmentAbout'
import DepartmentGallery from './components/DepartmentGallery'
import DepartmentFaculty from './components/DepartmentFaculty'

export default function Department() {
    const { id } = useParams()
    const [department, setDepartment] = useState(null)
    const [loading, setLoading] = useState(true)
    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL
    const [activeTab, setActiveTab] = useState('1')
    const [hod, setHod] = useState(null)
    const [media, setMedia] = useState(null)
    const [faculty, setFaculty] = useState(null)

    useEffect(() => {
        API.get(`quickInfoPages/${id}/?param=dept`)
        .then(res => {
            console.log(res.data)
            setDepartment(res.data["dept"])
            setHod(res.data["hod"])
            setMedia(res.data["media"])
            setFaculty(res.data["faculty"])
            setLoading(false)
        })

    }, [])
    return (
        <>  
            {loading===true? <DataLoader /> : 
            <div>
                <Header label={department.name} />
                <div className={classes.landingLayout}>
                        <div className={classes.departmentCoverPhoto} style={{ background:`url(http://localhost:8000${department.coverPhoto})`}}>
                    </div>
                </div>
                <div className={classes.departmentNavContainer}>
                    <div className={classes.departmentNavBox}>
                        <button onClick={() => {setActiveTab('1')}} className={activeTab==='1'?`${classes.departmentNavItem} ${classes.activeDepartmentTab}`:`${classes.departmentNavItem}`}>About</button>
                        <button onClick={() => {setActiveTab('2')}} className={activeTab==='2'?`${classes.departmentNavItem} ${classes.activeDepartmentTab}`:`${classes.departmentNavItem}`}>Gallery</button>
                        <button onClick={() => {setActiveTab('3')}} className={activeTab==='3'?`${classes.departmentNavItem} ${classes.activeDepartmentTab}`:`${classes.departmentNavItem}`}>Faculty</button>
                    </div>
                </div>
                {activeTab==='1'? <DepartmentAbout department={department} hod={hod}/>:activeTab==='2'? <DepartmentGallery media={media}/>: <DepartmentFaculty  faculty={faculty}/>}
            </div>
            }
        </>
    )
}


