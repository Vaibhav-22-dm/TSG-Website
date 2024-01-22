import React, {useState, useEffect} from 'react'
// import Header from '../Header/Header';
import { CssBaseline } from "@mui/material";
// import classes from "./profile.module.css";
import classes from './Dep.module.css';
import main from './Images/Main.png'
import mainmob from './Images/Mainmob.png'
import Card from './Card';
import dep from './Images/dep.png'
import API from '../../../../api'
import useMediaQuery from '@mui/material/useMediaQuery';
import Loader from './Loader'
import { Link } from 'react-router-dom';
import Header from '../Header/Header'

function Dep() {
    const [data, setData] = useState([])
    // const matches = useMediaQuery('(min-width:600px)');
    useEffect(() => {
    API.get('/department')
    .then(res => {
        console.log(res.data)
        setData(res.data)
    })
    .catch(err => {console.log(err)})}, [])
    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL

    return (
        <>
            <div className={classes.deptContainer}>
                <Header label="Departments"/>
                <div className={classes.landingLayout}>
                    <img alt="events" src={`${baseUrl}QuickInfo/desktopview/pagebanners/departments.svg`} className={classes.eventSvg} />
                    <img alt="events" src={`${baseUrl}QuickInfo/mobileview/pagebanner/departments.svg`} className={classes.eventSvgMobile} />
                </div>
                <div className={classes.deptCardsContainer}> 
                {data===null||data.length===0? <Loader /> : data.map(item =>
                    <div className={classes.deptCard} key={item.id}>
                        <div className={classes.deptInnerCard} style={{ background: `url(${item.coverPhoto === null ? `${baseUrl}QuickInfo/azad_hall.png` :'http://localhost:8000'+item.coverPhoto})`}}>
                            <Link to={`../department/${item.id}`} className={classes.deptCardOverlay}>{item.name}</Link>
                        </div>
                    </div>
                )}
                </div>
            </div>
            {/* <div className={classes.outermostwrapper}>
                <CssBaseline />
                <div className={classes.mspacetop }>
                    <h1 className={classes.pageHeading}>Department</h1>
                </div>
                <div className={`${classes.w100} ${classes.imgwrap}`}>
                    <img src={matches? main:mainmob} alt="main" className={classes.main} />
                </div>
                {data.length!=0 ? (<div className={classes.cardwrapper}>
                    {data.map(item=>{
                        return <Card key={item.name} img={dep} title={item.name.slice(5)}/>
                    })}
                </div>):<Loader/>}
            </div> */}
        </>
    )
}

export default Dep
