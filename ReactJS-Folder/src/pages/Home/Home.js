import React, { useState } from 'react'
import Button from '@mui/material/Button';
import classes from './css/Home.module.css'
import LandingCarouselContent from './Components/LandingCarouselContent'
import InfiniteCarouselContent from './Components/InfiniteCarouselContent';
import { CssBaseline } from '@mui/material';
import About from './Components/About';
import NewsBulletin from './Components/NewsBulletin';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/features/login/loginThunk'
import { TailSpin } from 'react-loading-icons'
import Calendar from './Components/Calendar';
import Events from './Components/Events';
import TSGCalender from './Components/NewCalender/TSGCalender';
import HomeGallery from './Components/HomeGallery/HomeGallery'

export default function Home() {

    const currentState = useSelector((state) => state.auth)

    const { loading } = currentState
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    const matches = useMediaQuery('(min-width:600px)');
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    


    const [selectedMode, setSelectedMode] = useState({ Date: dd, Day: mm, Year: yyyy });

    return (

        <div className={classes.HomePageLayout}>
            <CssBaseline />

            <div style={!matches === true ? { paddingTop: "1em" } : {}} className={classes.HomeHeaderLayout}>
                {matches && (
                    <>
                        <div>
                            <h1 className={classes.HomeText}>Home  </h1>
                        </div>
                        <div>
                            <Button onClick={logoutHandler} className={classes.LoginButton} variant="contained" >

                                {loading && (
                                    <div className={classes.buttonContainer}>
                                        <TailSpin width="20" height="20" />
                                    </div>

                                )}
                                {loading && <span>Logout</span>}
                                {!loading && <span>Logout</span>}


                            </Button>
                        </div>
                    </>
                )}
            </div>

            <div>
                <div style={{ maxWidth: "1450px", margin: "auto" }}>
                    <div className={classes.CarouselLayout}>
                        <LandingCarouselContent />
                    </div>

                    <div className={classes.contentLayout}>
                        <div className={classes.aboutbg}> </div>
                        <About />
                        <NewsBulletin />
                    </div>


                    <div style={{ marginBottom: "0" }}>
                        <h1 className={classes.akgpText} style={{ margin: "2em" }}>Inspiring Kgpians  </h1>
                    </div>
                    <div className={classes.alumniGallery} style={{ marginTop: "0em" }}>
                        <InfiniteCarouselContent />
                    </div>
                </div>
            </div>


            <div className={classes.calendarLayout}>
                {/* <Calendar setSelectedMode={setSelectedMode} />
                <Events selectedMode={selectedMode} /> */}
                <TSGCalender />
            </div>
            <div>
                <HomeGallery />
            </div>
        </div>
    )
}
