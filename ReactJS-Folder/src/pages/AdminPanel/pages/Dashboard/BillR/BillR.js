import React, { useState, useEffect } from "react";
import { Tabs, Form, Input, Radio, Space, Button, Tooltip,Spin } from "antd";
import classes from "./BillR.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import API from "../../../../../api";
import { Anchor } from "antd";

const { Link } = Anchor;
const { TabPane } = Tabs;
const { TextArea } = Input;
const token = localStorage.getItem("token");

//this page has two seprate components
function Grievences() {
  const baseUrl = process.env.REACT_APP_ASSETS_BASEURL;
  const [newBill, setNewBill] = useState([]);
  const [resolvedBill, setResolvedBill] = useState([]);
  const [declinedBill, setDeclinedBill] = useState([]);
  const [BillRLoading, setBillRLoading] = useState(true);
  function callback(key) {
    console.log(key);
  }
  const getBill = () => {

    setBillRLoading(true)

    API.post("bill/all/", { token })
      .then((res) => {

        setBillRLoading(false)
        console.log(res.data);
        const newBill = res.data.results.filter(
          (item) => item.status === "PENDING"
        );
        const resolvedBill = res.data.results.filter(
          (item) => item.status === "Verified"
        );
        const declinedBill = res.data.results.filter(
          (item) => item.status === "DECLINE"
        );
        setDeclinedBill(declinedBill);
        setNewBill(newBill);
        setResolvedBill(resolvedBill);
        console.log(newBill, resolvedBill);
      })
      .catch((err) => {
        setBillRLoading(false)
        console.log(err);
      });
  };
  useEffect(() => {
    getBill();
  }, []);

  return (
    <div className={classes.billR}>
      <h1>Bill Reimbursement</h1>
   <Spin spinning={BillRLoading}>
      <div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane
            tab={
              <div
                style={{ background: "#FFF7F0" }}
                className={classes.tabsLabel}
              >
                <h3>New</h3>
                <div
                  style={{ background: "#FFB573" }}
                  className={classes.newCount}
                >
                  <h3>{newBill.length}</h3>
                </div>
              </div>
            }
            key="1"
          >
            <div className={classes.ContentContainer}>
              {newBill.map((item) => {
                return <BillRItem BillRLoading={BillRLoading}   data={item} />;
              })}
            </div>
          </TabPane>
          <TabPane
            tab={
              <div
                style={{ background: "#E7F8F0" }}
                className={classes.tabsLabel}
              >
                <h3>Resolved</h3>
                <div
                  style={{ background: "#22C275" }}
                  className={classes.newCount}
                >
                  <h3>{resolvedBill.length}</h3>
                </div>
              </div>
            }
            key="2"
          >
            <div className={classes.ContentContainer}>
              {resolvedBill.map((item) => {
                return <BillRItem BillRLoading={BillRLoading}  data={item} />;
              })}
            </div>
          </TabPane>
          <TabPane
            tab={
              <div
                style={{ background: "#f7baba" }}
                className={classes.tabsLabel}
              >
                <h3>Declined</h3>
                <div
                  style={{ background: "#c70d00" }}
                  className={classes.newCount}
                >
                  <h3>{declinedBill.length}</h3>
                </div>
              </div>
            }
            key="3"
          >
            <div className={classes.ContentContainer}>
              {declinedBill.map((item) => {
                return <BillRItem BillRLoading={BillRLoading}  data={item} />;
              })}
            </div>
          </TabPane>
        </Tabs>
      </div>
      </Spin>
    </div>
  );
}

