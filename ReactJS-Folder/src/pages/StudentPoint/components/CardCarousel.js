import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React from "react";
import { ClassNames } from '@emotion/react';
import classes from "../css/YearCard.module.css"
import useMediaQuery from '@mui/material/useMediaQuery';
export default function Carousel1(props){
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 720 },
          items: 3
        },
        
        // mobile: {
        //   breakpoint: { max: 464, min: 0 },
        //   items: 1
        // }
      };
      const matches = useMediaQuery('(min-width:720px)');
      
      
      return(
      <div>
        {matches && <Carousel  responsive={responsive} className={classes.container} >
        {props.children}
      </Carousel>}
      {!matches && <div className={classes.container2}>{props.children}</div>}
      </div>)
}