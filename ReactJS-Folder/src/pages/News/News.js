import React, { useState, useCallback, useEffect } from "react";
import classes from "./News.module.css";
import NewsBulletinList from "./Components/NewsBulletinList";
import UpcomingEvents from "./Components/UpcomingEvents";
import API from "../../api";
import DataLoader from "../../components/DataLoader/DataLoader";
import Header from "./../QuickInfo/Components/Header/Header"


export default function News() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(false);

  const fetchNews = useCallback(async () => {
    setNewsLoading(true);
    try {
      const newsData = await API.get("/news");
      console.log(newsData);
      setNews(newsData.data.slice(0,5));
      setNewsLoading(false);
    } catch (err) {
      setNewsLoading(false);
    }
  }, []);

  const fetchEvents = useCallback(async () => {
    setEventsLoading(true);
    try {
      const eventsData = await API.get("/event");
      console.log(eventsData);
      setEvents(eventsData.data.slice(0, 5));
      setEventsLoading(false);
    } catch (err) {
      setEventsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
    fetchEvents();
  }, [fetchNews, fetchEvents]);

  if (newsLoading || eventsLoading) {
    return <DataLoader />;
  }
  return (
    <>
      <div className={classes.newsContainer}>
        <Header label="News"  hide={true}/>
        <div className={classes.landingLayout}>
          <img alt="events" src={`https://raw.githubusercontent.com/TSG-Website/media/58050893b550a5fcf5ae1b8b6b135ca90c48fa06/QuickInfo/desktopview/pagebanners/newsbulletin.svg`} className={classes.eventSvg} />
          <img alt="events" src={`https://raw.githubusercontent.com/TSG-Website/media/58050893b550a5fcf5ae1b8b6b135ca90c48fa06/QuickInfo/mobileview/pagebanner/newsbulletin.svg`} className={classes.eventSvgMobile} />
        </div>
        <div className={classes.main_news}>
          <NewsBulletinList news={news} />
          <UpcomingEvents events={events} />
        </div>
      </div>
    </>
  );
}
