import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./mainlayout.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import Topbar from "./Topbar/Topbar";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useSelector, useDispatch } from "react-redux";
import AdminApp from "../AdminApp";
import SearchIcon from "../components/Search/SearchIcon";
export default function MainLayout(props) {
  const currentUser = useSelector(state => state.auth.currentUser);
  const userType = currentUser?.user_type;

  // const {tabs } = tabdata();
  // if(props.tabs.length===9){

  //   if (userType==="student") {
  //    props.tabs.pop()
  //   }

  // }

  const matches = useMediaQuery("(min-width:600px)");
  const [activeTab, setActiveTab] = useState(1);
  const changeTab = tab => {
    setActiveTab(tab);
  };
  return (
    <>
      <SearchIcon />
      <div className={matches ? styles.mainContent : ""}>
        {matches && (
          <Sidebar
            tabs={props.tabs}
            activeTab={activeTab}
            isAdmin={props.isAdmin}
            changeTab={changeTab}
          />
        )}
        {!matches && (
          <Topbar
            tabs={props.tabs}
            activeTab={activeTab}
            isAdmin={props.isAdmin}
            changeTab={changeTab}
          />
        )}
      </div>
    </>
  );
}
