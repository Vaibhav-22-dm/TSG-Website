import React from 'react'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import API from '../../../../api'
import Loader from "../../../../components/DataLoader/Loader"
import { Link } from 'react-router-dom';
import Header from '../Header/Header'
import classes from  './Hall.module.css'
import DataLoader from "../../../../components/DataLoader/DataLoader"
import HallAbout from './components/HallAbout'
import HallGallery from './components/HallGallery'
import HallCouncil from './components/HallCouncil'

export default function Hall() {
    const { id } = useParams()
    const [hall, setHall] = useState(null)
    const [media, setMedia] = useState(null)
    const [council, setCouncil] = useState(null)
    const [loading, setLoading] = useState(true)
    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL
    const [activeTab, setActiveTab] = useState('1')

    useEffect(() => {
        API.get(`quickInfoPages/${id}/?param=hall`)
        .then(res => {
            console.log(res.data)
            console.log(res.data['hall'])
            setHall(res.data['hall'])
            setMedia(res.data['media'])
            setCouncil(res.data['posts'])
            setLoading(false)
        })

    }, [])
    return (
        <>  
            {loading===true? <DataLoader /> : 
            <div>
                <Header label={hall.name} />
                <div className={classes.landingLayout}>
                        <div className={classes.hallCoverPhoto} style={{ background:`url(http://localhost:8000${hall.coverPhoto})`}}>
                    </div>
                </div>
                <div className={classes.hallNavContainer}>
                    <div className={classes.hallNavBox}>
                        <button onClick={() => {setActiveTab('1')}} className={activeTab==='1'?`${classes.hallNavItem} ${classes.activeHallTab}`:`${classes.hallNavItem}`}>About</button>
                        <button onClick={() => {setActiveTab('2')}} className={activeTab==='2'?`${classes.hallNavItem} ${classes.activeHallTab}`:`${classes.hallNavItem}`}>Gallery</button>
                        <button onClick={() => {setActiveTab('3')}} className={activeTab==='3'?`${classes.hallNavItem} ${classes.activeHallTab}`:`${classes.hallNavItem}`}>Council</button>
                    </div>
                </div>
                {activeTab==='1'? <HallAbout hall={hall} />:activeTab==='2'? <HallGallery media={media}/>: <HallCouncil  council={council}/>}
            </div>
            }
        </>
    )
}


