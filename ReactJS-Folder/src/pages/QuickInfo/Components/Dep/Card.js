import React from 'react'
import classes from './profile.module.css'

export default function Card(props) {
    return (
        <div className={classes.Depcard}>
            <img src={props.img} alt="dep" className={classes.cardImg} />
            <div className={classes.titleIm}>
                {props.title}
            </div>
            <div className={classes.darkblur}></div>
        </div>
    )
}
