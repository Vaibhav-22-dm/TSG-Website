import React, { useState, useEffect } from "react";
import classes from "./profile.module.css";
import { CssBaseline } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import StudentInfo from "./subsections/SudentInfo";
import Nameroll from "./subsections/Nameroll";
import About from "./subsections/About";
import Achievements from "./subsections/Achievements";
import Projects from "./subsections/Projects";
import Quickreport from "./subsections/Quickreport";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import data from "./Data";
import API from '../../api/index';
import { useSelector, useDispatch } from 'react-redux'
import { getStudentData } from '../../redux/features/studentprofile/'
import Grievance from "./subsections/Grievances/Grievance";
import { Link } from "react-router-dom";
export default function StudentProfile(props) {
    const { nameroll, info, about, achievementsdummy, projectsdummy, societydummy } = data();
    // const [achievements, setachievements] = useState(null)
    const matches = useMediaQuery("(min-width:600px)");
    const userData = useSelector((state) => state.student.userdata)
    const token = useSelector((state) => state.auth.token)
    const loading = useSelector((state) => state.student.loading)
    const userID = useSelector((state) => state.auth.currentUser.id)
    const cv = useSelector((state) => state.auth.currentUser.cv)
    // console.log(userData)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getStudentData())
    }, [])
    return (
        <>
            <div className={classes.outermostwrapper}>
                <CssBaseline />
                {matches && (
                    <div className={`${classes.dflex} ${classes.acen} ${classes.mspacetop} ${classes.jspace}`}>
                        <h1 className={classes.pageHeading}>Student Profile</h1>
                        <Link to='/profile/grievances'><div className={classes.btn} >Raise a Grievance/Complaint</div></Link>
                    </div>
                )}
                <div className={`${classes.card} ${classes.eqspace20} ${classes.dflex} ${classes.twodivw}`}>
                    <div className={`${classes.fb50} ${classes.pad20}`}>
                        <Nameroll info={nameroll} loading={loading} />
                    </div>
                    <div
                        className={`${classes.infoWrapper} ${classes.fg1} ${classes.sp_right} ${classes.padlr20}`}
                    >
                        <StudentInfo info={info} />
                    </div>
                </div>
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 1100: 2 }}>
                    <Masonry gutter="20px">
                        <About info={about} loading={loading} userid={userID} societies={userData ? userData.posts : societydummy} socs={userData ? userData.socorhall_list : 0} />
                        {achievementsdummy && <Achievements loading={loading} info={userData != null ? userData.achievements : achievementsdummy} />}
                        <Projects loading={loading} data={userData != null ? userData.projects : projectsdummy} token={token} />
                        <Quickreport cv={cv} />
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </>
    );
}
