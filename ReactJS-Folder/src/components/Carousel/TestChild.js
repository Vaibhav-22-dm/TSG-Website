import React from 'react';
import { Button} from '@mui/material'
import classes from './Carousel.module.css'
import './FrameworkStyleOverlap.css'
import LandingCarousel from './LandingCarousel';


const  TestChild=(props)=> {

    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
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
            <h2>{props.item.name}</h2>
            <p>If you are only interested in the transitions</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </div>


    )
}

export default TestChild