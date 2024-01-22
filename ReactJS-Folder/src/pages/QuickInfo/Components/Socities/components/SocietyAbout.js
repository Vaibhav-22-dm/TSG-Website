import React from 'react'
import classes from './css/SocietyAbout.module.css'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useRef } from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneIcon from '@mui/icons-material/Phone';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';

function SocietyAbout({society, events}) {
    const [readMore , setReadMore] = useState(true)
    // if(society.about && society.about.length > 370) console.log('exceeded')
    const toggleReadMore = () => {
         setReadMore(!readMore);
    }
    const [people, setPeople] = useState(society.people === "" ? null : JSON.parse(society.people))
    // console.log(JSON.parse(society.people))
    
    return (
        <div className={classes.societyAboutContainer}>
            <div className={classes.societyAboutBox}>
                <div className={classes.societyAbout}>
                    <div className={classes.societyAboutHeader}>
                        About
                    </div>
                    <div className={classes.societyAboutText}>
                        {readMore ? `${society.about.slice(0, 370)} ...` : society.about}
                    </div>
                    {society.about.length > 370 ?
                        <div className={classes.societyReadMoreBox}>
                            <button onClick={toggleReadMore} className={classes.societyReadMoreBtn}>
                                {readMore ? "Read More" : "Show Less"}
                            </button>
                        </div>:
                        null
                    }
                </div>
                <div className={classes.societyFounders}>
                    <div className={classes.societyFoundersHeader}>
                        Founders &amp;  Governor
                    </div>
                    <div className={classes.societyFoundersCardsBox}>
                        {people===null||people.length===0?'no data available': people.map((item, index) => (    
                        <div className={classes.societyFoundersCard} key={index}>
                            <div className={classes.societyFounder}>
                                <div className={classes.societyFounderPic}>
                                    <div className={classes.societyFounderCircle} style={{"background":`url(${item.profilePic===''?'http://www.agv.iitkgp.ac.in/images/Team%20Members/Founders/srinivas.jpg':item.profilePic})`}}></div>
                                </div>
                                <div className={classes.societyFounderText}>
                                    <div className={classes.societyFounderName}>{item.name}</div>
                                    <div className={classes.societyFounderPosition}>{item.post}</div>
                                    <div className={classes.societyFounderSocialIcons}>
                                        <a href="#" target="_blank" className={classes.societySocialLink}> <FacebookIcon className={classes.societyFb}></FacebookIcon> </a>
                                        <a href="#" target="_blank" className={classes.societySocialLink}> <LinkedInIcon className={classes.societyFb}></LinkedInIcon> </a>                      
                                        <a href="#" target="_blank" className={classes.societySocialLink}> <TwitterIcon className={classes.societyFb}></TwitterIcon> </a>                      
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className={classes.societyTaglineBox}>
                        <div className={classes.societyFoundersHeader} style={{"paddingTop":"10px"}}>
                            Tagline
                        </div>  
                        <div className={classes.societyTaglineText} style={{"paddingBottom":"10px"}}>"{society.tagline}"</div>
                    </div>
                </div>
            </div>
            <div className={classes.societyContactBox}>
                <div className={classes.societyContact}>
                    <div className={classes.societyContactHeader}>Contact Info</div>
                    <div className={classes.societyContactDetails}>
                        <div className={classes.societyContactPhone}>
                            <a href={`#`} className={classes.societyContactLink}>
                                <PhoneIcon className={classes.societyFb}></PhoneIcon>
                            </a>
                            <span> {society.phone===null?'Not Avaiable': society.phone} </span>
                        </div>
                        <div className={classes.societyContactPhone}>
                            <a href={`#`}  className={classes.societyContactLink}>
                                <MailOutlineIcon className={classes.societyFb}></MailOutlineIcon>
                            </a> 
                            <span>{society.email===null?'Not Avaiable': society.email}</span>
                        </div>
                        
                    </div>
                    <div className={classes.societyContactSocialIcons}>
                        {society.facebookLink && <a href={society.facebookLink} target="_blank" className={classes.societySocialLink}> <FacebookIcon className={classes.societyFb}></FacebookIcon> </a>}
                        {society.instagramLink && <a href={society.instagramLink} target="_blank" className={classes.societySocialLink}> <InstagramIcon className={classes.societyFb}></InstagramIcon> </a>}
                        {society.linkedinLink && <a href={society.linkedinLink} target="_blank" className={classes.societySocialLink}> <LinkedInIcon className={classes.societyFb}></LinkedInIcon> </a>}
                        {society.twitterLink && <a href={society.twitterLink} target="_blank" className={classes.societySocialLink}> <TwitterIcon className={classes.societyFb}></TwitterIcon> </a>}
                        {society.youtubeLink && <a href={society.youtubeLink} target="_blank" className={classes.societySocialLink}> <YouTubeIcon className={classes.societyFb}></YouTubeIcon> </a>}
                        {society.websiteLink && <a href={society.websiteLink} target="_blank" className={classes.societySocialLink}> <LanguageIcon className={classes.societyFb}></LanguageIcon> </a>}
                        {society.githubLink && <a href={society.githubLink} target="_blank" className={classes.societySocialLink}> <GitHubIcon className={classes.societyFb}></GitHubIcon> </a>}
                    </div>
                </div>
                <div className={classes.societyEvents}>
                    <div className={classes.societyFoundersHeader}>
                        Upcoming Events
                    </div>
                    <div className={classes.societyEventsBox}>
                        {(events.length===0)?'no data available': events.map(item => (
                            <Link to={'../../event/'+item.id} className={classes.societyEvent} key={item.id}>
                                <div className={classes.societyEventTitle}>{item.eventName}</div>
                                {/* <div className={classes.societyEventDate}>
                                    <DateRangeOutlinedIcon />
                                    <div>{item.eventDate.slice(0,-4)}</div>
                                </div> */}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SocietyAbout
