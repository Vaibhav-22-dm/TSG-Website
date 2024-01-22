import React from 'react'
import Header from '../QuickInfo/Components/Header/Header'
import YearCard from "./components/YearCard"
import './css/Header.module.css'
import classes from './css/Header.module.css'
export default function StudentPoint() {
    
    return (
        <>
            {/* <div className={classes.sph}>Student's Point</div> */}
            <Header label={'Student\'s Point'} hide={true} />
            <YearCard/>
        </>
    )
}
