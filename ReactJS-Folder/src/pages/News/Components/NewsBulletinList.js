import React from "react";
import classes from "./NewsBulletinList.module.css";
import TuneIcon from "@mui/icons-material/Tune";
import NewsItem from "./NewsItem";

function NewsBulletinList({ news }) {
  return (
    <div className={classes.list_container}>
      <div className={classes.bulletin_top}>
        <h2>News Bulletin</h2>
        {/* <div className={classes.bulletin_top_right}>
          <span className={classes.bulletin_last_updated}>07, Nov, 2021</span>
          <span className={classes.tune_icon}>
            <TuneIcon />
          </span>
        </div> */}
      </div>
      <ul className={classes.news_list}>{news.map(item => <NewsItem newsItem={item} key={item.id}/>)}</ul>
    </div>
  );
}

export default NewsBulletinList;
