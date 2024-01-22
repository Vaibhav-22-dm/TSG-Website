import React from 'react'
import classes from '../Contact.module.css'
import useMediaQuery from '@mui/material/useMediaQuery';

function MidSvg(props) {

    const matches = useMediaQuery('(min-width:5000px)');
 
    console.log(props.width)
    const style=props.width?null:{opacity:"0",width:"0",height:matches?"inherit":"0"};

    return (
        <div style={style} className={classes.screensize}>
            <div className={classes.midImg}>
                <img alt="ok" src={props.image} />
            </div>
        </div>
    )
}

export default MidSvg
