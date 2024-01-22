import React from 'react'
import classes from '../Footer.module.css'

function Contact() {

    const baseUrl=process.env.REACT_APP_ASSETS_BASEURL;  

    return (
        <>
            <div className={classes.contactInfo}>

                <ul className={classes.contactus}>
                    <li>+91 32000 2 21111</li>
                    <li><a href="mailto:tsg@iitkgp.ac.in">tsg@iitkgp.ac.in</a></li>
                    <li>Technology Students' Gymkhana</li>
                    <li><a href="http://www.iitkgp.ac.in/">IIT Kharagpur, Kharagpur</a></li>
                    <li>West Bengal - 721302</li>
                </ul>

            </div>
            
            <div className={classes.contactImg}>
                <img className={classes.contactpng} src={`${baseUrl}Footer/contact.png`} alt="Tsg" />
            </div>


        </>
    )
}

export default Contact
