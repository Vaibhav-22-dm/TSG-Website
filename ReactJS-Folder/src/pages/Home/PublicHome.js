
import React, { useState } from 'react'

import classes from './css/Home.module.css'
import LandingCarouselpContent from './Components/LandingCarouselpContent'
import InfiniteCarouselContent from './Components/InfiniteCarouselContent';
import { CssBaseline } from '@mui/material';
import About from './Components/About';
import NewsBulletin from './Components/NewsBulletin';
import Calendar from './Components/Calendar';
import Events from './Components/Events';
import TSGCalender from './Components/NewCalender/TSGCalender';
import HomeGallery from './Components/HomeGallery/HomeGallery';

export default function Home() {
    const [selectedMode, setSelectedMode] = useState({ Date: '25', Day: 'December', Year: '2021' });
    return (

        <div className={classes.HomePageLayout} style={{ marginTop: '20px' }}>
            <CssBaseline />
            <div>
                <div style={{ maxWidth: "1640px", margin: "auto" }}>
                    <div className={classes.CarouselLayoutp}>
                        <LandingCarouselpContent />
                    </div>

                    <div className={classes.contentLayout}>
                        <div className={classes.aboutbg}> </div>
                        <About />
                        <NewsBulletin />
                    </div>


                    <div style={{ marginBottom: "0" }}>
                        <h1 className={classes.akgpText} style={{ margin: "2em" }}>Inspiring Kgpians  </h1>
                    </div>
                    <div className={classes.alumniGallery}>

                        <InfiniteCarouselContent />
                    </div>
                </div>
            </div>
            <div className={classes.calendarLayout}>
                    {/* <Calendar setSelectedMode={setSelectedMode}/> */}
                <TSGCalender />
                {/* <Events selectedMode={selectedMode}/> */}
            </div>
            <div>
                <HomeGallery />
            </div>

        </div >
    )
}

