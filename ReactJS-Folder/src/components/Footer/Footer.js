import React from 'react'
import Contact from './Components/Contact'
import Sitemap from './Components/Sitemap'
import SocialLinks from './Components/SocialLinks'
import classes from './Footer.module.css'

function Footer() {

    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL  //"https://raw.githubusercontent.com/TSG-Website/media/master/"

    return (
        <div style={{backgroundImage:`url(${baseUrl}Footer/footerbg.png)`}} className={classes.footerContainer}>
            <div className={classes.leftMobileView}>
                <div className={classes.logoContainer}>
                    <img className={classes.logo} src={`${baseUrl}Logos/tsg_logo.png`} alt="Tsg" />
                </div>
                <div className={classes.sitemap}>
                    <Sitemap />
                </div>
            </div>

            <div className={classes.socialContainer}>
                <SocialLinks />
            </div>

            <div className={classes.contact}>
                <Contact />
            </div>
        </div>
    )
}

export default Footer
