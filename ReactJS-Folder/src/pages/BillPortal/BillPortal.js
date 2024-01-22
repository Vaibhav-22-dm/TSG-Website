import React from "react";
import classes from "./BillPortal.module.css";
import BillForm from "./components/BIllForm";
import Status from "./components/Status";
import Table from "./components/Table";
import API from "../../api";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BillPortal() {
  const [bills, setBills] = useState([]);
  const [activeBill, setActiveBill] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.auth.currentUser);
  const token = useSelector((state) => state.auth.token);
  const page_size = 10;
  const [isClicked, setIsClicked] = useState(false);

  const baseUrl = process.env.REACT_APP_ASSETS_BASEURL;

  const fetchBills = () => {
    API.post("fetchbill/", { token, page_size })
      .then((res) => {
        console.log(res.data);
        setBills(res.data["results"]);
        setActiveBill(res.data["results"].length > 0 ? res.data["results"][0] : []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchBills();
  }, []);

  function openForm() {
    console.log(isClicked);
    setIsClicked(true);
    console.log(isClicked);
  }

  const goToBack = (e) => {
    e.preventDefault();
    window.history.back();
  };

  return (
    <>
      <div className={classes.billHeader}>
        <h1>Bill Reimbursement Portal</h1>
        <div className={classes.buttonContainer}>
          <button
            className={classes.billButton}
            variant="contained"
            onClick={openForm}
          >
            Apply
          </button>
          <Link to={"../socpoint/"} className={classes.backButton}>
            <ArrowBackIcon style={{ color: "white" }} />
          </Link>
        </div>
        {/* <button className={classes.billButton} variant="contained" > Bill Reimbursement </button> */}
      </div>
      <div className={classes.billPortalContainer}>
        <div className={classes.statusAndTableContainer}>
          <Status bill={activeBill} isLoading={isLoading} />
          <Table bills={bills} isLoading={isLoading} setBill={setActiveBill} />
        </div>
        {/* <div className={classes.billFormContainer}>
          <BillForm setIsClicked={setIsClicked} />
        </div> */}
      </div>
      {isClicked ? (
        <div className={classes.overlayContainer}>
          <div className={classes.overlayForm}>
            <img
              className={classes.closeButton}
              src={`${baseUrl}icons/closeButtonWhite.png `}
              onClick={() => setIsClicked(false)}
              alt=""
            ></img>
            <BillForm setIsClicked={setIsClicked} />
          </div>
        </div>
      ) : null}
    </>
  );
}
