import React from 'react'
import TestChild from "./LandingCarousel"
import classes from "../css/LandingPage.module.css"
import Cards from "./Cards";
import LatestEvent from "./LatestEvent"
import ControlledAccordions from "./Accordion";
import zoom from "../image/zoom.svg"
import { Link } from 'react-router-dom';
export default function LandingPage(props) {
    console.log(props.data);
    return (
        <>
            <div className={classes.container}>
                <h1 className={classes.hhead}>Events</h1>
                <TestChild />
                <Cards />

                <div className={classes.wrap}>
                    <div className={classes.latestevent}>
                        <h3 className={classes.heading}>LatestEvent</h3>
                        <div className={classes.scroll}>
                            {props.data && 
                                props.data.map((e) => {
                                    return (<LatestEvent name={e.eventName} about={e.about} left={e.daysLeft} poster={e.poster} tag={e.tags[0]} id={e.id} />)
                                })
                            }
                        </div>
                    </div>
                    <div className={classes.result}>
                        <div className={classes.conone}>
                            <div className={classes.text} >Results</div>
                            <div className={classes.image}><Link to="/events/result"><img src={zoom} className={classes.zoom}></img></Link></div>
                        </div>
                        <div className={classes.scroll1}>
                            {props.resultdata &&
                                props.resultdata.map((e, index) => {
                                    return (<ControlledAccordions name={e.eventName} logo={e.logo} organiser={e.organiser} image={e.report} />)
                                })
                            }</div>
                    </div>
                </div>
            </div>
        </>
    )
}