import React from 'react'
import classes from '../Contact.module.css';
function LeftCard(props) {
    return (
        <div className={classes.btnDiv}>
            <div className={classes.card}>
                <button className={`${classes.contactBtn} ${props.isActive===props.value?classes.activeBtn:""}` } onClick={() => props.setIsActive(props.value)}>{props.label}</button>
                <div
                    className={classes.imgContainer}
                    ref={props.imageRef}
                    style={
                        props.isActive === props.value
                            ? { height: "55vh" }
                            : { height: "0px" }
                    }
                >
                    <div className={classes.image}><img alt="ok" src={props.image} /></div>
                </div>
            </div>
        </div>
    )
}

export default LeftCard
