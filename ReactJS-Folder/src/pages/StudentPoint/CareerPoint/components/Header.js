import React from 'react'
import icon from "../images/icon.svg"
import apbutton from "../images/apbutton.svg"
import classes from "../css/Header.module.css"
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <>
            <div className={classes.container}>

                <Link to="/studpoint">
                    <img className={classes.apbutton} src={apbutton} /></Link>

                <div className={classes.fone}>
                    <div className={classes.content}>
                        <h1 className={classes.heading}>Career Point</h1>
                        <p className={classes.text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to.</p>
                    </div>

                    <img className={classes.icon} src={icon} />
                </div>

            </div>
        </>
    )
}
