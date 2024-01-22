import React from 'react';
import LandingCarousel from '../../../components/Carousel/LandingCarousel';

import classes from  '../css/LandingCarousel.module.css'


const  TestChild=(props)=> {

    var items = [
        {
            imgUrl:"./assets/images/home/welcome.svg"
        },
        {
            imgUrl:"./assets/images/home/welcome.svg"
        }
        
        
    ]

    return (

        <LandingCarousel>
            { items.map((item, i) => <Item key={i} item={item} />) }
        </LandingCarousel>

    )
}

function Item(props) {
    return (
        <div className={classes.contentLayout}>
           <div style={{backgroundImage:`url(${props.item.imgUrl})`}} className={classes.welcomeSvg}> </div>
        </div>
    )
}

export default TestChild