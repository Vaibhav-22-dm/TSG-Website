import React, { useCallback, useEffect, useState } from "react";
import classes from "../css/Home.module.css";
import { useNavigate } from "react-router-dom";
import EventItem from "../../News/Components/EventItem";
import API from "../../../api";
import NewsItem from "./NewsItem";
import Loader from "../../../components/DataLoader/Loader";

function NewsBulletin() {
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(false);

  const fetchNews = useCallback(async () => {
    setNewsLoading(true);
    try {
      const newsData = await API.get("/news");
      console.log(newsData);
      setNews(newsData.data.slice(0,4));
      setNewsLoading(false);
    } catch (err) {
      console.log(err);
      setNewsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);
  const navigate = useNavigate();

  return (
    <div
      className={classes.cardsLayout}
      onClick={() => navigate("/news")}
      style={{ cursor: "pointer" }}
    >
      <h3 className={classes.cardNewsText}>News Bulletin</h3>
      {newsLoading ? (
        <Loader />
      ) : (
        <ul style={{ paddingLeft: 0 }}>
          {news.map(newsItem => (
            <NewsItem
              title={newsItem.title}
              key={newsItem.id}
              id={newsItem.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default NewsBulletin;
