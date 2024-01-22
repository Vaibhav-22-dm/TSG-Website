import React from 'react'
import classes from './css/Content.module.css'

function AlumniCard(props) {

    const baseUrl=process.env.REACT_APP_ASSETS_BASEURL;  

    return (
        <div style={{backgroundImage:`url(${baseUrl}Home/alumnibg.png)`}}className={classes.AlumniCards}>
            <div style={{ backgroundImage: `url(${props.alumniImg})` }} className={classes.AlumniImg}></div>
            <div className={classes.AlumniRightSide}>
                <h2 className={classes.AlumniName}> {props.name} </h2>
                <h3 className={classes.AlumniDes}> {props.designation}</h3>
                <h3 className={classes.AlumniDeg}> {props.degree}</h3>
                {/* <div style={{ backgroundImage: `url(${props.logo})` }} className={classes.CompanyLogo}></div> */}
                <div className={classes.logoContainer}>
                    <img className={classes.logo} alt="logo" src={props.logo}/>
                </div>
            </div>
        </div>
    )
}

export default AlumniCard
