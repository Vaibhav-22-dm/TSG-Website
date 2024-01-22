import React from "react";
import moment from "moment";
import "./css/Events.css";
import EventHelper from './EventsHelper'
import Calendar from "./Calendar";


function Events({selectedMode}) {

  
  var month = null
  if(selectedMode.Day == 'January') month = '01'
  else if(selectedMode.Day == 'February') month = '02'
  else if(selectedMode.Day == 'March') month = '03'
  else if(selectedMode.Day == 'April') month = '04'
  else if(selectedMode.Day == 'May') month = '05'
  else if(selectedMode.Day == 'June') month = '06'
  else if(selectedMode.Day == 'July') month = '07'
  else if(selectedMode.Day == 'August') month = '08'
  else if(selectedMode.Day == 'September') month = '09'
  else if(selectedMode.Day == 'October') month = '10'
  else if(selectedMode.Day == 'November') month = '11'
  else if(selectedMode.Day == 'December') month = '12'

  var date = null
  if(selectedMode.Date < 10) date = '0' + selectedMode.Date;
  else date = selectedMode.Date;


  return (
    <div className="EventsCard">
      <p className="EventsTop">Events</p>
      <div className="DayContainer">
        <p className="CurrentDay">
          {selectedMode.Date} {selectedMode.Day} {selectedMode.Year}
        </p>
      </div>
      <div className="EventContainer">
        <EventHelper props={selectedMode} month={month} date={date}/>
      </div>
    </div>
  );
}

export default Events;
