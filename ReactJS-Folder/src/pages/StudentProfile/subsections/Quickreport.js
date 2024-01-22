import React from "react";
import classes from "../profile.module.css";
import icon from "../Images/report.png";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutline";
import CloseIcon from "@mui/icons-material/Close";
import { Upload, Button, message, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getStudentData } from "../../../redux/features/studentprofile/";
import API from "../../../api";
import { UploadOutlined } from "@ant-design/icons";

export default function Quickreport(props) {
  const [edit, setEdit] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const token = state.token;
  const user = state.currentUser;
  const uploadprofile = {
    name: "file",
    status: "done",
    multiple: false,
    maxCount: 1,
    beforeUpload: (info) => {
      let formData = new FormData();
      setImageLoading(true);
      formData.append("cv", info);
      formData.append("token", token);
      API.put(`user/${user.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          setEdit(false);
          message.success("Profile Picture Updated Successfully");
          dispatch(getStudentData());
          setImageLoading(false);
        })
        .catch((error) => {
          setEdit(false);
          setImageLoading(false);

          message.error("Error in Updating Profile Picture");
        });

      return false;
    },
    onRemove: (info) => {
      // console.log("removing");
    },
  };
  return (
    <><Spin spinning={imageLoading}>
      <div
        className={`${classes.card} ${classes.dflex} ${classes.acen} ${classes.quickreport} ${classes.fdc}`}
      >
        {" "}
        <div
          className={classes.hvrptr}
          onClick={() => setEdit(!edit)}
          style={{
            display: "flex",
            justifyContent: "end",
            width: "100%",
            marginTop: "10px",
          }}
        >
          {!edit ? <ModeEditOutlinedIcon /> : <CloseIcon />}
        </div>
        <img src={icon} alt="" />
        {!edit ? (
          <>
           
            <a href={props.cv} target="_blank" rel="noreferrer">
              <div
                className={`${classes.btn} ${classes.wmaxc} ${classes.eqspace}`}
              >
                Download Quick Report/ CV
              </div>
            </a>
          </>
        ) : (
          <Upload {...uploadprofile}>
             <Button style={{margin:"10px", borderRadius:"10px"}} type="primary" icon={<UploadOutlined />}>Click to Upload Your CV</Button>
          
          </Upload>
        )}
      </div>
    </Spin>
    </>
  );
}
