import React, { useEffect, useState } from "react";
import classes from "../../profile.module.css";
import SocUpdateForm from "./SocUpdateForm";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import API from "../../../../api";
import { useSelector, useDispatch } from "react-redux";
import {message} from "antd";
import { getStudentData } from "../../../../redux/features/studentprofile/";

export default function Soc(props) {
  var soc = props.soc;
  var editSoc = props.editSoc;
  // const [editPor, setEditPor] = useState(false)
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const handleSubmit = (por, id) => {
    //Updating socities
    console.log("Change tried", id, por);
    props.setComponentLoading(true);
    API.put(`/post/${id}/`, {
      token,
      post: por,
    })
      .then((res) => {
        console.log(res.data);
        props.setComponentLoading(false);
        message.success("Societies Post Updated Successfully");
        dispatch(getStudentData());
      })
      .catch((err) => {
        console.log("There was an error", err);
        props.setComponentLoading(false);
        message.error("Some Error Occured");

      });
    props.changePor(-1);
  };
  const handleDelete = (id) => {
    console.log("Delete tried", id);
    props.setComponentLoading(false);

    API.delete(`/post/${id}/`, { data: { token } })
      .then((res) => {
        console.log(res.data);
        props.setComponentLoading(false);
        message.success("Societies Post Deleted Successfully");
        dispatch(getStudentData());

      })
      .catch((err) => {
        console.log("There was an error", err);
        props.setComponentLoading(false);
        message.error("Some Error Occured");

      });
  };
  // useEffect(() => {
  //     if (props.editPor && editSoc)
  //     document.getElementById("theOutermostSco").style.boxShadow = "3px 3px 18px rgba(118, 148, 255, 0.25)";
  // }, [props.editPor, editSoc])
  return (
    <>
      <div
        className={`${classes.socwrappper} ${classes.bluehvr} ${
          classes.pad20
        } ${props.editPor && editSoc ? classes.blueshaodow : ""}`}
        id="theOutermostSco"
      >
        <div className={`${classes.dflex} ${classes.acen} ${classes.w100}`}>
          <div className={classes.socicon}> </div>
          <div className={`${classes.namenpor} ${classes.fg1} ${classes.h100}`}>
            <div>
              {soc.society
                ? soc.society.name
                : (soc.hall
                ? soc.hall.name
                : "Information Unavailable")}
            </div>
            <div className={classes.greyclr}>{soc.post}</div>
          </div>
          {editSoc && !props.editPor && (
            <>
              <div className={classes.eqspace_h}>
                <ModeEditOutlinedIcon
                  sx={{ color: "#2dc57b" }}
                  onClick={() => props.changePor(props.index)}
                />
              </div>
              <div className={classes.eqspace_h}>
                <DeleteOutlineOutlinedIcon
                  sx={{ color: "#de5753" }}
                  onClick={() => handleDelete(soc.id)}
                />
              </div>
            </>
          )}
        </div>
        {props.editPor && editSoc && (
          <SocUpdateForm
            por={soc.post}
            id={soc.id}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </>
  );
}
