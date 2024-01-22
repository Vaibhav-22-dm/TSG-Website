import React from "react";
import "./css/EventsHelper.css";
import API from "../../../api"
import { useState, useEffect } from 'react'
import Loader from "../../../components/DataLoader/Loader";

export default function EventsHelper({ props, month, date }) {
  const [day, setDate] = useState(props.Date)
  const [mon, setMon] = useState(props.Day)
  const [year, setYear] = useState(props.Year)
  const [loading, setloading] = useState(true)
  console.log(day, mon, year, " - ", props.Date, props.Day, props.Year)
  console.log(month, date)
  console.log(props)
  const [Events, setEvents] = useState([])
  useEffect(() => {
    setloading(true)
    API.get('/event_list/?param=date&subparam=' + props.Year + '-' + props.Day + '-' + props.Date)
      // API.get('/event_list/?param=date&subparam=2021-12-16')
      .then(res => {
        console.log(res.data)
        setEvents(res.data['event_list'])
        console.log(Events[0].id)
        setloading(false)
      })
      .catch(err => {
        console.log(err)
        setloading(false)
      })
  }, [props])



  return (
    <div className="EventContainer">
      { loading ? <Loader style={{verticalAlign:"center"}} /> : Events.length===0? <div style={{width:"300px",height:"300px",margin:"auto"}}> <img src="https://raw.githubusercontent.com/TSG-Website/media/b41456f206d423d041b7b4e09eaf243990ed3f24/SocietyEvents/nodata.svg" style={{width:"100%",height:"100%"}}/>  </div> : Events.map((item) =>
        <li className="EventsHelper" key={item.id}>
          <img src="./assets/images/home/EventName.png" className="EventImg"></img>
          <div className="EventsText">
            <p className="EventTitle">{item.eventName}</p>
            <p className="EventDetail">{item.eventDate.slice(0, 10)} | {item.eventDate.slice(11, 19)}</p>
          </div>
        </li>)
      }
    </div>
  );
}

