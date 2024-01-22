import React from 'react'
import classes from './RightCard.module.css'

function RightCard({ data }) {
    return (

        <li className={classes.contactCardLayout}>
            <div className={classes.contactCard}>
                <div className={classes.contactCardContent}>
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "100%", borderBottom: "1px solid black"}}>
                        <div className={classes.contactAvatar}>
                            {/* <img src="https://gymkhana.iitkgp.ac.in/_next/static/images/20MT10064-c8d0def61814215c73bcb3caaf561f92.png" alt="Avatar" /> */}
                        </div>
                        <div style={{ width: "100%" }}>
                            <h2 className={classes.contactCardTitle}>{data.user ? `${data.user.first_name} ${data.user.middle_name} ${data.user.last_name}` : data.name}</h2>
                        </div>
                    </div>
                    <p className={classes.contactText}>
                        {data.post ? data.post : data.designation}
                    </p>
                    <div style={{ width: "100%" }} className={classes.contactNo}>
                        <p> {data.user ? data.user.email : data.email ? data.email : null} </p>
                        <p> {data.user ? data.user.phone : data.phone} </p>


                    </div>
                </div>
            </div>
        </li>
    )
}

export default RightCard
