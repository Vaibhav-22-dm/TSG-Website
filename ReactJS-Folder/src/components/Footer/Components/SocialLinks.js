import React from 'react'
import classes from '../Footer.module.css'

function SocialLinks() {

    const baseUrl=process.env.REACT_APP_ASSETS_BASEURL;  

    return (
        <>
              <a href="https://www.facebook.com/TSG.IITKharagpur">
                    <img className={classes.socialLinks} src={`${baseUrl}Footer/facebook.svg`} alt="Tsg" />

                </a>
                <a href="https://twitter.com/tsg_iitkgp">
                    <img className={classes.socialLinks} src={`${baseUrl}Footer/twitter.svg`} alt="Tsg" />
                </a>
                <a href="https://www.youtube.com/channel/UCuTNELMlkNfJxAQ2vGJIe5Q">
                    <img className={classes.socialLinks} src={`${baseUrl}Footer/youtube.svg`}alt="Tsg" />

                </a>
                <a href="https://github.com/tsg-iitkgp/tsg-site">
                    <img className={classes.socialLinks} src={`${baseUrl}Footer/github.svg`} alt="Tsg" />

                </a>
        </>
    )
}

export default SocialLinks
