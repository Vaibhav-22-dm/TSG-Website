import React from 'react'
import classes from '../css/Home.module.css'

function About() {
    return (
        <div className={`${classes.cardsLayout} ${classes.about}`}>
            <p style={{fontSize:"1.3rem",textAlign:"justify"}} className={`${classes.paraabout}`}>
                Technology Student's Gymkhana is the hub of the numerous extra-curricular and co-curricular activities in IIT Kharagpur ranging from sports to socio-cultural. The Gymkhana is managed by the students, for the students, under the guidance and active participation of the faculty and staff members.
                <br /><br />
                The moto of Technology Students' Gymkhana is <b style={{color:"#7694ff"}}>YOGAH KARMASU KAUSALAM</b> which in English means "Perfection in action is Yoga". Our goal is to bring overall development in IITians through cultivating and nurturing their extra-curricular talents.
            </p>
        </div>
    )
}

export default About
