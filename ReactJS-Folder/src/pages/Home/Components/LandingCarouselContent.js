import React, { useEffect, useState } from 'react';
import LandingCarousel from '../../../components/Carousel/LandingCarousel';
import './css/Overide.css'
import classes from  './css/Content.module.css'
import API from '../../../api'


const  TestChild=(props)=> {

    var items = [
        {
            imgUrl:"https://raw.githubusercontent.com/TSG-Website/media/c2a387b372b206145a530159eb57d5e1b0240e60/Home/tsg1.svg"
        },
        {
            imgUrl:"https://raw.githubusercontent.com/TSG-Website/media/c2a387b372b206145a530159eb57d5e1b0240e60/Home/tsg.svg"
        }
        
        
    ]
    // var [items,setitems] = useState([])

    // useEffect(() => {
    //     API.get("featuredEvents/").
    //     then(res => {
    //         console.log(res.data)
    //         setitems(res.data)
    //     })

    // })

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