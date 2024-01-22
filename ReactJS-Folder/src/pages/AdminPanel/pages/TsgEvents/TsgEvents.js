import React, { useEffect, useState } from 'react'
import {
    Table,
    Select,
    Tooltip,
    Space,
    Popconfirm,
    message,
    Spin,
    Modal,

} from 'antd';
import './TsgEvents.css'
import { useSelector } from 'react-redux'
import useMediaQuery from "@mui/material/useMediaQuery";
import API from '../../../../api/'
import AdminHeader from '../../Components/Table/Header/Header';
import EventsSearch from './Components/EventsSearch';
import { useDispatch } from 'react-redux'
import { getStudentData } from '../../../../redux/features/studentprofile/'
import TsgEditor from './Components/Editor/Editor';
import Result from './Components/Result/Result';


function StudentProfile() {

    const token = useSelector(state => state.auth.token)
    const [eventCount, setEventCount] = useState(0);
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hideTable, setHideTable] = useState(false);
    const [pageNumber, setpageNumber] = useState(1);
    const [activityLoading, setActivityLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const [showModel, setshowModel] = useState(false);
    const [showResultModel, setshowResultModel] = useState(false);
    const [customSearch, setCustomSearch] = useState(false);
    const [month, setMonth] = useState('');
    const [socorhall, setSocorhall] = useState('');


    const addStudentClickHandler = () => {
        setHideTable(true)

    }

    const dispatch = useDispatch()
    useEffect(() => {
        getEventData(1, 8);
        dispatch(getStudentData())

    }, [])
    const getEventData = (pageNum, pageSize) => {

        setpageNumber(pageNum)

        setLoading(true)

        let body = {
            token: token,
            page_size: 10
        }


        if (!customSearch) {

            API.post(`/event/all/?page=${pageNum}`, body)
                .then((res) => {
                    setLoading(false)
                    const eventData = res.data.results.map((event) => {

                        var utcDate = event.eventDate; // ISO-8601 formatted date returned from server
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
                        event['eventdate'] = `${day} \xa0 ${hours}:${minutes} ${newformat} \xa0 ${datetime[2]} ${month}/ ${year}`
                        var organisation = event.organiserSociety ? event.organiserSociety.name : event.organiserBody ? event.organiserBody.name : event.organiserHall ? event.organiserHall.name : ""
                        event['organisation'] = organisation

                        return event
                    })
                    setEventData(eventData);
                    setEventCount(res.data.count);

                    message.success("Event data fetch successfully")
                })
                .catch((err) => {
                    setLoading(false)
                    console.log(err);
                    message.error(err.response.data.message)
                })
        }
        else {
            body = { ...body, month, socorhall }
            API.post(`/findevent/?page=${pageNum}`, body)
                .then((res) => {
                    setLoading(false)
                    const eventData = res.data.results.map((event) => {

                        var utcDate = event.eventDate; // ISO-8601 formatted date returned from server
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
                        event['eventdate'] = `${day} \xa0 ${hours}:${minutes} ${newformat} \xa0 ${datetime[2]} ${month}/ ${year}`
                        var organisation = event.organiserSociety ? event.organiserSociety.name : event.organiserBody ? event.organiserBody.name : event.organiserHall ? event.organiserHall.name : ""
                        event['organisation'] = organisation

                        return event
                    })
                    setEventData(eventData);
                    setEventCount(res.data.count);

                    message.success("Event data fetch successfully")
                })
                .catch((err) => {
                    setLoading(false)
                    console.log(err);
                    message.error(err.response.data.message)
                })
        }
    }

    const EventDeleteHandler = (eventID) => {


        setActivityLoading(true)
        setLoadingText('Deleting...')

        API.delete(`/event/${eventID}/`, {
            data: {
                token
            }
        })
            .then((res) => {
                message.success("Event deleted successfully")
                getEventData(pageNumber, 8)
                setActivityLoading(false)

            })
            .catch((err) => {
                message.error(err.response.data.message);
                getEventData(pageNumber, 8)
                setActivityLoading(false)

            })

    }



    const matches = useMediaQuery("(max-width:1040px)");

    function handleChange(value) {
        console.log(`selected ${value}`);
        setMonth(value);
        setCustomSearch(true);
    }

    const onOrganisationChange = (value) => {
        console.log(value)
        setSocorhall(value)
        setCustomSearch(true);

    }


    let { societyList, hallList } = useSelector((state) => state.auth);
    hallList = hallList.map((hall) => hall.name)
    societyList = societyList.map((society) => society.name)

    var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL
    const yearList = [1, 2, 3, 4, 5]
    const columns = [

        { title: 'Event Name', dataIndex: 'eventName', key: 'eventName', width: 150, ellipsis: true },
        { title: 'Organised by', dataIndex: 'organisation', key: 'organisation', width: 150, ellipsis: true },
        { title: 'About', dataIndex: 'about', key: 'about', width: 150, ellipsis: true },
        { title: 'Time', dataIndex: 'eventdate', key: 'eventdate', width: 150, ellipsis: true },
        {
            title: 'Action',
            key: '9',
            width: 150,
            fixed: matches ? 'right' : '',
            render: (actions) => {
                // console.log(actions)
                return (
                    <Space justify="space-between">
                        <Tooltip color="#333333" placement="bottom" title="Update Event">
                            <img style={{ cursor: "pointer" }} onClick={() => {
                                setshowModel(true)
                            }} width="70%" alt="update" src={`${baseUrl}icons/update.png`} ></img>
                        </Tooltip>

                        <Tooltip color="#333333" placement="bottom" title="Delete Event">
                            <Popconfirm
                                onConfirm={() => {
                                    EventDeleteHandler(actions.id)
                                }}
                                title="Sure to delete?">
                                <img width="70%" style={{ cursor: "pointer" }} alt="delete" src={`${baseUrl}icons/delete.png`} ></img>
                            </Popconfirm>
                        </Tooltip>

                        {/* <Tooltip color="#333333" placement="bottom" title="Add Result">
                            <img style={{ cursor: "pointer" }} onClick={() => {
                                setshowResultModel(true)
                            }} width="100%" alt="update" src={`${baseUrl}icons/result.png`} ></img>
                        </Tooltip> */}
                    </Space>
                )
            },
        },
    ];

    return (
        <div>

            <Modal centered={true} footer={<></>} visible={showResultModel} onCancel={() => setshowResultModel(false)}>
                <Result/>
            </Modal>


            <Modal style={{ width: "100vw" }} centered={true} footer={<></>} visible={showModel} onCancel={() => setshowModel(false)}>
                <TsgEditor 
                getNewData={getEventData}
                
                
                />
            </Modal>

            <AdminHeader
                label="Events"
                btnLabel="Add Event"
                btnClickHandler={() => setshowModel(true)}
            />
            <Spin tip={loadingText} spinning={activityLoading}>
                <div className="adminStudProfCont">

                    <EventsSearch
                        monthList={monthList}
                        societyList={societyList}
                        hallList={hallList}
                        handleChange={handleChange}
                        onOrganisationChange={onOrganisationChange}
                        getEventData={getEventData}
                    />

                    <div className="tsgtable" >
                        <Table
                            loading={loading}
                            pagination={{ onChange: getEventData, total: eventCount, showSizeChanger: false }}
                            columns={columns}
                            dataSource={eventData}
                            scroll={matches ? { x: "fit-content", y: "75vh" } : { y: "75vh" }}
                        />
                    </div>


                </div>
            </Spin>
        </div >
    )
}

export default StudentProfile