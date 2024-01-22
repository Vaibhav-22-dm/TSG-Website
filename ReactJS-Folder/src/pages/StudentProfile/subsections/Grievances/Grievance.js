import React, { useState } from 'react'
import classes from '../../profile.module.css'
import { CssBaseline } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TuneIcon from '@mui/icons-material/Tune';
import RefreshIcon from '@mui/icons-material/Refresh';
import GrievList from './GrievList';
import AddGrievForm from './AddGrievForm';
import { Modal } from 'antd';
import { Link } from "react-router-dom";
export default function Grievance(props) {
    Date.prototype.toShortFormat = function () {

        let monthNames = ["Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug",
            "Sep", "Oct", "Nov", "Dec"];

        let day = this.getDate();

        let monthIndex = this.getMonth();
        let monthName = monthNames[monthIndex];

        let year = this.getFullYear();

        return `${day}, ${monthName} ${year}`;
    }
    let today = new Date();
    const [showModel, setshowModel] = useState(false);
    return (
        <>
            <div className={classes.outermostwrapper}>
                <CssBaseline />
                <Modal centered={true} closable={false} footer={<></>} visible={showModel} onCancel={() => setshowModel(false)}>
                    {/* <SendNotification setshowModel={setshowModel} /> */}
                    <AddGrievForm setshowModel={setshowModel} />
                </Modal>
                <div className={`${classes.dflex} ${classes.acen} ${classes.mspacetop} ${classes.jspace}`}>
                    <h1 className={classes.pageHeading}>Grievance/Complaints</h1>
                    <Link to='/profile'><div className={classes.broundbtn}><ArrowBackIcon /></div></Link>
                </div>
                <div className={`${classes.dflex} ${classes.acen} ${classes.mspacetop} ${classes.jspace}`}>
                    <div className={classes.btn} onClick={() => setshowModel(true)}>New Grievance/Complaint</div>
                    <div className={`${classes.dflex}`}>
                        <div className={classes.datebox}>{today.toShortFormat()}</div>
                        <div className={classes.broundbtn}><TuneIcon /></div>
                        <div className={classes.broundbtn}><RefreshIcon /></div>
                    </div>
                </div>
                <GrievList />
            </div>
        </>
    )
}
