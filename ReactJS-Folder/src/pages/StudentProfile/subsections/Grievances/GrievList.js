import React, { useEffect, useState } from "react";
import classes from "../../profile.module.css";
// import Data from './Data';
import useMediaQuery from "@mui/material/useMediaQuery";

import { Table } from "antd";
import API from "../../../../api";
import { useSelector } from "react-redux";
// import { DataGrid } from '@mui/x-data-grid';
export default function GrievList() {
  const matches = useMediaQuery("(max-width:1040px)");
  const state = useSelector((state) => state.auth);
  const token = state.token;
  const [grievance, setGrievance] = useState([]);
  useEffect(() => {
    API.post("grievance/all/", { token, page_size: 100 })
      .then((res) => {
        console.log(res.data);
        setGrievance(res.data["results"]);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  const grievances = grievance.filter((item,index) => {
    return {
      sr: index+1,
      id: item.id,
      subject: item.subject,
      description: item.desc,
      status: item.status,
      feedback: item.feedback,
      date: item.date,
    };
  });

  const fields = [
    { title: "#", dataIndex: "sr", key: "sr", width: "auto" },
    { title: "Griv./Comp. No", dataIndex: "id", key: "id", width: "auto" },
    { title: "Subject", dataIndex: "subject", key: "Subject",ellipis:true, width: "auto" },
    {
      title: "Description",
      dataIndex: "description",
      key: "Description",
      width: "auto",
    },
    { title: "Date", dataIndex: "date", key: "Date", width: "auto" },
    { title: "Status", dataIndex: "status", key: "Status", width: "auto" },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "Feedback",
      width: "auto",
    },
  ];
  // const columns = fields;
  const rows = grievances;
  console.log(rows);
  return (
    <div className="grievenceTable">
      <Table
        columns={fields}
        dataSource={grievances}
        pagination={false}
        scroll={matches ? { x: "fit-content" } : {}}
      />
    </div>
  );
}
