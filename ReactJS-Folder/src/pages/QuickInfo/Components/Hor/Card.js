import React from 'react'
import classes from './hor.module.css'
import { Link } from 'react-router-dom';

export default function Card(props) {
    return (
        <Link to={'./'+props.id} className={classes.Depcard}>
            <img src={props.img} alt="dep" className={classes.cardImg} />
            <div className={classes.titleIm}>
                {props.title}
            </div>
            <div className={classes.darkblur}></div>
        </Link>
    )
}
