import React from 'react'
import GuideMap from './components/GuideMap'
import classes from './kgpmap.module.css'
import TabMap from './components/TabMap'

function KgpMap() {
    return (
        <div>
            <div className={classes.title}>KGP Map</div>
            <div className={classes.card}>
                <TabMap />
            </div>
        </div>
    )
}

export default KgpMap
