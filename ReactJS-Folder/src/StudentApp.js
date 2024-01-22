import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import MainLayout from "./containers/MainLayout";
import Topnav from "./pages/Home/Components/NavWithoutLogin";
import "./App.css";
import Footer from "./components/Footer/Footer";
import PublicHome from "./pages/Home/PublicHome";
import { useSelector, useDispatch } from "react-redux";
import { checkUserAuth } from "./redux/features/login";
import tabdata from "./tabdata";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Routes, Route, Navigate } from "react-router-dom";
import styles from "./containers/mainlayout.module.css";
import PreLoader from "./components/PreLoader/PreLoader";
import CareerPoint from "./pages/StudentPoint/CareerPoint/CareerPoint";
import Technology from "./pages/TsgEvents/components/Technology";
import Event from "./pages/TsgEvents/components/Event";
import PageNotFound from "./components/404";
import { showAdminApp, hideAdminApp } from './redux/features/admin'
import Social from "./pages/TsgEvents/components/Social";
import Sports from "./pages/TsgEvents/components/Sports";
import Welfare from "./pages/TsgEvents/components/Welfare";
import Result from "./pages/TsgEvents/components/Result";
import BillPortal from "./pages/BillPortal/BillPortal";

function App() {
  const dispatch = useDispatch();

  const { isAuthenticated, currentUser } = useSelector((state) => state.auth);
  const userType = currentUser?.user_type;
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  console.log(userType);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);
  const renderAdmin = () => {
    if (isAuth) {
      <Navigate to="/" />
    }
    if (userType === 'student') {
      // return (<h1>Student </h1>)
      <Navigate to="/" />
    }
    if (userType === 'tsgbearer' || userType === 'admin')
      return (<h1>Admin </h1>)
    else {
      <Navigate to="/" />
    }

  }
  const { tabs } = tabdata();
  console.log(tabs.length)
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <>
      <CssBaseline />
      {isAuthenticated ? <MainLayout tabs={tabs} isAdmin={false} /> : <Topnav tabs={tabs} isAdmin={false} />}
      <div
        className={
          matches && isAuthenticated
            ? styles.descriptionS
            : styles.descriptionT
        }
      >
        <Routes>
          <Route
            path="/"
            exact
            element={isAuthenticated ? tabs[0].desc : <PublicHome />}
          ></Route>
          {isAuthenticated ? <>
            <Route
              path="/profile/*"
              element={
                isAuthenticated
                  ? tabs[1].desc
                  : "You need to login in order to view Profile"
              }
            ></Route>
            <Route path="/events" element={tabs[2].desc}></Route>
            <Route path="/socpoint" element={tabs[3].desc}></Route>
            <Route path="/news" element={tabs[4].desc}></Route>
            <Route path="/studpoint" element={tabs[5].desc}></Route>
            <Route path="/quickinfo/*" element={tabs[6].desc}></Route>
            <Route path="/kgpmap" element={tabs[7].desc}></Route>
          </> :
            <>
              <Route path="/events" element={tabs[1].desc}></Route>
              <Route path="/socpoint" element={tabs[2].desc}></Route>
              <Route path="/news" element={tabs[3].desc}></Route>
              <Route path="/studpoint" element={tabs[4].desc}></Route>
              <Route path="/quickinfo/*" element={tabs[5].desc}></Route>
              <Route path="/kgpmap" element={tabs[6].desc}></Route>
            </>}
          <Route path="/tsgadmin/*"
            //  render={()=>{ 
            //       dispatch(showAdminApp())   
            //       console.log("/tsgadmin/* route called")
            //     return(userType === 'tsgbearer' || userType === 'admin'?tabs[7].desc: "You need to be  Official  in order to view Admin Panel")
            //   }}
            // render={() => <div>Home</div>}
            // element={()=>{
            //   dispatch(showAdminApp())
            //   return("this is a route")
            // }}
            render={renderAdmin}
            exact
          ></Route>

          <Route
            path="/studpoint/careerpoint"
            element={<CareerPoint />}
          ></Route>
          <Route path="/events/technology" element={<Technology />}></Route>
          <Route path="/event/:id" element={<Event />}></Route>

          <Route path="/events/social" element={<Social />} />
          <Route path="/events/sports" element={<Sports />} />
          <Route path="/events/welfare" element={<Welfare />} />
          <Route path="/events/result" element={<Result />} />
          <Route path="*" element={<PageNotFound />}></Route>

          <Route path="/bill"
            element={userType==="admin" || userType==="tsgbearer" || userType==="governor" ? <BillPortal /> : <div>You are not authorized to view this page</div>}
          />
        </Routes>
      </div>
      <Footer />
      <PreLoader />
    </>
  );
}

export default App;
