import React from 'react'
import classes from './css/SocietyTeam.module.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function SocietyTeam({team}) {
    return (
        <>
            <div className={classes.societyTeamContainer}>
                {(team.length===0)?'no data available': team.map((item, index) => (
                    <div className={classes.societyTeamBox} key={index}>
                        <div className={classes.societyTeamCard}>
                            <div className={classes.societyTeamProfilePic}>
                                <div className={classes.societyTeamProfilePicCircle}
                                    style={{
                                        background:`url(http://127.0.0.1:8000/${item.user.profile_pic===null?'http://www.agv.iitkgp.ac.in/images/Team%20Members/harshm.jpg':item.user.profile_pic})`,
                                        backgroundSize:"cover",
                                        backgroundPosition:"center",
                                        backgroundRepeat:"no-repeat"
                                    }}
                                >
                                </div>
                            </div>
                            <div className={classes.societyTeamCardDetails}>
                                <div className={classes.societyTeamMemberName}>{item.user.first_name} {item.user.last_name}</div>
                                <div className={classes.societyTeamMemberPosition}>{item.post}</div>
                                <div className={classes.societyTeamSocialLinks}>
                                    <a href={item.facebookLink===null?'#':item.facebookLink}><FacebookIcon className={classes.societySocialIcon} /></a>
                                    <a href={item.linkedinLink===null?'#':item.linkedinLink}><LinkedInIcon className={classes.societySocialIcon} /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SocietyTeam
