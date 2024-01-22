import React from "react";
import classes from "./Achievement.module.css";
import { Tooltip, Space, Popconfirm } from "antd";
import API from "../../../../../../api";
import {

    message
} from 'antd';
function Achievement(props) {
  const baseUrl = process.env.REACT_APP_ASSETS_BASEURL;
  const token=localStorage.getItem('token');

  const deleteHandler = (id) => {

    API.delete(`/achievement/${id}`,{
        data:{
            token
        }
    })
      .then((res) => {
          message.success("User deleted successfully")
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });

  }


  return (
    <div className={classes.achievements}>
      <div className={classes.imgCName}>
        <img src={`${baseUrl}icons/badge.png`} alt="achievement" />
        <h5>{props.CName}</h5>
      </div>
      <div className={classes.CDate}>
        <h5>{props.Cdate}</h5>
      </div>

      <div>
        <Space justify="center" size="5px">
          <Tooltip color="#333333" placement="bottom" title="View Achievement">
            <a href={props.supDoc} target="_blank" rel="noreferrer">
              {" "}
              <img alt="update" src={`${baseUrl}icons/visibility.png`}></img>
            </a>
          </Tooltip>

          <Tooltip
            color="#333333"
            placement="bottom"
            title="Update Achievement"
          >
            <img
              style={{ marginLeft: "4px" }}
              alt="update"
              src={`${baseUrl}icons/editwbg.png`}
            ></img>
          </Tooltip>

          <Tooltip
            color="#333333"
            placement="bottom"
            title="Delete Achievement"
          >
            <Popconfirm onConfirm={() => {deleteHandler(props.achievement.id)}} title="Sure to delete?">
              <img alt="delete" src={`${baseUrl}icons/deletewbg.png`}></img>
            </Popconfirm>
          </Tooltip>
        </Space>
      </div>
    </div>
  );
}

export default Achievement;
