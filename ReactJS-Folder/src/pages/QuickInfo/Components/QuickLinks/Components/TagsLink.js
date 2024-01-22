import React from 'react'
import classes from '../QuickLinks.module.css'
import useMediaQuery from '@mui/material/useMediaQuery';

function TagsLink(props) {

    const matches = useMediaQuery('(min-width:1119px)');

    const linksData=props.data.filter((link)=>link.desc===props.desc);
    
    console.log(props.width)
    const style=props.width?null:{opacity:"0",width:"0",height:matches?"inherit":"0"};

    return (
        <div style={style} className={classes.screensize}>
            <div className={classes.midImg}>
                <img alt="ok" src={props.image} />
            </div>
            <div className={classes.urlContainer}>
                <ul>
                    { linksData.map((item)=> <a  href={item.link}> <li className={classes.links}>{item.name}</li></a> ) }
                </ul>
            </div>
        </div>
    )
}

export default TagsLink