const BillRItem = (props) => {
  const [form] = Form.useForm();
  const [secondForm] = Form.useForm();
  const matches = useMediaQuery("(max-width:600px)");

  const [showgModal, setShowgModal] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    width: "95%",
    maxWidth: "900px",
    p: 4,
    height: matches ? "100%" : "fit-content",
    overflowY: "auto",
  };

  const returnDate = (date) => {
    var utcDate = date; // ISO-8601 formatted date returned from server
    var localDate = new Date(utcDate);
    localDate = localDate.toString();
    let datetime = localDate.split(" ");
    let day = datetime[0];
    let month = datetime[1];
    let year = datetime[3].slice(2, 4);
    let time = datetime[4].slice(0, 5);
    let hours = time.slice(0, 2);
    let minutes = time.slice(3, 5);
    var newformat = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return ` ${datetime[2]} ${month} ${year}`;
  };
  const returnTime = (date) => {
    var utcDate = date; // ISO-8601 formatted date returned from server
    var localDate = new Date(utcDate);
    localDate = localDate.toString();
    let datetime = localDate.split(" ");
    let day = datetime[0];
    let month = datetime[1];
    let year = datetime[3].slice(2, 4);
    let time = datetime[4].slice(0, 5);
    let hours = time.slice(0, 2);
    let minutes = time.slice(3, 5);
    var newformat = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${day} \xa0 ${hours}:${minutes} ${newformat}`;
  };
  const handleSubmit = (values) => {
    console.log(values);
    API.put(`bill/${props.data.id}/`, { ...values, token })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    form.setFieldsValue({
      ...props.data,
      date: returnDate(props.data.date),
      time: returnTime(props.data.date),
      event: props.data.event.eventName,
      society: props.data.socyOrRg ? props.data.socyOrRg.name : "",
    });

    secondForm.setFieldsValue({
      ...props.data,
    });
  }, []);

  const baseUrl = process.env.REACT_APP_ASSETS_BASEURL;
  return (
    <>
    
        <div className={classes.Content}>
          <div className={classes.upperPart}>
            <h4>
              <span style={{ fontWeight: "600" }}>Event:</span>
              <Tooltip title={props.data.event.eventName}>
                <span>{props.data.event.eventName ? props.data.event.eventName.substring(0, 15) : ""}</span>
                <span>{props.data.event.eventName.length > 15 ? "..." : ""}</span>
              </Tooltip>
            </h4>
            <h4>Date: {returnDate(props.data.event.eventDate)}</h4>
          </div>
          <div className={classes.belowPart}>
            <h4>Amount: {props.data.amount}</h4>

            <img
              onClick={() => setShowgModal(true)}
              style={{ width: "1.5em" }}
              alt="update"
              src={`${baseUrl}icons/visibility.png`}
            ></img>
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
                <Form.Item name="society" label="Society/Group">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="event" label="Event">
                  <Input disabled />
                </Form.Item>

                <div className={classes.AttTime}>
                  <div style={{ marginTop: "-6px" }}>
                    <Form.Item name="bill" label="Bill">
                      <Anchor>
                        <Link
                          href={props.data.bill ? props.data.bill : ""}
                          title="Click to see the bill"
                          target="_blank"
                        />
                      </Anchor>
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="date" label="Date">
                      <Input disabled />
                    </Form.Item>
                    <Form.Item name="time" label="Time">
                      <Input disabled />
                    </Form.Item>
                  </div>
                </div>

                <Form.Item
                  style={{ marginBottom: "-10px" }}
                  name="doubt"
                  label="Queries:"
                >
                  <TextArea rows={6} disabled />
                </Form.Item>
              </Form>
            </div>
            <div className={classes.rightpartM}>
              <Form onFinish={handleSubmit} form={secondForm}>
                <Form.Item name="remarks" label="FeedBack:">
                  <TextArea rows={9} />
                </Form.Item>

                <Form.Item name="status" label="Status:">
                  <Radio.Group>
                    <Space direction="vertical">
                      <Radio value={"Verified"}>
                        <img
                          src={`${baseUrl}AdminPanel/Dashboard/resolved.png`}
                          alt=""
                        ></img>
                      </Radio>
                      <Radio value={"DECLINE"}>
                        <img
                          src={`${baseUrl}AdminPanel/Dashboard/declined.png`}
                          alt=""
                        ></img>
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>

                <div
                  style={{
                    marginTop: "2em",
                    display: "flex",
                    justifyContent: "center",
                    columnGap: "1em",
                  }}
                >
                  <Button
                    onClick={() => setShowgModal(false)}
                    style={{ borderRadius: "50px" }}
                    type="primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{ borderRadius: "50px" }}
                    type="primary"
                    htmlType="submit"
                  >
                    Confirm
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Grievences;
