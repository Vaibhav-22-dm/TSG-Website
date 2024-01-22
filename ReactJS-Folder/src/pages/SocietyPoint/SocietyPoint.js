import React from 'react'
import classes from './SocietyPoints.module.css'
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import './Overide.css'
import API from "../../api"
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import DataLoader from "../../components/DataLoader/DataLoader"
import Loader from "../../components/DataLoader/Loader"
import { Link } from 'react-router-dom';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Select } from 'antd'
const { Option } = Select;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}



export default function SocietyPoint() {

    let soc_list = useSelector((state) => state.auth.societyList) 
    // soc_list = soc_list.map((soc) => soc.name);

    const { isAuthenticated, currentUser } = useSelector((state) => state.auth);
    const userType = currentUser?.user_type;
    console.log(soc_list)
    const [events, setEvents] = useState(null)

    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    const [loading, setLoading] = useState(true)


    const handleChange = (event) => {

     
        event= typeof(event) === 'string' ? event.split(',') : event
        // console.log(event)

        setLoading(true)
        var url = event.length != 0 && event!="all" ? `/socorrgevents/?param=${event}` : '/socorrgevents/'
        API.get(url)
            .then(res => {
                console.log(res.data)
                setEvents(res.data["event_list"])
                console.log(events)
                setLoading(false)
            })
            .catch(err => { console.log(err) })
    }


    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL

    useEffect(() => {
        API.get('/socorrgevents/')
            .then(res => {
                console.log(res.data["event_list"])
                setEvents(res.data["event_list"])
                console.log(events)
                setLoading(false)
            })
            .catch(err => { console.log(err) })
    },
        [])

    return (
        <>
            <div className={classes.societyPointContainer}>
                <div className={classes.societyHeader}>
                    <h1>Society Point</h1>
                    {userType === "admin" || userType === "tsgbearer" || userType === "governor" ? <Link to={'../bill/'} className={classes.billButton} variant="contained">
                        <span>Bill Reimbursement</span>
                        <span>$</span>
                    </Link> : null}
                </div>

                <div className={classes.landingLayout}>
                    {/* <div className={classes.eventSvg} style={{background:`url('${baseUrl}SocietyEvents/kgp_event.png')`}}></div> */}
                    <img alt="events" src={`https://raw.githubusercontent.com/TSG-Website/media/462e27cef5f9295dd8c1582eece733c917b1b90c/SocietyEvents/societypoint.svg`} className={classes.eventSvg} />
                    <img alt="events" src={`${baseUrl}QuickInfo/mobileview/pagebanner/societypoint.svg`} className={classes.eventSvgMobile} />
                </div>

                <div id="societySelect" className={classes.contentHeader}>
                    <h1>Upcoming Events</h1>

                    <Select
                        placeholder="Search Society"
                        onChange={handleChange}
                    >
                        <Option key="all" value="all">All</Option>

                        {soc_list && soc_list.map((item) => (
                            <Option key={item.name} value={item.name}>{item.name}</Option>
                        ))}

                    </Select>

                    {/* <FormControl sx={{ m: 3, width: 250 }} className="searchBox">
                            <InputLabel id="demo-multiple-name-label">Name</InputLabel>

                            
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput label="Name" />}
                                MenuProps={MenuProps}
                            > 
                             
                                {soc_list && soc_list.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                        style={getStyles(name, personName, theme)}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}
                </div>
                {loading ? (
                    <Loader />
                ) : events.length===0? <div style={{width:"300px",height:"300px"}}> <img src="https://raw.githubusercontent.com/TSG-Website/media/b41456f206d423d041b7b4e09eaf243990ed3f24/SocietyEvents/nodata.svg" style={{width:"100%",height:"100%"}}/>  </div>: (
                    <div className={classes.eventsListContainer}>
                        {events && events.map((event) =>
                            <div className={classes.eventBox} key={event.id}>
                                <Link to={'/event/' + event.id} className={classes.innerEventBox}
                                    style={{
                                        background: `url(${event.posterImage ? 'http://127.0.0.1:8000/'+event.posterImage : 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/modern-glossy-music-event-poster-design-template-84d38a706368baec17981e71a5e5810d_screen.jpg?ts=1636991393'})`,
                                        backgroundSize: "100%", backgroundRepeat: "no-repeat"
                                    }}
                                >
                                    <div className={classes.eventOrganiserLogo}>
                                        <div className={classes.eventOrganiserLogoIcon}>
                                            <img className={classes.eventOrganiserLogoImage} src="https://raw.githubusercontent.com/TSG-Website/media/master/Logos/tsg_logo.png"></img>
                                        </div>
                                    </div>
                                    <div className={classes.eventInfo}>
                                        <div className={classes.eventTitle}>{event.eventName.slice(0,30) + '...'}</div>
                                        <div className={classes.eventOrganiser}>{event.organiser}</div>
                                        <div className={classes.eventDateTime}>
                                            <div className={classes.eventDate}>
                                                <DateRangeIcon className={classes.eventDateIcon} />
                                                <span className={classes.eventDateText}>{event.eventDate}<span className={classes.eventTimeHidden}> | {event.eventTime}</span></span>
                                            </div>
                                            <div className={classes.eventTime}>
                                                <AccessTimeIcon className={classes.eventDateIcon} />
                                                <span className={classes.eventTimeText}>{event.eventTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>)}
            </div>
        </>
    )
}

