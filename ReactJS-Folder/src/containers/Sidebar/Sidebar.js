import React from 'react';
import styles from './sidebar.module.css';
import CssBaseline from '@mui/material/CssBaseline';
import Tooltip from '@mui/material/Tooltip';
import { showAdminApp, hideAdminApp } from '../../redux/features/admin'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
    Link, useLocation
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
export default function Sidebar(props) {
    const location = useLocation();
    var page = !props.isAdmin ? location.pathname.split("/")[1] : location.pathname.split("/")[2];
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const fxn = () => {
        console.log("Admin panel clicked ")
        if (isAuth) {
            // Navigate("/tsgadmin/")
            dispatch(showAdminApp())
        } else {
            Navigate("/")
        }
        console.log("/tsgadmin/* route called")
        // return(userType === 'tsgbearer' || userType === 'admin'?tabs[7].desc: "You need to be  Official  in order to view Admin Panel")
    }
    var sidebarex;
    const [open, setOpen] = React.useState(false);
    if (document.getElementById("sidebartobeexpanded"))
        sidebarex = document.getElementById("sidebartobeexpanded").style.width == '250px' ? true : false;
    else
        sidebarex = false;
    const expandSidebar = () => {
        // console.log("Expand sidebar clicked")
        if (!sidebarex) {
            document.getElementById("sidebartobeexpanded").style.width = "250px";
            document.getElementById("sidebartobeexpanded").style.boxShadow = "0px 0px 10px 5px #aaaaaa";
            sidebarex = true;
            setOpen(true);
        } else {
            document.getElementById("sidebartobeexpanded").style.width = "54px";
            sidebarex = false;
            setOpen(false);
        }

    }
    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL;
    return (
        <>
            {/* {console.log(props.tabs)} */}
            <div className={styles.sidebar} id="sidebartobeexpanded">
                <CssBaseline />
                <div className={styles.topblue}>
                    <img onClick={expandSidebar} className={styles.navlogo} src={`${baseUrl}Logos/tsg_logo.png`} alt="Tsg" />
                </div>
                <div className={styles.icons}>
                    <div className={`${styles.icon} ${!open ? styles.jcen : styles.jfe} ${styles.pad15}`} onClick={expandSidebar}>
                        {!open ? <MenuOpenOutlinedIcon /> : <CloseOutlinedIcon />}
                    </div>
                    {props.tabs.map((tab, index) => {
                        var tabClass = styles.icon;
                        console.log("IN sidebar")
                        console.log(page, tab.path.split("/")[props.isAdmin ? 2 : 1])
                        console.log(page == undefined)
                        if (page === tab.path.split("/")[props.isAdmin ? 2 : 1]) {
                            tabClass += " " + styles.activeicon;
                        }
                        if (page == "tsgadmin") {
                            console.log(page)
                            fxn();
                        }
                        return (
                            <Tooltip title={tab.title} key={index} placement="right" arrow>
                                <Link to={tab.path} className={tabClass}>
                                    <div className={`${tabClass} ${styles.jcen} ${styles.pad15}`}>
                                        {tab.icon}
                                    </div>
                                    <div className={styles.tabtitle}>{tab.title}</div>
                                </Link>
                            </Tooltip>
                        )
                    })}
                </div>
                <div className={styles.topblue}></div>
            </div>
        </>
    )
}
