import React from "react";
import classes from "../profile.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutline";
import { Upload, Button, message, Spin } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { getStudentData } from "../../../redux/features/studentprofile/";
import API from "../../../api";
import { Image } from "antd";
import { checkUserAuth } from "../../../redux/features/login/loginThunk";

export default function Nameroll(props) {
  const matches = useMediaQuery("(min-width:600px)");
  const [edit, setEdit] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(false);
  const user = useSelector((state) => state.auth.currentUser);
  const token = useSelector((state) => state.auth.token);
  const [imageSrc, setImageSrc] = React.useState(props.info.icon )



  const dispatch = useDispatch();
  const uploadprofile = {
    name: "file",
    status: "done",
    multiple: false,
    maxCount: 1,
    beforeUpload: (info) => {
      let formData = new FormData();
      setImageLoading(true);
      formData.append("profile_pic", info);
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
          dispatch(checkUserAuth());
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
    <>
      <div className={classes.hvrptr} onClick={() => setEdit(!edit)} style={{display:"flex",justifyContent:"end"}}>
        {!edit ? <ModeEditOutlinedIcon /> : <CloseIcon />}
      </div>
      <div
        className={`${classes.nameRollOuter} ${matches ? classes.dflex : ""} ${
          classes.acen
        } ${classes.h100}`}
      >
        {/* <div className={classes.profileupdate} onClick={() => setEdit(!edit)}>{!edit ? <ModeEditOutlineIcon /> : <CloseIcon />}</div> */}

        <div
          className={classes.profilebg}
          onClick={() => {
            setEdit(true);
          }}
        >
          {" "}
          <Spin spinning={props.loading || imageLoading}>
            {edit ? (
              <Upload {...uploadprofile}>
                <Button
                  style={{ border: "none", backgroundColor: "transparent" }}
                  icon={
                    <ModeEditOutlinedIcon
                      sx={{ width: "40px", height: "40px" }}
                    />
                  }
                ></Button>
              </Upload>
            ) : (
              <Image
              width={200}
              height={200}
              preview={false}
              src={`http://localhost:8000${imageSrc}`}
              style={{"borderRadius": "50%"}}
            />
            )}
          </Spin>
        </div>
        <div
          className={`${classes.namenroll} ${classes.dflex} ${classes.jcen} ${classes.h100}  ${classes.fdc} ${classes.padl40}`}
        >
          <div className={classes.name}>{props.info.name}</div>
          <div className={classes.roll}>{props.info.roll}</div>
        </div>
      </div>
    </>
  );
}
