import React, { useState, useEffect } from "react";
import classes from "../css/Cards.module.css";
import sde from "../images/sde.svg";
import quant from "../images/quant.svg";
import research from "../images/research.svg";
import dataanalytics from "../images/dataanalytics.svg";
import finance from "../images/finance.svg";
import core from "../images/core.svg";
import consulting from "../images/consulting.svg";
import exam from "../images/exam.svg";
import mobilesde from "../images/mobilesde.svg";
import mobilequant from "../images/mobilequant.svg";
import mobileanalytics from "../images/mobileanalytics.svg";
import mobileresearch from "../images/mobileresearch.svg";
import mobilefinance from "../images/mobilefinance.svg";
import mobilecore from "../images/mobilecore.svg";
import mobileconsulting from "../images/mobileconsulting.svg";
import mobileexam from "../images/mobileexam.svg";
import Loader from "../../../QuickInfo/Components/Dep/Loader";
import Info from "./Info";



function Card() {
  let i;
  const [data, setdata] = useState(null);

  useEffect(() => {
    fetch("https://tsg-iitkgp.herokuapp.com/cdc/")
      .then((res) => {
        if (!res.ok) {
          throw Error(res.status);
        }
        return res.json();
      })
      .then((data) => {
        setdata(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [topic, settopic] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  return (
    <>
      {!data && <Loader />}
      <div>
        {data && (
          <div className={classes.container}>
            <a href="#content" className={classes.link}>
              <div
                className={classes.item}
                onClick={() => {
                  settopic([
                    true,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                  ]);
                }}
              >
                {/* <img className={classes.image1} src={mobilesde}></img> */}
                <img className={classes.image} src={sde}></img>
                <p className={classes.heading}>SDE</p>
              </div>
            </a>
            <a href="#content">
              <div
                className={classes.item}
                onClick={() => {
                  settopic([
                    false,
                    true,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                  ]);
                }}
              >
                {/* <img className={classes.image1} src={mobilequant}></img> */}
                <img className={classes.image} src={quant}></img>
                <p className={classes.heading}>Quant</p>
              </div>{" "}
            </a>
            <a href="#content">
              {" "}
              <div
                className={classes.item}
                onClick={() => {
                  settopic([
                    false,
                    false,
                    true,
                    false,
                    false,
                    false,
                    false,
                    false,
                  ]);
                }}
              >
                {/* <img className={classes.image1} src={mobileanalytics}></img> */}
                <img className={classes.image} src={dataanalytics}></img>
                <p className={classes.heading}>Data Analytics</p>
              </div>{" "}
            </a>
            <a href="#content">
              {" "}
              <div
                className={classes.item}
                onClick={() => {
                  settopic([
                    false,
                    false,
                    false,
                    true,
                    false,
                    false,
                    false,
                    false,
                  ]);
                }}
              >
                {/* <img className={classes.image1} src={mobileresearch}></img> */}
                <img className={classes.image} src={research}></img>
                <p className={classes.heading}>Research</p>
              </div>{" "}
            </a>
            <a href="#content">
              {" "}
              <div
                className={classes.item}
                onClick={() => {
                  settopic([
                    false,
                    false,
                    false,
                    false,
                    true,
                    false,
                    false,
                    false,
                  ]);
                }}
              >
                {/* <img className={classes.image1} src={mobilefinance}></img> */}
                <img className={classes.image} src={finance}></img>
                <p className={classes.heading}>Finance</p>
              </div>{" "}
            </a>

            <a href="#content">
              {" "}
              <div
                className={classes.item}
                onClick={() => {
                  settopic([
                    false,
                    false,
                    false,
                    false,
                    false,
                    true,
                    false,
                    false,
                  ]);
                }}
              >
                {/* <img className={classes.image1} src={mobilecore}></img> */}
                <img className={classes.image} src={core}></img>
                <p className={classes.heading}>Core</p>
              </div>{" "}
            </a>

            <a href="#content">
              {" "}
              <div
                className={classes.item}
                onClick={() => {
                  settopic([
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    true,
                    false,
                  ]);
                }}
              >
                {/* <img className={classes.image1} src={mobileconsulting}></img> */}
                <img className={classes.image} src={consulting}></img>
                <p className={classes.heading}>Consulting & FMCG</p>
              </div>{" "}
            </a>

            <a href="#content">
              {" "}
              <div
                className={classes.item}
                onClick={() => {
                  settopic([
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    true,
                  ]);
                }}
              >
                {/* <img className={classes.image1} src={mobileexam}></img> */}
                <img className={classes.image} src={exam}></img>
                <p className={classes.heading}>Government Exams</p>
              </div>{" "}
            </a>
          </div>
        )}
        <Info data={data} topic={topic} />
      </div>
    </>
  );
}
export default Card;
