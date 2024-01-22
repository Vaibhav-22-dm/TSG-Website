import React, { useState, useEffect } from 'react'
import { Tabs, Form, Input, Radio, Space, Button } from 'antd';
import classes from './Grievences.module.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import useMediaQuery from "@mui/material/useMediaQuery";
const { TabPane } = Tabs;
const { TextArea } = Input;

function Grievences() {

    const [showgModal, setShowgModal] = useState(false)

    const showGrievenceModel = () => {
        setShowgModal(true)
    }


    function callback(key) {
        console.log(key);
    }



    return (
        <div className={classes.studentGrievances}>
            <h1>Student Grievances</h1>

            <div>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab={
                        <div style={{ background: "#FFF7F0" }} className={classes.tabsLabel}>
                            <h3>New</h3>
                            <div style={{ background: "#FFB573" }} className={classes.newCount}>
                                <h3>07</h3>
                            </div>
                        </div>
                    } key="1">
                        <div className={classes.ContentContainer}>
                            <GreivenceItem />
                            <GreivenceItem />
                            <GreivenceItem />
                            <GreivenceItem />
                            <GreivenceItem />
                            <GreivenceItem />
                            <GreivenceItem />
                            <GreivenceItem />
                            <GreivenceItem />
                        </div>
                    </TabPane>
                    <TabPane tab={
                        <div style={{ background: "#E7F8F0" }} className={classes.tabsLabel}>
                            <h3>Resolved</h3>
                            <div style={{ background: "#22C275" }} className={classes.newCount}>
                                <h3>07</h3>
                            </div>
                        </div>
                    } key="2">
                        <div className={classes.ContentContainer}>
                            <GreivenceItem />
                            <GreivenceItem />
                            <GreivenceItem />
                            <GreivenceItem />
                            <GreivenceItem />
                            <GreivenceItem />
                            <GreivenceItem />
                            <GreivenceItem />
                            <GreivenceItem />
                        </div>
                    </TabPane>

                </Tabs>
            </div>

        </div>
    )
}



const GreivenceItem = (props) => {

    const [form] = Form.useForm();
    const matches = useMediaQuery("(max-width:600px)");


    const [showgModal, setShowgModal] = useState(false)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        borderRadius: '10px',
        boxShadow: 24,
        width: "95%",
        maxWidth: "900px",
        p: 4,
        height: matches ? "100%" : "fit-content",
        overflowY: "auto"
    };


    const showGrievenceModel = () => {
        setShowgModal(true)
    }

    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL
    return (
        <>
            <div className={classes.Content}>
                <div className={classes.upperPart}>
                    <h4> Name</h4>
                    <h4>Roll No</h4>
                    <h4>Date</h4>
                </div>
                <div className={classes.belowPart}>
                    <h4>Subject :     Lorem Ipsum is Lorem Ipsum is </h4>
                    <img onClick={showGrievenceModel} style={{ width: "1.5em" }} alt="update" src={`${baseUrl}icons/visibility.png`} ></img>
                </div>
            </div>


            <Modal
                open={showgModal}
                onClose={() => setShowgModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={classes.formMCont}>
                        <div className={classes.leftpartM}>
                            <Form form={form} name="control-hooks">
                                <Form.Item name="name" label="Name(Roll No)" >
                                    <Input />
                                </Form.Item>
                                <Form.Item name="subject" label="Subject">
                                    <Input />
                                </Form.Item>

                                <div className={classes.AttTime}>
                                    <div style={{ marginTop: "-6px" }}>
                                        <label>Attachement</label>
                                        <img style={{ padding: "1em", borderRadius: "5px", border: "5px solid #F2F2F2" }} alt="update" src={`${baseUrl}AdminPanel/Dashboard/filedownload.png`} ></img>
                                    </div>
                                    <div>
                                        <Form.Item name="Date" label="Date" >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="time" label="Time">
                                            <Input />
                                        </Form.Item>
                                    </div>
                                </div>

                                <Form.Item style={{ marginBottom: "-10px" }} name="description" label="Description:">
                                    <TextArea rows={6} />
                                </Form.Item>



                            </Form>
                        </div>
                        <div className={classes.rightpartM}>
                            <Form>
                                <Form.Item name="update" label="Update:">
                                    <TextArea rows={9} />
                                </Form.Item>

                                <Form.Item name="status" label="Status:">

                                    <Radio.Group >
                                        <Space direction="vertical" >
                                            <Radio value={1}>
                                                <img src={`${baseUrl}AdminPanel/Dashboard/resolved.png`} ></img>
                                            </Radio>
                                            <Radio value={2}>
                                                <img src={`${baseUrl}AdminPanel/Dashboard/declined.png`} ></img>
                                            </Radio>
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>

                                <div style={{
                                    marginTop: "2em",
                                    display: "flex",
                                    justifyContent: "center",
                                    columnGap: "1em"
                                }}>

                                    <Button onClick={() => setShowgModal(false)} style={{ borderRadius: "50px" }} type="primary">Cancel</Button>
                                    <Button style={{ borderRadius: "50px" }} type="primary">Confirm</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Box>
            </Modal>




        </>


    )
}

export default Grievences
