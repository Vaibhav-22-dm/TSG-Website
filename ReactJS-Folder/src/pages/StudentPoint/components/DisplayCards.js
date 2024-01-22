import React from 'react'


import Courserender from './CourseRender'

import Carousel1 from "./CardCarousel"
function DisplayCards(props)
{
    return(
        <>
        {!props.Year &&<Carousel1 children={props.a} />}
    {props.Year && <Courserender year={props.Year} back={props.Back} course={props.course} department={props.department} />}
        </>
    )
}
export default DisplayCards;