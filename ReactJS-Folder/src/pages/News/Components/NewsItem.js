import TodayIcon from "@mui/icons-material/Today";
import { Button } from "@mui/material";
import React, { useState } from "react";
import classes from "./NewsItem.module.css";
import Modal from "../../../containers/Modal/Modal";
import { monthNames } from "../monthNames";
import truncate from "../truncateString";

function NewsItem({ newsItem }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const newsDateObject = new Date(newsItem.date);
  const date = newsDateObject.getDate();
  const month = newsDateObject.getMonth();
  const monthName = monthNames[month];
  const year = newsDateObject.getFullYear();
  const content = ""

  const modalOpenHandler = () => {
    setIsModalOpen(true);
  };

  const modalCloseHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <li className={classes.news_item} onClick={modalOpenHandler}>
        <img
          src={
            newsItem.image ? 'http://127.0.0.1:8000/'+newsItem.image : "https://picsum.photos/600/600"
          }
          className={classes.image}
        />
        <div className={classes.news_content}>
          <h2 style={{ marginBottom: "5px", marginTop: "0" }}>
            {newsItem.title}
          </h2>
          <div className={classes.line}></div>
          <p className={classes.description}>
            {/* {newsItem.content.slice(0, 200)} */}
            {truncate(newsItem.content, 200, true)}
          </p>
          <div className={classes.bottom}>
            <div className={classes.date}>
              <span className={classes.calendar}>
                <TodayIcon />
              </span>{" "}
              {date} {monthName} {year}
            </div>
            <div className={classes.readMoreContainer}>
              <Button
                variant="contained"
                className={classes.more}
                onClick={modalOpenHandler}
                onClose={modalCloseHandler}
              >
                Read more
              </Button>
            </div>
          </div>
        </div>
      </li>
      {isModalOpen && (
        <Modal onClose={modalCloseHandler}>
          <div className={classes.modal_container}>
            <div className={classes.modal_top}>
              <h2 style={{ margin: "0" }}>{newsItem.title}</h2>
              <div className={classes.date}>
                <span className={classes.calendar}>
                  <TodayIcon />
                </span>{" "}
                {date} {monthName} {year}
              </div>
            </div>
            <div className={classes.line}></div>
            <div className={classes.modal_main}>
              <img
                className={classes.modal_img}
                src={
                  newsItem.image
                    ? 'http://127.0.0.1:8000/'+newsItem.image
                    : "https://picsum.photos/600/600"
                }
              />
              {/* <p>{newsItem.content}</p> */}
              <p
                dangerouslySetInnerHTML={{
                  __html: newsItem.content
                }}>
              </p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default NewsItem;
