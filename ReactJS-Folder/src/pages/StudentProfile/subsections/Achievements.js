import React, { useState } from "react";
import classes from "../profile.module.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Loader from "../../../components/DataLoader/Loader";
import { DatePicker, message, Space } from "antd";
import { Select, Input, Button } from "antd";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import API from "../../../api";
import { checkUserAuth } from "../../../redux/features/login/loginThunk";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function Achievements(props) {
  const [editAachievement, setEditAchievement] = useState(false);
  const { Option } = Select;

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState(null);

  const tags = useSelector((state) => state.auth.tagsList);
  const state = useSelector((state) => state.auth);
  const dispatch=useDispatch();
  const handleAdd = (e) => {
    e.preventDefault();
    let formdata = new FormData();
    if (file != null) formdata.append("supDoc", file);
    formdata.append("desc", description);
    formdata.append("date", date);
    formdata.append("type", type);
    formdata.append("token", state.token);
    formdata.append("user", state.currentUser.id);
    console.log(formdata);
    API.post("achievement/", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(checkUserAuth());
      })
      .catch((err) => {
        console.log(err);
      });
    //Ajax call to add the achievement
    setEditAchievement(false);
  };
  const handleDate = (date, dateString) => {
    setDate(dateString);
  };
  const uploadprofile = {
    name: "file",
    status: "done",
    multiple: false,
    maxCount: 1,
    beforeUpload: (info) => {
      setFile(info);
      return false;
    },
    onRemove: (info) => {
      setFile(null);
    },
  };
  const handleDelete = (id) => {
    API.delete(`achievement/${id}/`,{data:{token:state.token}}).then((res)=>{ console.log(res.data);
    message.success("deleted successfully");
    dispatch(checkUserAuth());

    }).catch((err)=>{
      message.error("error in deleting")
    })
  }
  return (
    <div className={`${classes.card}`}>
      <span className={`${classes.sectionheading}`}>Achievements</span>
      <div
        className={`${classes.acheivemntwrp} ${classes.dflex} ${classes.fwt} ${classes.jeven}`}
      >
        {!props.loading ? (
          props.info.map((achv, index) => {
            return (
              <div
                key={index}
                className={`${classes.eachachievement} ${classes.dflex} ${classes.fdc} ${classes.acen} ${classes.pad20}`}
              >
                <div className={`${classes.achvicon}`}>
                  <SchoolOutlinedIcon sx={{ width: "86px", height: "86px" }} />
                </div>
                {achv.desc}
                <div onClick={() => handleDelete(achv.id)} className={classes.achvdel} style={{ justifyContent: 'flex-end', position: 'absolute', marginBottom: '10px', marginRight: '10px' }}>
                  <DeleteOutlineOutlinedIcon sx={{ color: "#de5753" }} />
                </div>
              </div>
            );
          })
        ) : (
          <Loader />
        )}
        {!props.loading && !editAachievement && (
          <div
            onClick={() => setEditAchievement(true)}
            className={`${classes.eachachievement} ${classes.dflex} ${classes.fdc} ${classes.jcen} ${classes.acen} ${classes.pad20}`}
          >
            <AddOutlinedIcon
              sx={{ width: "100px", height: "100px", color: "#9c9c9c" }}
            />
          </div>
        )}
        {editAachievement && (
          <form
            onSubmit={handleAdd}
            style={{ marginTop: "20px" }}
            className={classes.formproject}
          >
            <div>
              Description<span className={classes.redtxt}>*</span>
            </div>
            <input
              type=""
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={classes.socinput}
            />
            <div>
              Type<span className={classes.redtxt}>*</span>
            </div>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={classes.socinput}
            >
              <option value="" hidden>
                Select Type
              </option>

              {tags.map((tag, index) => (
                <option value={tag.id}>{tag.name}</option>
              ))}
            </select>
            <DatePicker onChange={handleDate} style={{ width: "100%" }} />
            <div
              className={`${classes.dflex} ${classes.jcen} ${classes.pad20}`}
            >
              <Upload {...uploadprofile}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <input
                type="submit"
                value={"Add"}
                style={{ width: "40%" }}
                className={classes.updatebtn}
              />
              <input
                type="text"
                value="Cancel"
                onClick={() => setEditAchievement(false)}
                style={{ width: "40%" }}
                className={classes.cancelbtn}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
