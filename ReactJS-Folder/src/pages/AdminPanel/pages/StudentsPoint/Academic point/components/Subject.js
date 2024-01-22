import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Accor from "../../../../../StudentPoint/components/Accordion";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Form from "./Form";
import Loader from "../../../../../QuickInfo/Components/Dep/Loader";
import classes from "../css/Subject.module.css";
import dropdown from "../image/dropdown.svg";

export default function Subject(props) {
  const [data, setdata] = useState(props.data.phySem);
  const [heading, setheading] = useState("Physics Semester");
  const [val, setval] = useState("Physics Semester");
  const [depval, setdepval] = useState("none");
  const [course, setcourse] = useState([]);

  let i;
  let a = [];
  const sem = () => {
    a = [];
    for (i = 1; i <= data.length; i++) {
      a[i - 1] = <Accor width="90%" course={data[i - 1].name} />;
    }
    return a;
  };

  let b = props.course.filter((course) => course.includes("5"));

  async function fetchdata(link, sem) {
    let response = await fetch(link);
    let res = await response.json();
    if (sem == 1) {
      setdata(res.autumn);
    }
    if (sem == 0) {
      setdata(res.spring);
    }
  }

  function years(e) {
    setheading(val);
    setdepval(e);
    if (val == "Third Semester") {
      let link = `https://tsg-iitkgp.herokuapp.com/findsubjects/?param=${e}&subparam=2`;
      let sem = 1;
      fetchdata(link, sem);
    }
    if (val == "Forth Semester") {
      let link = `https://tsg-iitkgp.herokuapp.com/findsubjects/?param=${e}&subparam=2`;
      let sem = 0;
      fetchdata(link, sem);
    }
    if (val == "Fifth Semester") {
      let link = `https://tsg-iitkgp.herokuapp.com/findsubjects/?param=${e}&subparam=3`;
      let sem = 1;
      fetchdata(link, sem);
    }
    if (val == "Sixth Semester") {
      let link = `https://tsg-iitkgp.herokuapp.com/findsubjects/?param=${e}&subparam=3`;
      let sem = 0;
      fetchdata(link, sem);
    }
    if (val == "Seventh Semester") {
      let link = `https://tsg-iitkgp.herokuapp.com/findsubjects/?param=${e}&subparam=4`;
      let sem = 1;
      fetchdata(link, sem);
    }
    if (val == "Eighth Semester") {
      let link = `https://tsg-iitkgp.herokuapp.com/findsubjects/?param=${e}&subparam=4`;
      let sem = 0;
      fetchdata(link, sem);
    }
    if (val == "Ninth Semester") {
      let link = `https://tsg-iitkgp.herokuapp.com/findsubjects/?param=${e}&subparam=5`;
      let sem = 1;
      fetchdata(link, sem);
    }
    if (val == "Tenth Semester") {
      let link = `https://tsg-iitkgp.herokuapp.com/findsubjects/?param=${e}&subparam=5`;
      let sem = 0;
      fetchdata(link, sem);
    }
  }
  async function change(e) {
    setcourse([]);

    if (e == "Chemistry Semester") {
      setheading(e);
      setdepval("none");
      setdata(null);
      let response = await fetch(
        "https://tsg-iitkgp.herokuapp.com/findsubjects/?param=default&subparam=null"
      );
      let res = await response.json();

      setdata(res.chemSem);
    } else if (e == "Physics Semester") {
      setheading(e);
      setdepval("none");
      setdata(null);
      let response = await fetch(
        "https://tsg-iitkgp.herokuapp.com/findsubjects/?param=default&subparam=null"
      );
      let res = await response.json();
      setdata(res.phySem);
    } else if (e == "Ninth Semester" || e == "Tenth Semester") {
      setcourse(b);
      setdepval("none");
    } else {
      setcourse(props.course);
    }
  }
  function set(e) {
    if (e == "Third Semester") {
      let link = `https://tsg-iitkgp.herokuapp.com/findsubjects/?param=${depval}&subparam=2`;
      let sem = 1;
      fetchdata(link, sem);
    }
    if (e == "Forth Semester") {
      let link = `https://tsg-iitkgp.herokuapp.com/findsubjects/?param=${depval}&subparam=2`;
      let sem = 0;
      fetchdata(link, sem);
    }
    if (val == "Fifth Semester") {
        let link = `https://tsg-iitkgp.herokuapp.com/findsubjects/?param=${depval}&subparam=3`;
        let sem = 1;
        fetchdata(link, sem);
      }
      if (val == "Sixth Semester") {
        let link = `https://tsg-iitkgp.herokuapp.com/findsubjects/?param=${depval}&subparam=3`;
        let sem = 0;
        fetchdata(link, sem);
      }
      if (val == "Seventh Semester") {
        let link = `https://tsg-iitkgp.herokuapp.com/findsubjects/?param=${depval}&subparam=4`;
        let sem = 1;
        fetchdata(link, sem);
      }
      if (val == "Eighth Semester") {
        let link = `https://tsg-iitkgp.herokuapp.com/findsubjects/?param=${depval}&subparam=4`;
        let sem = 0;
        fetchdata(link, sem);
      }
   
  }
  return (
    <>
      <div className={classes.container}>
        <div className={classes.wrap}>
          <div className={classes.dropdown}>
            <div>
              <select
                id="icon"
                value={val}
                className={classes.select2}
                onChange={(e) => {
                  setval(e.target.value);
                  change(e.target.value);
                  if (depval != "none"&& e.target.value!="Ninth Semester" && e.target.value!="Tenth Semester" ) {
                    setdata(null);
                    setheading(e.target.value);
                    set(e.target.value);
                  }
                }}
              >
                <option value="Physics Semester">Physics Semester</option>
                <option value="Chemistry Semester">Chemistry Semester</option>
                <option value="Third Semester">Third Semester</option>
                <option value="Forth Semester">Forth Semester</option>
                <option value="Fifth Semester">Fifth Semester</option>
                <option value="Sixth Semester">Sixth Semester</option>
                <option value="Seventh Semester">Seventh Semester</option>
                <option value="Eighth Semester">Eighth Semester</option>
                <option value="Ninth Semester">Ninth Semester</option>
                <option value="Tenth Semester">Tenth Semester</option>
              </select>
              <label htmlFor="icon" className={classes.exdrop}>
                <img className={classes.icon} src={dropdown} />
              </label>
            </div>
            <div>
              <select
                id="icon"
                value={depval}
                className={classes.select1}
                onChange={(e) => {
                  setdata(null);
                  years(e.target.value);
                }}
              >
                <option value="none" disabled selected hidden>
                  Choose Course
                </option>
                {course.map((e) => {
                  return <option value={e}>{e}</option>;
                })}
              </select>
              <label htmlFor="icon" className={classes.exdrop}>
                {" "}
                <img className={classes.icon} src={dropdown} />{" "}
              </label>
            </div>
          </div>
          <div>
            {" "}
            <div className={classes.heading}>{heading} </div>
            {!data && (
              <div className={classes.preloader}>
                <Loader />
              </div>
            )}
            {data && <div className={classes.display}>{sem()}</div>}{" "}
          </div>
        </div>
        <div className={classes.wrap1}>
          <Form course={props.course} b={b} />
        </div>
      </div>
    </>
  );
}
