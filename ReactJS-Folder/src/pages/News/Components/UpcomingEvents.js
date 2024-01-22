import React from "react";
import EventItem from "./EventItem";
import classes from './UpcomingEvents.module.css'

function UpcomingEvents({events}) {
  return (
    <div className={classes.events_container}>
      <h2>
        Upcoming Events
      </h2>
      <ul className={classes.events_list}>
        {events.map(event => <EventItem title={event.eventName} key={event.id} id={event.id} />)}
      </ul>
    </div>
  );
}

export default UpcomingEvents;
