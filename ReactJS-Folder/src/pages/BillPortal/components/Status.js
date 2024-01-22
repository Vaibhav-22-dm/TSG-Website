import React from "react";
import classes from "./css/Status.module.css";
import Loader from "../../../components/DataLoader/Loader";

export default function Status({ bill, isLoading }) {
  const baseUrl = process.env.REACT_APP_ASSETS_BASEURL;
  console.log(bill);

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
    return `${day} \xa0 ${hours}:${minutes} ${newformat} \xa0 ${datetime[2]} ${month} ${year}`;
  }
  const checkNull=(e)=>{
    return e!==null?e:"";
  }
  return (
    <>
      <div className={classes.statusContainer}>
        <h2 className={classes.statusHeader}>Status</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.infoBox}>
            <div className={classes.billInfo}>
              <div className={classes.billHeader}>
                <div className={classes.billDataBox}>
                  <h3 className={classes.billEventName}>
                    Entrepreneurship Awareness Drive
                  </h3>
                  <div className={classes.billDateBox}>
                    <img
                      className={classes.calenderIcon}
                      src={`${baseUrl}icons/date_range.png `}
                    ></img>
                    <p className={classes.billDate}>{returnDate(checkNull(bill.date))}</p>
                  </div>
                </div>
                <div className={classes.billIcon}>
                  <img
                    className={classes.billIconImage}
                    src={`${baseUrl}icons/billLogoFull.png`}
                  ></img>
                </div>
              </div>

              {bill.status === "PENDING" ? (
                <div className={classes.billStages}>
                  <div className={classes.stage}>
                    <div className={classes.stageHeader}>
                      <img
                        className={classes.checkBox}
                        src={`${baseUrl}icons/checkBoxTick.png`}
                      ></img>
                      <div className={classes.stageName}>Bill Submission</div>
                    </div>
                    <button
                      className={classes.stageButton}
                      style={{ backgroundColor: "#22C275" }}
                    >
                      Completed
                    </button>
                  </div>

                  <div
                    className={classes.stageLine}
                    style={{ borderColor: "#06BA38" }}
                  ></div>
                  <div className={classes.stage}>
                    <div className={classes.stageHeader}>
                      <img
                        className={classes.checkBox}
                        style={{ marginLeft: "-3px" }}
                        src={`${baseUrl}icons/checkBoxTwo.png`}
                      ></img>
                      <div
                        className={classes.stageName}
                        style={{ color: "#7694FF" }}
                      >
                        Application Review
                      </div>
                    </div>
                    <button
                      className={classes.stageButton}
                      style={{ backgroundColor: "#FE8D5B" }}
                    >
                      Progress
                    </button>
                  </div>
                  <div
                    className={classes.stageLine}
                    style={{ borderColor: "#C4C4C4" }}
                  ></div>

                  <div className={classes.stage}>
                    <div className={classes.stageHeader}>
                      <img
                        className={classes.checkBox}
                        style={{ marginLeft: "-3px" }}
                        src={`${baseUrl}icons/checkBoxThree.png`}
                      ></img>
                      <div
                        className={classes.stageName}
                        style={{ color: "#C4C4C4" }}
                      >
                        Verification
                      </div>
                    </div>
                  </div>
                </div>
              ) : bill.status === "Verified" ? (
                <div className={classes.billStages}>
                  <div className={classes.stage}>
                    <div className={classes.stageHeader}>
                      <img
                        className={classes.checkBox}
                        src={`${baseUrl}icons/checkBoxTick.png`}
                      ></img>
                      <div className={classes.stageName}>Bill Submission</div>
                    </div>
                    <button
                      className={classes.stageButton}
                      style={{ backgroundColor: "#22C275" }}
                    >
                      Completed
                    </button>
                  </div>

                  <div
                    className={classes.stageLine}
                    style={{ borderColor: "#06BA38" }}
                  ></div>
                  <div className={classes.stage}>
                    <div className={classes.stageHeader}>
                      <img
                        className={classes.checkBox}
                        src={`${baseUrl}icons/checkBoxTick.png`}
                      ></img>
                      <div className={classes.stageName}>
                        Application Review
                      </div>
                    </div>
                    <button
                      className={classes.stageButton}
                      style={{ backgroundColor: "#22C275" }}
                    >
                      Completed
                    </button>
                  </div>
                  <div
                    className={classes.stageLine}
                    style={{ borderColor: "#06BA38" }}
                  ></div>

                  <div className={classes.stage}>
                    <div className={classes.stageHeader}>
                      <img
                        className={classes.checkBox}
                        src={`${baseUrl}icons/checkBoxTick.png`}
                      ></img>
                      <div className={classes.stageName}>Verification</div>
                    </div>
                    <button
                      className={classes.stageButton}
                      style={{ backgroundColor: "#22C275" }}
                    >
                      Completed
                    </button>
                  </div>
                </div>
              ) : (
                <div className={classes.billStages}>
                  <div className={classes.stage}>
                    <div className={classes.stageHeader}>
                      <img
                        className={classes.checkBox}
                        src={`${baseUrl}icons/checkBoxTick.png`}
                      ></img>
                      <div className={classes.stageName}>Bill Submission</div>
                    </div>
                    <button
                      className={classes.stageButton}
                      style={{ backgroundColor: "#22C275" }}
                    >
                      Completed
                    </button>
                  </div>

                  <div
                    className={classes.stageLine}
                    style={{ borderColor: "#06BA38" }}
                  ></div>
                  <div className={classes.stage}>
                    <div className={classes.stageHeader}>
                      <img
                        className={classes.checkBox}
                        src={`${baseUrl}icons/checkBoxTick.png`}
                      ></img>
                      <div className={classes.stageName}>
                        Application Review
                      </div>
                    </div>
                    <button
                      className={classes.stageButton}
                      style={{ backgroundColor: "#22C275" }}
                    >
                      Completed
                    </button>
                  </div>
                  <div
                    className={classes.stageLine}
                    style={{ borderColor: "#EC566E" }}
                  ></div>

                  <div className={classes.stage}>
                    <div className={classes.stageHeader}>
                      <img
                        className={classes.checkBox}
                        style={{ marginLeft: "-3px" }}
                        src={`${baseUrl}icons/checkBoxThreeRed.png`}
                      ></img>
                      <div
                        className={classes.stageName}
                        style={{ color: "#EC566E" }}
                      >
                        Verification
                      </div>
                    </div>
                    <button
                      className={classes.stageButton}
                      style={{ backgroundColor: "#EC566E" }}
                    >
                      Declined
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className={classes.currentStatus}>
              <img
                className={classes.billCurrentStatusImageBig}
                src={`${baseUrl}SocietyEvents/${
                  bill.status === "Verified"
                    ? "billVerify.png"
                    : "billReview.png"
                }`}
              ></img>
              {bill.status === "PENDING" ? (
                <div className={classes.billRemarks}>
                  <div className={classes.billReview}>
                    <img
                      className={classes.billReviewIcon}
                      src={`${baseUrl}icons/eyeIcon.png`}
                    ></img>
                  </div>
                  <div className={classes.billCurrentStatusHeading}>
                    TSG officials are verifying your bill
                  </div>
                  <div className={classes.billCurrentStatusFeedback}>
                    Your bills are being reviewed by the Gymkhana Officials,
                    this might take some time to process
                  </div>
                </div>
              ) : bill.status === "Verified" ? (
                <div className={classes.billRemarks}>
                  <img
                    className={classes.billCurrentStatusImage}
                    src={`${baseUrl}icons/largeTick.png`}
                  ></img>
                  <div className={classes.billCurrentStatusHeading}>
                    Verified
                  </div>
                  <div className={classes.billCurrentStatusFeedback}>
                    Feedback: {checkNull(bill.remarks)}
                  </div>
                </div>
              ) : (
                <div className={classes.billRemarks}>
                  <img
                    className={classes.billCurrentStatusImage}
                    src={`${baseUrl}icons/largeCross.png`}
                  ></img>
                  <div className={classes.billCurrentStatusHeading}>
                    Declined
                  </div>
                  <div className={classes.billCurrentStatusFeedback}>
                    Feedback: {checkNull(bill.remarks)}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
