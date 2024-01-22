
import React from 'react'
import svg from "../academics.svg"
import cpbt from "../cp icon.svg"
import classes from "../css/Header.module.css"
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <>
            <div className={classes.container}>
                <div className={classes.contone}>
                    <img className={classes.svg} src={svg} />
                </div>
                <div className={classes.contwo}>
                    <div className={classes.content}>
                        <h1 className={classes.heading}>Academic Point</h1>
                        <p className={classes.text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to.</p>
                    </div>
                </div>
                <Link to="/studpoint/careerpoint">
                <img className={classes.cpbutton} src={cpbt} /></Link>

            </div>
        </>
    )
}
