import React from "react";
export default function Data() {




  const grievances = [

    {
      sr: 1,
      id: "2021.07.1042",
      subject: "Lorem Ipsum is",
      description: "Lorem Ipsum is simply dummy text of line",
      date: "2021-07-10",
      status: "complete",
      feedback: "Feedback",
    },
    {
      sr: 2,
      id: "2021.07.1042",
      subject: "Lorem Ipsum is",
      description: "Lorem Ipsum is simply dummy text of line",
      date: new Date(),
      status: "complete",
      feedback: "Feedback",
    },
    {
      sr: 3,
      id: "2021.07.1042",
      subject: "Lorem Ipsum is",
      description: "Lorem Ipsum is simply dummy text of line",
      date: new Date(),
      status: "complete",
      feedback: "Feedback",
    },
  ];
  const fields = [
    { title: "#", dataIndex: "sr", key: "sr", width: "auto" },
    { title: "Griv./Comp. No", dataIndex: "id", key: "id", width: "auto" },
    { title: "Subject", dataIndex: "subject", key: "Subject", width: "auto" },
    { title: "Description", dataIndex: "description", key: "Description", width: "auto" },
    { title: "Date", dataIndex: "date", key: "Date", width: "auto" },
    { title: "Status", dataIndex: "status", key: "Status", width: "auto" },
    { title: "Feedback", dataIndex: "feedback", key: "Feedback", width: "auto" },
  ];
  // const columns = [
  //   { title: "Name", dataIndex: "name", key: "name", width: 150 },
  //   { title: "POR", dataIndex: "por", key: "por", width: 150 },]
  return { grievances, fields };
}
