import React from 'react'
import classes from './Header.module.css'
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux'
function AdminHeader(props) {


    let { profile_pic, first_name, middle_name, last_name } = useSelector(state => state.auth.currentUser)

    function checkNull (value) {
        return (value === null) ? "" : value;
    }
    console.log(first_name, middle_name, last_name)
    const oname = `${checkNull(first_name)} ${checkNull(middle_name)} ${checkNull(last_name)}`
   
    return (
        <div className={classes.adminHeader}>
            <h2>{props.label}</h2>

            <div style={{flexDirection:"row-reverse"}} className={classes.OfficialProfile}>

                {!props.hidebtn && <Button style={props.hideBtn?{display:"none"}:{}} onClick={props.btnClickHandler} className={classes.adminAddBtn} variant="contained" >
                    {props.btnLabel}
                </Button>}
                <h4>Welcome {oname !== "" ? oname : "Admin"}</h4>
                <img style={profile_pic === null ? { background: "#7694FF" } : null} {...(profile_pic ? { src: profile_pic } : {})} className={classes.officialImg} alt=''></img>
            </div>
        </div>
    )
}

export default AdminHeader
