import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import classes from "../css/Event.module.css";
import TimerIcon from "@mui/icons-material/Timer";
import API from "../../../api";
import DataLoader from "../../../components/DataLoader/DataLoader";
import { monthNames } from "../../News/monthNames";

function Event() {
  const { id } = useParams();
  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchEventData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get(`/event/${id}`);
      console.log(response.data);
      setLoading(false);
      setEventData(response.data);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    fetchEventData();
  }, [fetchEventData]);

  if (loading) {
    return <DataLoader />;
  }

  let regDeadline;

  if (eventData.regDeadline) {
    const dateObj = new Date(eventData.regDeadline);
    const date = dateObj.getDate();
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    regDeadline = `${date} ${month} ${year}`;
  }

  if (eventData) {
    return (
      <>
        <div className={classes.wrapper}>
          <div className={classes.top}>
            <h1>Events</h1>
          </div>
        </div>
        {/* <div className={classes.hackathon_landing}>
          <div className={classes.left_landing}>
            <p className={classes.hackathon_heading}>{eventData.eventName}</p>
            <p className={classes.hackathon_text}>{eventData.about}</p>
            <div className={classes.reg_deadline}>
              <div className={classes.timer}>
                <TimerIcon />
              </div>
              <div>{regDeadline}</div>
            </div>
            <div className={classes.register_btn}>
              <button>Register Now</button>
            </div>
          </div>
          <div className={classes.right_landing}>
            <img
              src={
                eventData.posterImage
                  ? eventData.posterImage
                  : "https://picsum.photos/1000/1000"
              }
            />
          </div>
        </div> */}
        <div className={classes.landing2}>
          <div className={classes.landing2_image}>
            <img src={'http://127.0.0.1:8000/' +eventData.posterImage} />
          </div>
          <div className={classes.landing_info}>
            {/* <div></div> */}
            <h2 className={classes.landing2_heading}>{eventData.eventName}</h2>
            <div className={classes.landing2_info_main}>
              <div className={classes.reg_deadline}>
                <div className={classes.timer}>
                  <TimerIcon />
                </div>
                <div>{regDeadline}</div>
              </div>
              <div className={classes.register_btn}>
                <button>Register Now</button>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.hackathon_info}>
            <div className={classes.info_container}>
              <div className={classes.info_heading}>Description</div>
              <p>{eventData.about}</p>
            </div>
            <div className={classes.info_container}>
              <div className={classes.info_heading}>Terms & Condition</div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a
                galley. Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
                Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
              </p>
            </div>
            <div
              className={classes.info_container}
              style={{ marginBottom: "0" }}
            >
              <div className={classes.info_heading}>Who can Participate?</div>
              <p>
                <ul>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </li>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </li>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </li>
                </ul>
              </p>
            </div>
          </div>
          <div className={classes.hackathon_info} style={{ marginTop: "2rem" }}>
            <div className={classes.info_heading}>Contact Info</div>
            <div className={classes.contact_container}>
              {eventData.contacts &&
                eventData.contacts.map(contact => (
                  <div className={classes.contact}>
                    <div className={classes.contact_img}>
                      <img
                        src={
                          contact.profile_pic
                            ? contact.profile_pic
                            : "https://picsum.photos/500/500"
                        }
                      />
                    </div>
                    <div className={classes.contact_info}>
                      <div style={{ color: "#000", fontWeight: "bold" }} className={classes.contact_name}>
                        {contact.first_name}{" "}
                        {contact.middle_name ? contact.middle_name : ""}{" "}
                        {contact.last_name}
                      </div>
                      <p>{contact.email}</p>
                      <p>{contact.phone}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Event;
