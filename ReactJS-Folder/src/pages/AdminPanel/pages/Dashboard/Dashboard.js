import React, { useState, useEffect } from 'react'
import AdminHeader from '../../Components/Table/Header/Header'
import {
    Table,
    Modal,
    Row
} from 'antd';
import useMediaQuery from "@mui/material/useMediaQuery";

import { useSelector } from 'react-redux';
import API from '../../../../api/'
import classes from './DashBoard.module.css'
import { Tabs } from 'antd';
import Grievences from './Grievences/Grievences';
import BillR from './BillR/BillR'
import SendNotification from './Notification/Notification';
const { TabPane } = Tabs;

function Dashboard() {

    const matches = useMediaQuery("(max-width:1040px)");
     const userType = useSelector(state => state.auth.currentUser.user_type);

    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL
    const token = useSelector(state => state.auth.token)
    const [activityLoading, setactivityLoading] = useState(false)
    const [activityCount, setactivityCount] = useState(2);
    const [activityData, setActivityData] = useState([])
    const [showModel, setshowModel] = useState(false)

    useEffect(() => {
        getActivityData(1, 14)
    }, [])


    function callback(key) {
        console.log(key);
    }

    const showNModelHandler = () => {
        setshowModel(true)
    }


    const getActivityData = (pageNum, pageSize) => {

        const body = {
            token: token,
            page_size: pageSize,
        }

        setactivityLoading(true)
        API.post(`/activity/all/?page=${pageNum}`, body).then((res) => {


            setactivityCount(res.data.count)

            const data = res.data.results.map((item) => {
                var utcDate = item.date; // ISO-8601 formatted date returned from server
                var localDate = new Date(utcDate);
                localDate = localDate.toString();
                let datetime = localDate.split(" ");
                let day = datetime[0];
                let month = datetime[1];
                let year = datetime[3].slice(2, 4);
                let time = datetime[4].slice(0, 5);
                let hours = time.slice(0, 2);
                let minutes = time.slice(3, 5);
                var newformat = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12;
                item['date'] = `${day} \xa0 ${hours}:${minutes} ${newformat} \xa0 ${datetime[2]} ${month} ${year}`
                return {
                    name: item.user.first_name ? `${item.user.first_name} ${item.user.last_name}` : "",
                    time: item.date,
                    updates: item.remarks,
                    post: item.user.user_type
                }

            })

            setactivityLoading(false)
            setActivityData(data)

        }).catch((err) => {
            console.log(err)
            setactivityLoading(false)
        })
    }


    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name', ellipsis: true, width: 170 },
        { title: 'Post', dataIndex: 'post', key: 'post', ellipsis: true, width: 170 },
        { title: 'Updates', dataIndex: 'updates', key: 'updates', ellipsis: true, width: 170 },
        { title: 'Time', dataIndex: 'time', key: 'time', ellipsis: true, width: 170 },
    ];


    return (
        <div className="dashMain">

            <Modal centered={true} closable={false} footer={<></>} visible={showModel}  onCancel={()=>setshowModel(false)}>
               <SendNotification setshowModel={setshowModel} />
            </Modal>

            <AdminHeader
                label="Dashboard"
                btnLabel="Send Notification"
                btnClickHandler={showNModelHandler}
            />

            <div className={classes.updateCont}>

                <div className={classes.leftContainer}>
                    <div className={classes.frontSvg}>
                        <img src={`${baseUrl}AdminPanel/Dashboard/update2.png`} alt="updates"></img>
                    </div>
                    <div className={classes.updateTable}>
                        <Table
                            loading={activityLoading}
                            dataSource={activityData}
                            columns={columns}
                            scroll={matches ? { x: "fit-content", } : {}}
                            pagination={{ onChange: getActivityData, total: activityCount, showSizeChanger: false }}
                        />

                    </div>
                </div>

                <div className={classes.RightContainer}>
                    <Grievences />
                     {
                        userType === "admin" ? <BillR />:<></>
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard
