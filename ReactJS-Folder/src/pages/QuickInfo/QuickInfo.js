import React from 'react'
import classes from './QuickInfo.module.css'
import HorIcon from './Components/Icon/HorIcon'
import SocietyIcon from './Components/Icon/SocietyIcon'
import DepIcon from './Components/Icon/DepIcon'
import MapIcon from './Components/Icon/MapIcon.js'
import ContactIcon from './Components/Icon/ContactIcon.js'
import QLIcon from './Components/Icon/QLIcon.js'
import CdcIcon from './Components/Icon/CdcIcon.js'
import { Link } from 'react-router-dom';



export default function QuickInfo() {

    return (
        <div className={classes.mainQiLayout}>
            
            <div>
                <h1 className={classes.Qitext}>Quick Info</h1>
            </div>
            <div className={classes.QuickContainer}>
                <Link to='society'><QuickLinksCards label="Societies" IconCom={SocietyIcon} /></Link>
                <Link to='hallofresidance'><QuickLinksCards label="Hall of Residance" IconCom={HorIcon} /></Link>
                <Link to='department'><QuickLinksCards label="Department" IconCom={DepIcon} /></Link>
                <Link to='gc'><QuickLinksCards label="GC Stats" IconCom={MapIcon} /></Link>
                <Link to='contacts'><QuickLinksCards label="Contacts" IconCom={ContactIcon} /></Link>
                <Link to='quicklinks'><QuickLinksCards label="Quick Links" IconCom={QLIcon} /></Link>
                <Link to='cdc'><QuickLinksCards label="CDC Statistics" IconCom={SocietyIcon} /></Link>
                <Link to='grade'><QuickLinksCards label="Grade Distribution" IconCom={CdcIcon} /></Link>
            </div>

        </div>
    )
}


const QuickLinksCards = ({ IconCom, label }) => {
    return (
        <div className={classes.QuickcardContainer}> <IconCom className={classes.Icon} color="black" /> <h3 className={classes.text}>{label}  </h3> </div>
    )
}
