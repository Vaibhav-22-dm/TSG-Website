import React from 'react'
import classes from './DataLoader.module.css'
function DataLoader(props) {
    return (
        <div className={classes.DataLoader}>
            <object  type="image/svg+xml" data="/assets/svgs/dataloader.svg" style={{width:"25em"}}/>
        </div>
    )
}

export default DataLoader
