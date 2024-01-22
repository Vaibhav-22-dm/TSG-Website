import React from 'react'
import RightCard from './RightCard'

function CardsContainer(props) {
    console.log(props.data)
    return (
        <>
            {
                props.data?.map((data,index) => {
                    return(
                    <RightCard key={index} data={data} />
                    )
                })
            }
        </>


    )
}

export default CardsContainer
