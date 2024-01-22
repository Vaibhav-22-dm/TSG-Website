import React from "react";
import moment from "moment";
import "./css/Calendar.css";

export default class Calendar extends React.Component {
  weekdayshort = moment.weekdaysShort();

  state = {
    dateObject: moment(),
    allmonths: moment.months(),
    selectedDay: null,
  };
  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };
  year = () => {
    return this.state.dateObject.format("Y");
  };
  currentDay = () => {
    return this.state.dateObject.format("D");
  };
  currentMonth = () => {
    return this.state.dateObject.format("M");
  };
  currentYear = () => {
    return this.state.dateObject.format("Y");
  };
  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject).startOf("month").format("d"); 
    return firstDay;
  };
  month = () => {
    console.log(this.state.dateObject.format("MMMM"));
    return this.state.dateObject.format("MMMM");
  };
  onPrev = () => {
    let curr = "";
    if (this.state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.subtract(1, curr),
    });
  };
  onNext = () => {
    let curr = "";
    if (this.state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.add(1, curr),
    });
  };
  getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray;
  }

  // This function would be used to integrate with the event container
  onDayClick = (e, d) => {
  
  this.props.setSelectedMode({Date: d, Day:this.month(), Year:this.year()});
    this.setState(
      {
        selectedDay: d,
      },
      () => {
        console.log("SELECTED DAY: ", this.state.selectedDay,"SELECTED Year: ",  this.year(),"SELECTED MONTH: ",  this.month());
      }
    );
  };

  render() {
    let weekdayshortname = this.weekdayshort.map((day) => {
      return <th key={day}>{day}</th>;
    });
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="calendar-day empty">{""}</td>);
    }
    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = 0;
      daysInMonth.push(
        <td key={d} className={`calendar-day ${currentDay}`}            
        onClick={(e) => {
          this.onDayClick(e, d);
        }}>
          <span>
            {d}
          </span>
        </td>
      );
    }
    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <div className="tail-datetime-calendar">
        <div className="calendar-head">Calender</div>
        <div className="calendar-navi">
          <span
            onClick={(e) => {
              this.onPrev();
            }}
            className="calendar-button button-prev" style={{cursor:"pointer"}}
          >
            <img src="./assets/images/button/rightButton.png" className="leftarrow"></img>
        </span>
          <span className="calendar-label">{this.month()}</span>
          <span className="calendar-label">{this.year()}</span>
          <span
            onClick={(e) => {
              this.onNext();
            }}
            className="calendar-button button-next" style={{cursor:"pointer"}}
          >
          <img src="./assets/images/button/rightButton.png"></img>
        </span>
        </div>
        <div className="calendar-date">
          <table className="calendar-day">
            <thead>
              <tr>{weekdayshortname}</tr>
            </thead>
            <tbody>{daysinmonth}</tbody>
          </table>
        </div>
      </div>
    );
  }
}