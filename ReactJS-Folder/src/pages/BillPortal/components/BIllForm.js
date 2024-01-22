import React from "react";
import classes from "./css/Form.module.css";
import { useState, useEffect } from "react";
import { Input, Button, Space, Form, Select, message ,Upload} from "antd";
import API from "../../../api";
import { useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;
const { TextArea } = Input;
export default function BillForm(props) {
  const [file, setFile] = useState([]);
  const baseUrl = process.env.REACT_APP_ASSETS_BASEURL;
  const [allEventOfSoc, setAllEventOfSoc] = useState([]);
  let token = useSelector((state) => state.auth.token);
  const checkNull=(e)=>{
    return e!==null?e:"";
  }
  const fetchBill = () => {
    API.post("getsocevent/", { token })
      .then((res) => {
        //console.log(res.data);
        setAllEventOfSoc(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBill();
  }, []);

  const submitHandler = (e) => {
    //console.log(file,e.bill)
    var formData = new FormData();
    const eventId = checkNull(e.event);
    formData.append("bill", checkNull(e.bill.file));
    formData.append("event", e.event);
    formData.append("token", localStorage.getItem("token"));
    formData.append("amount", e.amount);
    formData.append("doubt", e.doubt);
    const s=allEventOfSoc.find((item) =>    {
      
      console.log(item.id,eventId)
      
      return item.id==eventId}); 
      console.log(s);

    formData.append("socyOrRg",s.organiserSociety_id )
    console.log(formData);
    API.post("bill/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // API.post("bill/", obj)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // console.log(obj);
    // console.log(files);
  };



  const upload = {
    name: "file",
    status: "done",
    multiple: false,
    maxCount: 1,
    beforeUpload :(info)=> {
      //console.log("before");
      setFile(info);
      //console.log(info,file);
      return false;
    },
    onRemove:(info)=>{
      //console.log("remove");
      //console.log(info);
      setFile(null);

    }
  };
  return (
    <>
      <div className={classes.formContainer}>
        <h2 className={classes.formHeader}>Form</h2>
        <div className={classes.billForm}>
          <div className={classes.formInfoBox}>
            <div className={classes.formInfo}>
              Upload a single PDF with all invoices and documents.
            </div>
            <div className={classes.formInfoBottomLine}>
              Mandatory <span style={{ color: "red" }}>*</span>
            </div>
          </div>
          <Form
            labelCol={{ span: 5 }}
            labelAlign="left"
            layout="vertical"
            onFinish={submitHandler}
          >
            <Form.Item label="Event:" name="event">
              <Select>
                {allEventOfSoc.map((event) => (
                  <Option value={event.id} >{checkNull(event.eventName)}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Upload Bill Proof:" name="bill">
            <Upload {...upload} >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
                    
            </Form.Item>

            <Form.Item label="Amount:" name="amount">
              <Input type="text" name="amount" />
            </Form.Item>

            <Form.Item label="Query/Request" name="doubt">
              <TextArea
                type="text"
                name="doubt"
                autoSize={{ minRows: 3, maxRows: 8 }}
              />
            </Form.Item>

            <Form.Item>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  marginTop: "1em",
                  columnGap: "1em",
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
