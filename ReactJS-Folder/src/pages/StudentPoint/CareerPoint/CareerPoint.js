import React,{useState}from 'react'
import Header from "./components/Header"
import {default as HeaderNew}  from "../../QuickInfo/Components/Header/Header"
import Card from "./components/Cards"
import classes from "./css/Header.module.css"
function CareerPoint(){
    return(
        <>
        {/* <div className={classes.sph}>Student's Point</div> */}
        <HeaderNew label={'Student\'s Point'} hide={true} />
        <Header/>
        <Card/>
        </>
    )
}
export default CareerPoint