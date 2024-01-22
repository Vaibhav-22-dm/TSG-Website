import React from 'react'
import classes from './css/HallCouncil.module.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function HallCouncil({council}) {
    return (
        <>
            <div className={classes.hallCouncilContainer}>
                {council && council.map((item, index) => (
                    <div className={classes.hallCouncilBox} key={index}>
                        <div className={classes.hallCouncilCard}>
                            <div className={classes.hallCouncilProfilePic}>
                                <div className={classes.hallCouncilProfilePicCircle}
                                    style={{
                                        background:`url(${item.user.profilePic===null?'http://www.agv.iitkgp.ac.in/img/Council/dc.jpg':item.user.profilePic})`,
                                        backgroundSize:"cover",
                                        backgroundPosition:"center",
                                        backgroundRepeat:"no-repeat"
                                    }}
                                >
                                </div>
                            </div>
                            <div className={classes.hallCouncilCardDetails}>
                                <div className={classes.hallCouncilMemberName}>{item.user.first_name} {item.user.last_name}</div>
                                <div className={classes.hallCouncilMemberPosition}>{item.post}</div>
                                <div className={classes.hallCouncilSocialLinks}>
                                    <a href={item.facebookLink}><FacebookIcon className={classes.hallSocialIcon} /></a>
                                    <a href={item.linkedinLink}><LinkedInIcon className={classes.hallSocialIcon} /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default HallCouncil
