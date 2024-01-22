import React from 'react'
import { Routes, Route } from 'react-router-dom'
import StudentProfile from './StudentProfile'
import Grievance from './subsections/Grievances/Grievance'
export default function ProfileRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<StudentProfile />} />
                <Route path="/grievances" element={<Grievance />} />
            </Routes>
        </>
    )
}
