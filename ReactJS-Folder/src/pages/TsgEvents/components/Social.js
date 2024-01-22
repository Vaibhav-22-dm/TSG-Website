


import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import EventCard from "./EventCard"
import classes from "../css/technology.module.css"
import SideContent from "./SideContent"
import back from "../image/back.svg"
import useMediaQuery from '@mui/material/useMediaQuery';
import DataLoader from "../../../components/DataLoader/DataLoader"
import API from "../../../api/index"
function Social() {
  const [data, setdata] = useState(null);
  useEffect(() => {
    API.get("/tsgevents/?param=socult")
      .then((res) => {
        setdata(res.data.event_list);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [active, setactive] = useState([false, true, false, false])
  const matches = useMediaQuery('(min-width:820px)');
  return (<>
    {
      data === null ?
        <DataLoader />
        :
        <div>
          <div className={classes.heading}><span className={classes.events}>Social Events</span><Link to="/events" className={classes.back} ><img src={back}></img></Link></div>
          <div className={classes.content}>
            <div className={classes.conone}>
              {data &&
                data.map((e) => {
                  return (<EventCard name={e.eventName} about={e.about} left={e.daysLeft} poster={e.poster} tag={e.tags[0]} id={e.id} />)
                })
              }
            </div>
            {matches && <div className={classes.contwo} >
              <SideContent active={active} />
            </div>}
          </div>
        </div>
      }
  </>
  )
}
export default Social;