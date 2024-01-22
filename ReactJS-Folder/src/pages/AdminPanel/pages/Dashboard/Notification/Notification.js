import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Table,
    message,
    Button,
    Modal,
    Form,
    Input,
    Select,
    Tooltip,
    Space,
} from "antd";
import axios from "axios";

import {useSelector} from 'react-redux'

const { TextArea } = Input;



function SendNotification(props) {

    const [form] = Form.useForm();

    const [loading,setLoading]=useState(false);


    const token = useSelector(state => state.auth.token)
    const userType = useSelector(state => state.auth.currentUser.user_type)

    const addEventsubmitHandler = (values) => {


        setLoading(true)
        const body = {
            ...values,
            token,
            userType
        }

        let url = "https://itworksonlocal.herokuapp.com/notification/push"

        axios.post(url, body)
            .then((res) => {

                setLoading(false)
                message.success("Notification  sent successfully!");
                form.resetFields();

            })
            .catch((error) => {
            setLoading(false)
                console.log(error);

            })

    }


    return (
        <>
            <Row justify="stretch">
                <div style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    marginTop: "1em"
                }}>



                    <Form
                        labelCol={{ span: 8 }}
                        labelAlign="left"
                        onFinish={addEventsubmitHandler}
                        form={form}
                    >
                        <Form.Item
                            label="Title"
                            required
                            name="title"
                            rules={[{ required: true, message: "Title field is empty" }]}
                        >
                            <Input required type="text" placeholder="Enter the Title" />
                        </Form.Item>

                        <Form.Item
                            label="RedirectURL"
                            name="redirecturl"
                        >
                            <Input required type="text" placeholder="Enter redirectingURL" />
                        </Form.Item>


                        <Form.Item
                            label="ImageURL"
                            name="imageurl"
                        >
                            <Input required type="text" placeholder="Enter ImageURL" />
                        </Form.Item>

                        <Form.Item
                            label="Message"
                            required
                            name="message"
                            rules={[
                                { required: true, message: " Message field is Empty" },
                            ]}
                        >
                            <TextArea
                                rows={4}
                                allowClear
                                placeholder="Enter the Message"

                            />
                        </Form.Item>


                        <div style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignContent: "center",
                            columnGap: "3em"
                        }}>
                            <Form.Item>
                                <Button style={{borderRadius:"50px"}} loading={loading} type="primary" htmlType="submit">
                                    Send Notification
                                </Button>
                            </Form.Item>

                            <Button style={{borderRadius:"50px"}} onClick={()=>props.setshowModel(false)}type="primary" >
                                Cancel
                            </Button>
                        </div>

                    </Form>
                </div>

            </Row>
        </>
    );
}

export default SendNotification;