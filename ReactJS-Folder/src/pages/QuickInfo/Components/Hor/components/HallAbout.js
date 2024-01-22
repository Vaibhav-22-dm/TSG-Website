import React from 'react'
import classes from './css/HallAbout.module.css'
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function HallAbout({hall}) {
    console.log(hall)
    const [readMore , setReadMore] = useState(hall.about.length > 370?true:false)
    const toggleReadMore = () => {
         setReadMore(!readMore);
    }

    const amn = (hall.amenities===null||hall.amenities==='')?'no data':JSON.parse(hall.amenities)
    console.log(amn)
    const acc = (hall.accomMatrix===null||hall.accomMatrix==='')?'no data':JSON.parse(hall.accomMatrix)
    console.log(acc)
    const menu = (hall.messMenu===null||hall.messMenu==='')?'no data':JSON.parse(hall.messMenu)
    console.log(menu)
    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL

    return (
        <>
            <div className={classes.hallAboutContainer}>
                <div className={classes.hallAboutLeftBox}>
                    <div className={classes.hallAboutBox}>
                        <div className={classes.hallAboutInnerBox}>
                            <div className={classes.hallBoxHeader}>About</div>
                            <div className={classes.hallAboutText}>{readMore ? `${hall.about.slice(0, 370)} ...` : hall.about}</div>
                            {hall.about.length > 370 ?
                            <div className={classes.hallAboutReadMore}>
                                <button onClick={toggleReadMore} className={classes.hallReadMoreBtn}>
                                    {readMore ? "Read More" : "Show Less"}
                                </button>
                            </div>:
                            null
                            }
                            
                        </div>
                    </div>
                    <div className={classes.hallAccomodationBox}>
                        <div className={classes.hallAccomodationInnerBox}> 
                            <div className={classes.hallBoxHeader}>Accomodation Matrix</div>
                            <div className={classes.hallAccomodationTableBox}>
                                {acc==='no data'?acc:<table className={classes.hallAccomodationTable}>
                                    <tr>
                                        <td><span></span><span>Single Sharing</span></td>
                                        <td>{acc["Single Rooms"]}</td>
                                    </tr>
                                    <tr>
                                        <td><span></span><span>Double Sharing</span></td>
                                        <td>{acc["Double Rooms"]}</td>
                                    </tr>
                                    <tr>
                                        <td><span></span><span>Triple Sharing</span></td>
                                        <td>{acc["Triple Rooms"]}</td>
                                    </tr>
                                    <tr>
                                        <td><span></span><span>Flats/Four Rooms</span></td>
                                        <td>{acc["Four Rooms"]}</td>
                                    </tr>
                                    <tr>
                                        <td><span></span><span>Guest Rooms</span></td>
                                        <td>{acc["Guest Rooms"]}</td>
                                    </tr>
                                </table>}
                            </div>
                        </div>
                    </div>
                    <div className={classes.hallAmenitiesBox}>
                        <div className={classes.hallAmenitiesInnerBox}>
                            <div className={classes.hallBoxHeader}>Amenities</div>
                            <div className={classes.hallAmenitiesList}>
                                <ul style={{columns:amn.length>5?2:1}}>
                                    {amn==='no data'?amn:amn.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={classes.hallMessMenuBox}>
                        <div className={classes.hallMessMenuInnerBox}>
                            <div className={classes.hallBoxHeader}>Mess Menu</div>
                            <div className={classes.hallMessMenuTableBox}>
                                <table className={classes.hallMessMenuTable}>
                                    <thead>
                                        <tr>
                                            <th>Days</th>
                                            <th colSpan={2}>Breakfast<br></br>(7 am - 9 am)</th>
                                            <th colSpan={2}>Breakfast<br></br>(12 am - 2 am)</th>
                                            <th colSpan={2}>Breakfast<br></br>(4 am - 6 am)</th>
                                            <th colSpan={2}>Breakfast<br></br>(8 am - 10 am)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {menu==='no data'?menu:menu.map((item, index) => (
                                        <tr key={index}>
                                            {menu[index] && menu[index].map((subItem, subIndex) => (
                                                <td key={subIndex}>{subItem}</td>
                                            ))}
                                        </tr>
                                    ))}
                                    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.hallAboutRightBox}>
                    <div className={classes.hallContactBox}>
                        <div className={classes.hallContactInnerBox}>
                            <div className={classes.hallBoxHeader}>Contact</div>
                            <div className={classes.hallContactOfficePhoneBox}>
                                <div className={classes.hallContactHeader}>Office Phone</div>
                                <div className={classes.hallContactCard}>
                                    <AddIcCallOutlinedIcon className={classes.hallContactCardPhoneIcon}/>
                                    <div className={classes.hallContactCardContent}>{hall.officePhone!=null?hall.officePhone:'not available'}</div>
                                </div>
                                <div className={classes.hallContactHeader}>Security Phone</div>
                                <div className={classes.hallContactCard}>
                                    <AddIcCallOutlinedIcon className={classes.hallContactCardPhoneIcon}/>
                                    <div className={classes.hallContactCardContent}>{hall.securityPhone!=null?hall.securityPhone:'not available'}</div>
                                </div>
                                <div className={classes.hallContactHeader}>Mess Phone</div>
                                <div className={classes.hallContactCard}>
                                    <AddIcCallOutlinedIcon className={classes.hallContactCardPhoneIcon}/>
                                    <div className={classes.hallContactCardContent}>{hall.messPhone!=null?hall.messPhone:'not available'}</div>
                                </div>
                                <div className={classes.hallContactEmailBox}>
                                    <AlternateEmailOutlinedIcon className={classes.hallContactCardEmailIcon}/>
                                    <div className={classes.hallContactEmailContent}>{hall.email!=null?hall.email:'not available'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {hall.warden && <div className={classes.hallInchargeCard}>
                        <div className={classes.hallInchargeInnerCard}>
                            <div className={classes.hallInchargeProfilePicBox}>
                                <div className={classes.hallInchargeProfileCircle} style={{
                                    background:`url('${baseUrl}QuickInfo/jk_profile_pic.png')`
                                }}></div>
                            </div>
                            <div className={classes.hallInchargeDetails}>
                                <div className={classes.hallInchargeName}>{hall.warden.firstName} {hall.warden.lastName}</div>
                                <div className={classes.hallInchargeContent}>
                                <div className={classes.hallInchargeDept}></div>
                                    <div className={classes.hallInchargePost}>Wardern</div>
                                </div>
                                <div className={classes.hallInchargeEmailBox}>
                                    <AlternateEmailOutlinedIcon className={classes.hallInchargeEmailIcon} />
                                    <div className={classes.hallInchargeEmailContent}>{hall.warden.email}</div>
                                </div>
                                <div className={classes.hallInchargePhoneBox}>
                                    <AddIcCallOutlinedIcon className={classes.hallInchargePhoneIcon} />
                                    <div className={classes.hallInchargePhoneContent}>{hall.warden.phone}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    {hall.awarden && hall.awarden.map(item => 
                    <div className={classes.hallInchargeCard}>
                        <div className={classes.hallInchargeInnerCard}>
                            <div className={classes.hallInchargeProfilePicBox}>
                                <div className={classes.hallInchargeProfileCircle} style={{
                                    background:`url('${baseUrl}QuickInfo/jk_profile_pic.png')`
                                }}></div>
                            </div>
                            <div className={classes.hallInchargeDetails}>
                                <div className={classes.hallInchargeName}>{item.firstName} {item.lastName}</div>
                                <div className={classes.hallInchargeContent}>
                                    <div className={classes.hallInchargeDept}>{item.department.name}</div>
                                    <div className={classes.hallInchargePost}>Assistant Warden</div>
                                </div>
                                <div className={classes.hallInchargeEmailBox}>
                                    <AlternateEmailOutlinedIcon className={classes.hallInchargeEmailIcon} />
                                    <div className={classes.hallInchargeEmailContent}>{item.email}</div>
                                </div>
                                <div className={classes.hallInchargePhoneBox}>
                                    <AddIcCallOutlinedIcon className={classes.hallInchargePhoneIcon} />
                                    <div className={classes.hallInchargePhoneContent}>{item.phone}</div>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </>
    )
}

export default HallAbout
