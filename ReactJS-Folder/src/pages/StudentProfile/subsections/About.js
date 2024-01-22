import React, { useState } from "react";
import classes from "../profile.module.css";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CloseIcon from "@mui/icons-material/Close";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Soc from "./Society/Soc";
import SocAddForm from "./Society/SocAddForm";
import API from "../../../api";
import { useSelector, useDispatch } from "react-redux";
import { getStudentData } from "../../../redux/features/studentprofile/";
import TextField from "@mui/material/TextField";
import Loader from "../../../components/DataLoader/Loader";
import { Spin ,message } from "antd";
export default function About(props) {
  const [editAbout, setEditAbout] = useState(false);
  const [about, setAbout] = useState(props.info.about);
  const [editSoc, setEditSoc] = useState(false);
  const [addSoc, setAddSoc] = useState(false);
  const [editPor, setEditPor] = useState(-1);

  const [componentLoading, setComponentLoading] = useState(false);
  const changePor = (i) => {
    setAddSoc(false);
    setEditPor(i);
  };
  const changeEditSoc = () => {
    setEditPor(-1);
    setAddSoc(false);
    setEditSoc(!editSoc);
  };
  const changeAddSoc = () => {
    setEditPor(-1);
    setAddSoc(!addSoc);
  };
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const handleAddSoc = (soc, por, hallornot) => {
    // console.log("Adding", soc, por, hallornot);
    // console.log("token", token)
    setComponentLoading(true);
    if (!hallornot) {
      API.post("/post/", {
        token,
        society: soc,
        post: por,
        user: props.userid,
      })
        .then((res) => {
        //   console.log(res.data);
          dispatch(getStudentData());
            setComponentLoading(false);
            message.success("Societies Post Added Successfully");

        })
        .catch((err) => {
          console.log("There was an error", err);
          setComponentLoading(false);
          message.error("Error in Adding Societies Post");

        });
    } else {
      API.post("/post/", {
        token,
        hall: soc,
        post: por,
        user: props.userid,
      })
        .then((res) => {
        //   console.log(res.data);
          dispatch(getStudentData());
          setComponentLoading(false);
          message.success("Societies Post Added Successfully");

        })
        .catch((err) => {
          console.log("There was an error", err);
          setComponentLoading(false);
          message.error("Error in Adding Societies Post");
        });
    }
    changeAddSoc();
    // dispatch(getStudentData())
  };
  const handleEditAbout = (e) => {
    e.preventDefault();
    // setEditAbout(!editAbout);
    setComponentLoading(true);
    API.put("/studentdata/", { token, about })
      .then((res) => {
        console.log(res.data);
        dispatch(getStudentData());
        setEditAbout(false);
        setComponentLoading(false);
        message.success("About Updated Successfully");
      })
      .catch((err) => {
        console.log("There was an error", err);
        setComponentLoading(false);
        message.error("Error in Updating About");
      });
  };
  return (
    <>
      <Spin spinning={componentLoading}>
        <div className={`${classes.card} ${classes.abtnsocwrapper}`}>
          <div className={classes.abtsec}>
            <span
              className={`${classes.sectionheading} ${classes.dflex} ${classes.jspace}`}
            >
              About{" "}
              <div
                className={classes.hvrptr}
                onClick={() => setEditAbout(!editAbout)}
              >
                {!editAbout ? <ModeEditOutlineIcon /> : <CloseIcon />}
              </div>
            </span>
            <div className={`${classes.abouttext}`} style={{textAlign:"justify"}}>
              {!editAbout ? (
                about
              ) : (
                <>
                  <form onSubmit={handleEditAbout}>
                    <TextField
                      id="outlined-multiline-static"
                      label="About"
                      multiline
                      // rows={4}
                      defaultValue={props.info.about}
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      style={{ width: "100%" }}
                    />
                    <input
                      type="submit"
                      value={"Update"}
                      style={{ width: "100%", marginTop: "20px" }}
                      className={classes.updatebtn}
                    />
                  </form>
                </>
              )}
            </div>
          </div>
          <div className={classes.abtsocspace}></div>
          <div className={classes.abtsec}>
            <span
              className={`${classes.sectionheading} ${classes.dflex} ${classes.jspace}`}
            >
              Society/Club
              <div className={classes.hvrptr} onClick={changeEditSoc}>
                {editSoc ? <CloseIcon /> : <ModeEditOutlineIcon />}
              </div>
            </span>
            <div>
              {!props.loading ? (
                props.societies.map((soc, index) => {
                    console.log(soc, " asdfa")
                  return soc != null ? (
                    <Soc
                      key={index}
                      index={index}
                      editPor={editPor == index ? true : false}
                      soc={soc}
                     
                      changePor={changePor}
                      editSoc={editSoc}
                      setComponentLoading={setComponentLoading}
                    />
                  ) : (
                    "No socities to show"
                  );
                })
              ) : (
                <Loader />
              )}
              {editSoc && !addSoc && (
                <div
                  onClick={changeAddSoc}
                  className={`${classes.w100} ${classes.hvrptr} ${classes.dflex} ${classes.jcen} ${classes.acen} ${classes.greybg} ${classes.addsoc}`}
                >
                  <AddOutlinedIcon
                    sx={{ width: "62px", height: "62px", color: "#9c9c9c" }}
                  />
                </div>
              )}
              {addSoc && editSoc && (
                <SocAddForm
                  soc={props.societies}
                  handleAddSoc={handleAddSoc}
                  socs={props.socs}
                  
                />
              )}
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
}
