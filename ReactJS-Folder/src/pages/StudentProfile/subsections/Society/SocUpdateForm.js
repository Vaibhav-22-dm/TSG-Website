import React, { useState } from 'react'
import classes from '../../profile.module.css'
export default function SocUpdateForm(props) {
    const [por, setPor] = useState(props.por);
    const handleSubmit = (e) => {  
        e.preventDefault(); 
        props.handleSubmit(por, props.id);
    }
    return (
        <>
            <div className={`${classes.socupform} ${classes.dflex} ${classes.fdc}`}>
                <div>Position of Responsibility <span className={classes.redtxt}> *</span></div>
                <form className={classes.socacform} onSubmit={handleSubmit}>
                    <input type="text" style={{marginBottom: "0px"}} value={por} onChange={(e)=>setPor(e.target.value)} className={classes.socinput} />
                    <input type='submit' value={"Update"}  className={classes.updatebtn}/>
                </form>

            </div>
        </>
    )
}
