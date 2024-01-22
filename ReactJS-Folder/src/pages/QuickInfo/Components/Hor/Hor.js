import React, {useState, useEffect} from 'react'
// import Header from '../Header/Header';
import { CssBaseline } from "@mui/material";
import classes from "./hor.module.css";
import main from './Images/Main.png'
import Card from './Card';
import dep from './Images/dep.png'
import API from '../../../../api'
import Loader from './Loader';
import { Link } from 'react-router-dom';
import Header from '../Header/Header'

function Hor() {
    const [data, setData] = useState([])
    useEffect(() => {
    API.get('/hall')
    .then(res => {
        console.log(res.data);
        setData(res.data)
    })
    .catch(err => {console.log(err)})}, [])
    
    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL

    return (
        <>
            <div className={classes.horContainer}>
                <Header label="Hall Of Residences"/>
                <div className={classes.landingLayout}>
                    <img alt="events" src={`${baseUrl}QuickInfo/desktopview/pagebanners/hor.svg`} className={classes.eventSvg} />
                    <img alt="events" src={`${baseUrl}QuickInfo/mobileview/pagebanner/hor.svg`} className={classes.eventSvgMobile} />
                </div>
                <div className={classes.horCardsContainer}> 
                {data===null||data.length===0? <Loader /> : data.map(item =>
                    <div className={classes.horCard} key={item.id}>
                        <div className={classes.horInnerCard} style={{ background:`url(http://localhost:8000${item.coverPhoto})`}}>
                            <Link to={`../hallofresidance/${item.id}`} className={classes.horCardOverlay}>{item.name}</Link>
                        </div>
                    </div>
                )}
                </div>
            </div>
            {/* <div className={classes.outermostwrapper}>
                <CssBaseline />
                <div className={classes.mspacetop}>
                    <h1 className={classes.pageHeading}>Hall Of Residence</h1>
                </div>
                <div className={classes.w100}>
                <img src={main} alt="main" className={classes.main} />
                </div>
                {data.length !=0 ? (<div className={classes.cardwrapper}>
                    {data.map(item=>{
                        return <Card key={item.name} img={item.coverPhoto!=null?item.coverPhoto:dep} title={item.name} id={item.id}/>
                    })}
                </div>): <Loader/>}
            </div> */}
        </>
    )
}

export default Hor
