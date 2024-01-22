import React from 'react'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import API from '../../../../api'
import Loader from "../../../../components/DataLoader/Loader"
import DataLoader from "../../../../components/DataLoader/DataLoader"
import { Link } from 'react-router-dom';
import Header from '../Header/Header'
import classes from './Society.module.css'
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import SocietyAbout from './components/SocietyAbout'
import SocietyEvents from './components/SocietyEvents'
import SocietyGallery from './components/SocietyGallery'
import SocietyTeam from './components/SocietyTeam'

export default function Society() {

    const { id } = useParams()
    const [society, setSociety] = useState(null)
    const [media, setMedia] = useState(null)
    const [team, setTeam] = useState(null)
    const [loading, setLoading] = useState(true)
    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL
    const [activeTab, setActiveTab] = useState('1')
    const [events, setEvents] = useState(null)
    const [upcomingEvents, setUpcomingEvents] = useState(null)
    useEffect(() => {
        API.get(`quickInfoPages/${id}/?param=soc`)
        .then(res => {
            console.log(res.data)
            setSociety(res.data["society"])
            setMedia(res.data["media"])
            setTeam(res.data["posts"])
            API.get(`/socorrgevents/?param=${res.data["society"].name}&page=1&page_size=10`)
            .then(res => {
                console.log(res.data)
                setEvents(res.data["event_list"])
                console.log(events)
                setUpcomingEvents(res.data["event_list"].slice(0,4))
                console.log(upcomingEvents)
                setLoading(false)
            })
        })

        


    }, [])
    
    return (
        <>
            {loading===true? <DataLoader /> : 
            <div>
                <Header label={society.name} />
                <div className={classes.landingLayout}>
                        <div className={classes.eventSvg} style={{ background:`url(http://localhost:8000${society.coverPhoto})`}}>
                        {/* <img src="https://www.startupurban.com/wp-content/uploads/2021/09/empresario-event-2021.jpg"></img> */}
                    </div>
                </div>
                <div className={classes.societyNavContainer}>
                    <div className={classes.societyLogoBox}>
                        <div className={classes.societyLogoCircle}>
                                <div alt="events" style={{ background:`url(http://localhost:8000${society.logo}) no-repeat`}} className={classes.societyLogo}></div>
                        </div>
                        </div>
                    <div className={classes.societyMenuContainer}>
                        <div className={classes.societyMenuBox}>
                        <button className={classes.societyMenuItem} onClick={() => {setActiveTab('1')}} style={{"color":`${activeTab==='1'?"white":"#9C9C9C"}`, "backgroundColor":`${activeTab==='1'?"#7694FF":"transparent"}`}}>
                                <BookOutlinedIcon />
                                <div className={classes.societyMenuItemName}>About</div>
                            </button>
                            <button className={classes.societyMenuItem} onClick={() => {setActiveTab('2')}} style={{"color":`${activeTab==='2'?"white":"#9C9C9C"}`, "backgroundColor":`${activeTab==='2'?"#7694FF":"transparent"}`}}>
                                <DashboardOutlinedIcon />
                                <div className={classes.societyMenuItemName}>Events</div>
                            </button>
                            <button className={classes.societyMenuItem} onClick={() => {setActiveTab('3')}} style={{"color":`${activeTab==='3'?"white":"#9C9C9C"}`, "backgroundColor":`${activeTab==='3'?"#7694FF":"transparent"}`}}>
                                <PhotoLibraryOutlinedIcon />
                                <div className={classes.societyMenuItemName}>Gallery</div>
                            </button>
                            <button className={classes.societyMenuItem} onClick={() => {setActiveTab('4')}} style={{"color":`${activeTab==='4'?"white":"#9C9C9C"}`, "backgroundColor":`${activeTab==='4'?"#7694FF":"transparent"}`}}>
                                <SupervisorAccountOutlinedIcon />
                                <div className={classes.societyMenuItemName}>Team</div>
                            </button>
                        </div>
                    </div>
                </div>
                {activeTab==='1'? <SocietyAbout society={society} events={upcomingEvents}/>:activeTab==='2'? <SocietyEvents events={events}/>:activeTab==='3'? <SocietyGallery media={media}/>: <SocietyTeam team={team}/>}
            </div>
            }
        </>
        
    )
}

