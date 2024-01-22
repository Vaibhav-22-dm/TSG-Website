import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import classes from './Carousel.module.css'

function InfiniteCarousel(props) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    largerdesktop:{
      breakpoint: { max: 3000, min: 1400 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1400, min: 1124 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1124, min: 864 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 864, min: 0 },
      items: 1
    }
  };

  return (
    <div>
      <Carousel
        className={classes.InfinitecarouselLayout}
        swipeable={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        removeArrowOnDeviceType={["tablet", "mobile", "desktop","largerdesktop"]}
        responsive={responsive}>
        {props.children}

      </Carousel>
    </div>
  )
}

export default InfiniteCarousel