import React from 'react'
import classes from './PageNotFound.module.css'
function PageNotFound() {

    const baseUrl=process.env.REACT_APP_ASSETS_BASEURL;  
    return (
        <div className={classes.PageNotFound}>
            <img style={{width:"21em"}} src={`${baseUrl}404/404.svg`} ></img>
        </div>
    )
}

export default PageNotFound
