import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
// import Redirect from
import AdminHeader from '../../Components/Table/Header/Header'
import Socieities from './Subsections/Societies'
import PageNotFound from '../../../../components/404'
import Navigation from './Navigation'
import Hall from './Subsections/Hall'
import Departments from './Subsections/Departments'
import GcStats from './Subsections/GcStats'
import Contactus from './Subsections/Contactus'
import Quicklinks from './Subsections/Quicklinks'
import CdcStats from './Subsections/CdcStats'
import Grades from './Subsections/Grades'
import QuickInfo from './QuickInfo';
export default function QuickinfoRoutes() {
  return (
    <div>
      <AdminHeader label={"QuickInfo"} hidebtn={true} />
      <Routes>
        <Route path="/" element={<Navigate to="/tsgadmin/quickinfo/societies" />}></Route>
        <Route path="/societies" element={<QuickInfo />}></Route>
        <Route path="/hall" element={<Hall />}></Route>
        <Route path="/departments" element={<Departments />}></Route>
        <Route path="/gcstats" element={<GcStats />}></Route>
        <Route path="/contactus" element={<Contactus />}></Route>
        <Route path="/quicklinks" element={<Quicklinks />}></Route>
        <Route path="/cdcstats" element={<CdcStats />}></Route>
        <Route path="/grades" element={<Grades />} ></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  )
}
