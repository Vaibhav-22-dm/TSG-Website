import React from 'react';
import classes from  '../css/Cards.module.css';
import technology from "../image/technology.svg"
import tech from "../image/tech.svg"
import culture from "../image/culture.svg"
import sports from "../image/sports.svg"
import welfare from "../image/welfare.svg"
import { Link } from 'react-router-dom';
function Cards (){
    return(
        <div className={classes.container}>
        <Link to="/events/technology">
        <div className={classes.card}>
        <img  className={classes.image} src={technology}/>
      
        <h3 className={classes.heading}>Technology</h3>
        </div></Link>
        <Link to="/events/social">
        <div className={classes.card}>
        <img  className={classes.image} src={culture}/>
       
        <h3 className={classes.heading}>Social/Culture</h3>
        </div></Link>
        <Link to="/events/sports">
        <div className={classes.card}>
        <img  className={classes.image} src={sports}/>
      
        <h3 className={classes.heading}>Sports & Games</h3>
        </div> </Link>
        <Link to="/events/welfare">
         <div className={classes.card}>
        <img  className={classes.image} src={welfare}/>
        
        <h3 className={classes.heading}>Student Welfare</h3>
        </div></Link>
        
        </div>
    )
}
export default Cards;
