import React, { useState } from "react";
import classes from "../profile.module.css";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import LinkIcon from "@mui/icons-material/Link";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import API from "../../../api";
import Loader from "../../../components/DataLoader/Loader";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ProjectForm from "./ProjectForm";
import { getStudentData } from "../../../redux/features/studentprofile/";
import { useSelector, useDispatch } from "react-redux";
import {Spin , message} from "antd";
export default function Projects(props) {
  const [Editprojects, setEditprojects] = useState(false);
  const [Editoneproject, setEditoneproject] = useState(-1);
  const [Addprojects, setAddprojects] = useState(false);
  const [componenetLoading, setComponenetLoading] = useState(false);
  const changeEditProjects = () => {
    setAddprojects(false);
    setEditprojects(!Editprojects);
  };
  const state = useSelector((state) => state.auth);
  const token = state.token;
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    console.log("Project delete with ", id);
    setComponenetLoading(true);
    API.delete(`studentproject/${id}/`, {
      data: { token: props.token },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(getStudentData());
        setAddprojects(false);
        setEditprojects(false);
        setComponenetLoading(false);
        message.success("Project Deleted Successfully");

      })
      .catch((err) => {
        console.log(err);
        setAddprojects(false);
        setEditprojects(false);
        setComponenetLoading(false);
        message.error("Error in Deleting Project");


      });
  };
  const handleAdd = (title, description, link) => {
    setComponenetLoading(true);
    // e.preventDefault();
    console.log("Adding project", title, description, link);
    API.post("studentproject/", {
      title,
      about: description,
      link,
      token,
      user: state.currentUser.id,
    })
      .then((res) => {
        console.log(res.data);
        setAddprojects(false);
        dispatch(getStudentData());
        message.success("Project Added Successfully");
        setComponenetLoading(false);

      })
      .catch((err) => {
        console.log(err);
        setAddprojects(false);
        setComponenetLoading(false);
        message.error("Error in Adding Project");
      });
  };
  const handleEdit = (title, description, link, id) => {
    console.log("Editing project", title, description, link, id);
    setComponenetLoading(true);
    API.put(`studentproject/${id}/`, {
      title,
      about: description,
      link,
      token,
    })
      .then((res) => {
        console.log(res.data);
        setAddprojects(false);
        dispatch(getStudentData());
        setEditoneproject(-1);
        setComponenetLoading(false);
        message.success("Project Edited Successfully");
      })
      .catch((err) => {
        console.log(err);
        setAddprojects(false);
        setEditoneproject(-1);
        setComponenetLoading(false);
        message.error("Error in Editing Project");
      });
  };
  return (
    <div className={`${classes.card}`}>
      <Spin spinning={componenetLoading}>
      <span
        className={`${classes.sectionheading} ${classes.dflex} ${classes.jspace}`}
      >
        Projects{" "}
        <div className={classes.hvrptr} onClick={changeEditProjects}>
          {!Editprojects ? <ModeEditOutlineIcon /> : <CloseIcon />}
        </div>
      </span>
      {!props.loading ? (
        props.data.map((project, index) =>
          Editoneproject != index ? (
            <div key={index} className={`${classes.projecttab}`}>
              <div>{project.title}</div>
              <div className={`${classes.dflex} ${classes.acen}`}>
                {!Editprojects && (
                  <a
                    href={project.link}
                    target="_blank"
                    className={classes.eqspace_h}
                    rel="noreferrer"
                  >
                    <IconButton
                      disableRipple
                      sx={{
                        backgroundColor: "#7694ff",
                        color: "white",
                        padding: "6px",
                      }}
                    >
                      <LinkIcon />
                    </IconButton>
                  </a>
                )}
                {Editprojects && (
                  <>
                    <div
                      className={`${classes.eqspace_h} ${classes.hvrptr}`}
                      onClick={() => setEditoneproject(index)}
                    >
                      <ModeEditOutlinedIcon sx={{ color: "#2dc57b" }} />
                    </div>
                    <div
                      className={`${classes.eqspace_h} ${classes.hvrptr}`}
                      onClick={() => handleDelete(project.id)}
                    >
                      <DeleteOutlineOutlinedIcon sx={{ color: "#de5753" }} />
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <ProjectForm
              edit={true}
              id={project.id}
              title={project.title}
              description={project.about}
              link={project.link}
              submitHandler={handleEdit}
              handleCancel={() => setEditoneproject(-1)}
            />
          )
        )
      ) : (
        <Loader />
      )}
      {Editprojects && !Addprojects && (
        <div
          onClick={setAddprojects}
          style={{ height: "max-content" }}
          className={`${classes.w100} ${classes.hvrptr} ${classes.dflex} ${classes.jcen} ${classes.acen} ${classes.greybg} ${classes.addsoc}`}
        >
          <AddOutlinedIcon
            sx={{ width: "40px", height: "40px", color: "#9c9c9c" }}
          />
        </div>
      )}

      {Addprojects && Editprojects && (
        <ProjectForm
          submitHandler={handleAdd}
          handleCancel={() => setAddprojects(false)}
        />
      )}
      {/* <form onSubmit={handleAdd}>
                <div>Project Title<span className={classes.redtxt}>*</span></div>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className={classes.socinput} />
                <div>Project Description<span className={classes.redtxt}>*</span></div>
                <input type="text" required value={description} onChange={(e) => setDescription(e.target.value)} className={classes.socinput} />
                <div>Project Link<span className={classes.redtxt}>*</span></div>
                <input type="text" required value={link} onChange={(e) => setLink(e.target.value)} className={classes.socinput} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <input type='submit' value={"Add"} style={{ width: '40%' }} className={classes.updatebtn} />
                    <input type='text' value='Cancel' onClick={() => setAddprojects(false)} style={{ width: '40%' }} className={classes.cancelbtn} />
                </div>
            </form>
            } */}
      <form></form>
      {props.data.length === 0 && !props.loading && (
        <div className={classes.projecttab54}>No Projects Added</div>
      )}
      </Spin>
    </div>
  );
}
