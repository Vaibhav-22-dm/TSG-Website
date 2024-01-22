import DateRangeOutlined from '@mui/icons-material/DateRangeOutlined';
import React from 'react'
import classes from './css/SocietyEvents.module.css';
import InfoIcon from '@mui/icons-material/Info';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function SocietyEvents({events}) {
    // const events = [1, 2, 3, 4, 5, 6, ,7 ,8, 9]
    
    return (
        <div className={classes.societyEventsContainer}>
            {(events.length===0)?'no data available': events.map(item => (
                <div key={item.id} className={classes.societyEventsBox}>
                    <div className={classes.societyEventsCard}   
                        style={{
                            background:`url(http://127.0.0.1:8000/${item.posterImage===null?'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/modern-glossy-music-event-poster-design-template-84d38a706368baec17981e71a5e5810d_screen.jpg?ts=1636991393':item.posterImage})`,
                            backgroundSize:"cover",
                            backgroundPosition:"center",
                            backgroundRepeat:"no-repeat"
                        }}
                    >
                        <div className={classes.societyEventsLogo}>
                        </div>
                        <div className={classes.societyEventsContent}>
                            <div className={classes.societyEventsTitle}>{item.organiser}</div>
                            <div className={classes.societyEventsInfo}>{item.about}<span className={classes.societyEventsMoreInfo}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span></div>
                            <div className={classes.societyEventsButtons}>
                                <Link to={'../../../event/'+item.id} className={classes.societyEventsReadMore}>Read More</Link>
                                <Link to={'../../../event/'+item.id}  className={classes.societyEventsInfoIconBox}><InfoIcon className={classes.societyEventsInfoIcon}></InfoIcon></Link>
                                {/* <div className={classes.societyEventsDateBox}>
                                    <DateRangeOutlined className={classes.societyEventsDateIcon} />
                                    <span className={classes.societyEventsDate}>{item.eventDate.slice(0,-4)}</span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            
        </div>
    )
}

export default SocietyEvents

