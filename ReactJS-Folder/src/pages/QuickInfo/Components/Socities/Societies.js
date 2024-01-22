import React from 'react'
import Header from '../Header/Header'
import classes from './societies.module.css'
import { useState, useEffect } from 'react'
import API from "../../../../api"
import Loader from "../../../../components/DataLoader/Loader"
import { Link } from 'react-router-dom';


function Societies() {
    const [activeTab, setActiveTab] = useState('1')
    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL
    const [socs, setSocs] = useState([])
    const [loading, setLoading] = useState(true)
    const [rgs, setRgs] = useState([])
    const [tsgs, setTsgs] = useState([])

    useEffect(() => {
        API.get('/soc')
            .then(res => {
                console.log("Api called: ", res.data)
                for (var i = 0; i < res.data.length; i++) {
                    console.log(res.data[i].name)
                    if (res.data[i].type === 'Society' && res.data[i].parentBody === 'TSG')
                        setTsgs(oldArray => [...oldArray, res.data[i]]);
                    else if (res.data[i].type === 'Research Group')
                        setRgs(oldArray => [...oldArray, res.data[i]])
                    else
                        setSocs(oldArray => [...oldArray, res.data[i]])
                }
                console.log(socs)
                setLoading(false)
            })
            .catch(err => { console.log(err) })
    }, [])

    return (
        <div>
            <Header label="Societies" hide={true}/>
            <div className={classes.landingLayout}>
                <img alt="events" src={`${baseUrl}QuickInfo/desktopview/pagebanners/societies.svg`} className={classes.eventSvg} />
                <img alt="events" src={`${baseUrl}QuickInfo/mobileview/pagebanner/societies.svg`} className={classes.eventSvgMobile} />
            </div>
            <div className={classes.societyTabsContainer}>
                <div className={classes.societyTabs}>
                    <button onClick={() => { setActiveTab('1') }} className={classes.societyTab} style={{ "color": `${activeTab === '1' ? "white" : "black"}`, "backgroundColor": `${activeTab === '1' ? "#7694FF" : "transparent"}` }}>Independent</button>
                    <button onClick={() => { setActiveTab('2') }} className={classes.societyTab} style={{ "color": `${activeTab === '2' ? "white" : "black"}`, "backgroundColor": `${activeTab === '2' ? "#7694FF" : "transparent"}` }}>Under TSG</button>
                    <button onClick={() => { setActiveTab('3') }} className={classes.societyTab} style={{ "color": `${activeTab === '3' ? "white" : "black"}`, "backgroundColor": `${activeTab === '3' ? "#7694FF" : "transparent"}` }}>Research Group</button>
                </div>
            </div>

            {loading === true ? <Loader /> :
                <div className={classes.socCardsContainer}>
                    {activeTab === '1' ? socs.map(item =>
                    (
                        <div className={classes.socCard} key={item.id}>
                            <div className={classes.socInnerCard} style={{ background: `url(http://localhost:8000${item.coverPhoto})` }}>
                                <Link to={`../society/${item.id}`} className={classes.socCardOverlay}>{item.name}</Link>
                            </div>
                        </div>
                    )
                    ) :
                        activeTab === '2' ? tsgs.map(item =>
                        (
                            <div className={classes.socCard} key={item.id}>
                                <div className={classes.socInnerCard} style={{ background: `url(http://localhost:8000${item.coverPhoto})` }}>
                                    <Link to={`../society/${item.id}`} className={classes.socCardOverlay}>{item.name}</Link>
                                </div>
                            </div>
                        )
                        ) : rgs.map(item =>
                        (
                            <div className={classes.socCard} key={item.id}>
                                <div className={classes.socInnerCard} style={{ background: `url(${item.coverPhoto})` }}>
                                    <Link to={`../society/${item.id}`} className={classes.socCardOverlay}>{item.name}</Link>
                                </div>
                            </div>
                        )
                        )
                    }
                </div>}
        </div>
    )
}

export default Societies
