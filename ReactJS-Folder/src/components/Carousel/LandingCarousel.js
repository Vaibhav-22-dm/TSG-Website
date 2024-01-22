import React from 'react';
import Carousel from 'react-material-ui-carousel'
import classes from './Carousel.module.css'
import './FrameworkStyleOverlap.css'

const LandingCarousel = (props) => {

    return (
        <Carousel
            className={classes.carouselLayout}
            indicators={false}
            navButtonsAlwaysVisible={true}
            cycleNavigation={true}
            animation="slide"
            autoPlay={true}
            fullHeightHover={false}
            duration={600}
        >
            {props.children}
        </Carousel>

    )
}

export default LandingCarousel
