import React, { useEffect } from 'react'
import AdminPanel from './pages/AdminPanel/AdminPanel'
import adminTabdata from './adminTabdata'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import PageNotFound from "./components/404";
import { useDispatch } from "react-redux";
import { hideAdminApp } from './redux/features/admin'
import MainLayout from "./containers/MainLayout";
import useMediaQuery from "@mui/material/useMediaQuery";
import Footer from './components/Footer/Footer';
import CareerPoint from "./pages/AdminPanel/pages/StudentsPoint/CareerPoint/component/CareerPoint"

import { checkUserAuth } from "./redux/features/login";
function AdminApp() {
    const { tabs } = adminTabdata();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkUserAuth());
    }, [])

    const matches = useMediaQuery("(min-width:600px)");
    const descriptionS = {
        paddingLeft: '60px',
        backgroundColor: '#f2f2f2',
        minHeight: '100vh'
    }
    const descriptionT = {
        paddingLeft: '0px',
        backgroundColor: '#f2f2f2',
        minHeight: '100vh'
    }
    return (
        <>
            <MainLayout tabs={tabs} isAdmin={true} />
            <div style={matches ? descriptionS : descriptionT}>
                <Routes>
                    <Route path="/tsgadmin/" exact element={tabs[0].desc}></Route>
                    <Route path="/tsgadmin/profile" element={tabs[1].desc}></Route>
                    <Route path="/tsgadmin/events" element={tabs[2].desc}></Route>
                
                    <Route path="/tsgadmin/news" element={tabs[3].desc}></Route>
                    <Route path="/tsgadmin/studpoint" element={tabs[4].desc}></Route>
                    <Route path="/tsgadmin/quickinfo/*" element={tabs[5].desc}></Route>
                    <Route path="/tsgadmin/*" element={<PageNotFound />}></Route>
                    <Route path="/tsgadmin/studpoint/careerpoint" element={<CareerPoint/>}></Route>
                    <Route path="/*" exact element={<RenderStudentHome />}></Route>
                    {/* <Route path="/tsgadmin" element={tabs[7].desc}></Route> */}
                </Routes>

            </div>
            <Footer />
        </>
    )
}
function RenderStudentHome() {
    const dispatch = useDispatch();
    dispatch(hideAdminApp())
    return (<div>This is Student Home</div>)
}
export default AdminApp