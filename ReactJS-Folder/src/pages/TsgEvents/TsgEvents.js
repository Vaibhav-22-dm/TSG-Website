import React, { useState, useEffect } from 'react'
import LandingPage from "./components/LandingPage"
import classes from "./css/LandingPage.module.css"
import DataLoader from "../../components/DataLoader/DataLoader"
import API from "../../api/index"

export default function TsgEvents() {
  const [data, setdata] = useState(null)
  const [resultdata, setresultdata] = useState(null)
  useEffect(() => {
    API.get("/tsgevents/")
      .then((data) => {
        setdata(data.event_list);
        console.log(data)
      })
      .catch((e) => {
        console.log(e);
      });

    API.get("/tsgeventresults/")
      .then((data) => {
        setresultdata(data.event_list);
        console.log(resultdata)
      })
      .catch((e) => {
        console.log(e);
      });
    
  }, []);
  return (
    <div>
      {data === null || resultdata === null ?  <DataLoader /> : <LandingPage data={data} resultdata={resultdata} />}
    </div>
  )
}
