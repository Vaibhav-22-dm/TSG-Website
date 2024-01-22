import React from "react"
import classes from "../Footer.module.css"
import { Link} from "react-router-dom";
function Sitemap() {
    return (
        <>
            <ul className={classes.quickLinks}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/news">News</Link></li>
                <li><a href="https://erp.iitkgp.ac.in/">ERP</a></li>
                <li><Link to="/quickinfo">Quick Info</Link></li>
            </ul>
        </>
    )
}

export default Sitemap
