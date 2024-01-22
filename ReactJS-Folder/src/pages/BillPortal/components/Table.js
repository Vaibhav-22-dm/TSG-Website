import React from "react";
import Loader from "../../../components/DataLoader/Loader";
import classes from "./css/Table.module.css";
import { useState, useEffect } from "react";
import API from "../../../api";
export default function Table({ bills, isLoading, setBill }) {
  const [allEventOfSoc, setAllEventOfSoc] = useState([]);

  const baseUrl = process.env.REACT_APP_ASSETS_BASEURL;
  const token = localStorage.getItem("token");
  useEffect(() => {
    API.post("getsocevent/", { token })
      .then((res) => {
        setAllEventOfSoc(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);
  const checkNull=(e)=>{
    return e!==null?e:"";
  }
  const findEvent = (e) => {
    console.log(e);
    const temp = allEventOfSoc.find((item) => {
      return item.id == e.id;
    });
    console.log(temp);
    return checkNull(temp.eventName);
  };


  const returnDate=(date)=>{
    var utcDate = date; // ISO-8601 formatted date returned from server
    var localDate = new Date(utcDate);
    localDate = localDate.toString();
    let datetime = localDate.split(" ");
    let day = datetime[0];
    let month = datetime[1];
    let year = datetime[3].slice(2, 4);
    let time = datetime[4].slice(0, 5);
    let hours = time.slice(0, 2);
    let minutes = time.slice(3, 5);
    var newformat = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return ` ${datetime[2]} ${month} ${year}`;
  }
  return (
    <>
      <div className={classes.tableContainer}>
        {isLoading ? (
          <Loader />
        ) : (
          <table className={classes.billsTable}>
            <thead>
              <tr>
                <th className={classes.tableEventHead}>Event</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bills &&
                bills.map((bill) => (
                  <tr key={bill.id}>
                    <td className={classes.tableEventName}>
                      {findEvent(bill.event)}
                    </td>
                    <td className={classes.tableStatusButton}>
                      {bill.status == "PENDING" ? (
                        <button
                          className={classes.statusButton}
                          style={{ background: "#FE8D5B" }}
                        >
                          {bill.status}
                        </button>
                      ) : bill.status == "DECLINE" ? (
                        <button
                          className={classes.statusButton}
                          style={{ background: "#EC566E" }}
                        >
                          {bill.status}
                        </button>
                      ) : (
                        <button
                          className={classes.statusButton}
                          style={{ background: "#22C275" }}
                        >
                          {bill.status}
                        </button>
                      )}
                    </td>
                    <td className={classes.tableEventDate}>{returnDate(bill.date)}</td>
                    <td className={classes.tableEventView}>
                      <button
                        className={classes.viewButton}
                        onClick={() => {
                          setBill(bill);
                        }}
                      >
                        i
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
