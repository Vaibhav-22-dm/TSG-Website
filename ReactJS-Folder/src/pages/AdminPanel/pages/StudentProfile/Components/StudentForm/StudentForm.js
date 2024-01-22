import React, { useEffect, useState } from "react";
import { Input, Button, Space, Form, Select, message, Upload } from "antd";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import Achievement from "../Achievements/Achievement";
import API from "../../../../../../api";
import AddIcon from "@mui/icons-material/Add";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import { useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
const { TextArea } = Input;
registerPlugin(FilePondPluginImagePreview);
const { Option } = Select;
function StudentForm(props) {
  const [form] = Form.useForm();

  const [addloading, setAddLoading] = useState(false);
  const [cv, setFilecv] = useState(null);
  const [profile_pic, setprofile_pic] = useState(null);
  const [update, setUpdate] = useState(false);
  const allAchievements = useSelector((state) =>
    state.student.userdata ? state.student.userdata.achievements : []
  );
  let departmentList = useSelector((state) => state.auth.departmentList);
  let hallList = useSelector((state) => state.auth.hallList);
  const addStudentsubmitHandler = (values) => {
    setAddLoading(true);
    let user = {
      ...values,
      token: props.token,
      cv,
      profile_pic,
    };
    console.log(user);
    // let x = hallList.find((hall) => hall.name === values.hall);
    // if (x) user.hall = x.id;
    // let y = departmentList.find(
    //   (department) => department.name === values.department
    // );
    // console.log(y);
    // if (y) user.department = y.id;

    var form_data = new FormData();
    for (let key in user) {
      if (user[key] === null || user[key] === undefined) {
        delete user[key];
      } else form_data.append(key, user[key]);
    }
    if (!update) {
      API.post("/user/", form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          setAddLoading(false);
          message.success("Student Added Successfully");
          props.setHideTable(false);
          props.setEditMode(false);
        })
        .catch((err) => {
          setAddLoading(false);
          console.log(err);
          message.error(err.response.data.message);
        });
    } else {
      console.log(form_data);
      API.put(`/user/${props.formData.id}/`, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          setAddLoading(false);
          message.success("Student Details Updated Successfully");
          props.setHideTable(false);
          props.setEditMode(false);
        })
        .catch((err) => {
          setAddLoading(false);
          console.log(err);
          message.error(err.response.data.message);
        });
    }
  };
  const uploadcv = {
    name: "file",
    status: "done",
    multiple: false,
    maxCount: 1,
    beforeUpload: (info) => {
      setFilecv(info);
      return false;
    },
    onRemove: (info) => {
      setFilecv(null);
    },
  };
  const uploadprofile = {
    name: "file",
    status: "done",
    multiple: false,
    maxCount: 1,
    beforeUpload: (info) => {
      setprofile_pic(info);
      return false;
    },
    onRemove: (info) => {
      setprofile_pic(null);
    },
  };

  useEffect(() => {
    console.log(props.editMode);
    if (props.editMode) {
      setUpdate(true);
      form.setFieldsValue({
        email: props.formData.email,
        personal_email: props.formData.personal_email,
        phone: props.formData.phone,
        first_name: props.formData.first_name,
        middle_name: props.formData.middle_name,
        last_name: props.formData.last_name,
        roll_no: props.formData.roll_no,
        hall: props.formData.hall ? props.formData.hall.id : null,
        department: props.formData.department
          ? props.formData.department.id
          : null,
        course: props.formData.course,
        eaa: props.formData.eaa,
        about: props.formData.about,
      });
    } else {
      props.setEditMode(false);

      form.resetFields();
    }
  }, []);

  return (
    <div className="studentForm">
      <div className="studentScroll">
        <Form
          labelCol={{ span: 5 }}
          labelAlign="left"
          form={form}
          onFinish={addStudentsubmitHandler}
        >
          <Form.Item label="Roll No:" name="roll_no">
            <Input required type="text" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Personal Email" name="personal_mail">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="First Name:" name="first_name">
            <Input required type="text" />
          </Form.Item>
          <Form.Item label="Middle Name:" name="middle_name">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Last Name:" name="last_name">
            <Input required type="text" />
          </Form.Item>

          <Form.Item label="Department:" name="department">
            <Select>
              {departmentList.map((department) => (
                <Option value={department.id}>{department.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Course:" name="course">
            <Input required type="text" />
          </Form.Item>
          <Form.Item label="Year:" name="year">
            <Select>
              {props.yearList.map((year) => (
                <Option value={year}>{year}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="EAA:" name="eaa">
            <Input type="text" name="eaa" />
          </Form.Item>
          <Form.Item label="Hall" name="hall">
            <Select>
              {hallList.map((hall) => (
                <Option value={hall.id}>{hall.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Profile Picture :" name="profile_pic">
            <Upload {...uploadprofile}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Upload CV" name="cv">
            <Upload {...uploadcv}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="About" name="about">
            <TextArea
              type="text"
              name="about"
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
              }}
            >
              <Space justify="space-between">
                <Button
                  loading={addloading}
                  style={{ borderRadius: "50px" }}
                  type="primary"
                  htmlType="submit"
                >
                  {!props.editMode ? "Submit" : "Update"}

                  {console.log(props.editMode)}
                </Button>
                <Button
                  style={{ borderRadius: "50px" }}
                  type="primary"
                  onClick={() => {
                    props.setHideTable(false);
                    props.setEditMode(false);
                    setUpdate(false);


                  }}
                >
                  Cancel
                </Button>
              </Space>
            </div>
          </Form.Item>
        </Form>

        <div style={{ marginTop: "1em" }} className="achievementsContent">
          <h3>Achievements</h3>

          <div style={{ marginBottom: "2em" }} className="achievementsCont">
            {allAchievements.map((achievement, index) => {
              return (
                <Achievement
                  Cdate="7,Nov 2021"
                  CName={achievement.desc}
                  supDoc={achievement.supDoc}
                  achievement={achievement}
                />
              );
            })}
          </div>
          <Form>
            <Form.List name="guests" justify="center" label="Guests">
              {(fields, { add, remove }) => (
                <div style={{ width: "115%" }}>
                  {fields.map((field) => {
                    return (
                      <>
                        <div className="addAchievementCont">
                          <div className="mobileDiv" style={{ width: "50%" }}>
                            <h4 style={{ margin: "0px" }}>
                              Enter Certificate Name
                            </h4>
                            <Input size="large" />
                          </div>
                          <div className="mobileDiv" style={{ width: "50%" }}>
                            <FilePond
                              server="http://localhost:5000/send"
                              labelIdle=' <img  src="https://raw.githubusercontent.com/TSG-Website/media/master/icons/cloud_upload.png"><br><span style="font-size:12px">Drag & Drop Certificate</span> </img> '
                            />
                          </div>
                          <Form.Item>
                            <RemoveCircleOutlineIcon
                              onClick={() => remove(field.name)}
                            />
                          </Form.Item>
                        </div>
                      </>
                    );
                  })}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                      icon={<AddIcon />}
                    >
                      Add Achievement
                    </Button>
                  </Form.Item>
                </div>
              )}
            </Form.List>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default StudentForm;
