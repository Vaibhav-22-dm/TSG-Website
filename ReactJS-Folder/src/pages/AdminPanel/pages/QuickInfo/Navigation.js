import React, { useState, useEffect } from 'react'
import classes from './navigation.module.css'
import HorIcon from './Icon/HorIcon'
import func from './data';
import { useLocation, Link } from 'react-router-dom'
export default function Navigation() {
    const location = useLocation();
    const [active, setActive] = React.useState(0);
    var path = location.pathname.split('/')[3];
    useEffect(() => {
        path = location.pathname.split('/')[3];
        console.log("path = " + path);
        var activeidx = -1;
    }, [location])
    const data = func('2rem');
    return (
        <div className={classes.outermostwrapper}>
            <div className={classes.iconscontainer}>
                {data.map((item, index) => (
                    <Link to={item.route}>
                        <div className={`${classes.iconwrapper} ${item.route.split('/')[3] == path ? classes.bluebg : ""}`}>
                            {console.log(item.route.split('/')[3])}
                            {console.log("condition", path)}
                            {item.route.split('/')[3] == path ? item.activeicon : item.icon}
                            <div className={`${classes.navname} ${item.route.split('/')[3] == path ? classes.whitetxt : ""}`}>
                                {item.title}
                            </div>
                        </div>
                    </Link>))}
            </div>
        </div>
    )
}
