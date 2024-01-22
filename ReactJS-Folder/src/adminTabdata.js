import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TableChartIcon from '@mui/icons-material/TableChart';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Dashboard from './pages/AdminPanel/pages/Dashboard/Dashboard';
import StudentProfile from './pages/AdminPanel/pages/StudentProfile/StudentProfile';
import SocietyPoints from './pages/AdminPanel/pages/SocietyPoints/SocietyPoints';
import News from './pages/AdminPanel/pages/News/News';
import TsgEvents from './pages/AdminPanel/pages/TsgEvents/TsgEvents';
import StudentPoint from './pages/AdminPanel/pages/StudentsPoint/StudentPoint';
import QuickInfo from './pages/AdminPanel/pages/QuickInfo/QuickInfo';
import QuickinfoRoutes from './pages/AdminPanel/pages/QuickInfo/QuickinfoRoutes';
export default function adminTabdata() {
    const tabs = [
        {
            title: "Dashboard",
            icon: <DashboardIcon/>,
            desc: <Dashboard/>,
            path: '/tsgadmin/'
        },
        {
            title: "Student Profile",
            icon: <PersonIcon />,
            desc: <StudentProfile/>,
            path: '/tsgadmin/profile'
        },
        {
            title: "TSG Events",
            icon: <ApartmentIcon />,
            desc: <TsgEvents/>,
            path: '/tsgadmin/events'
        },
        {
            title: "News",
            icon: <TableChartIcon />,
            desc:<News/>,
            path: '/tsgadmin/news'
        },
        {
            title: "Student's Point",
            icon: <PersonPinCircleIcon />,
            desc:<StudentPoint/>,
            path: '/tsgadmin/studpoint'
        },
        {
            title: "Quick Info",
            icon: <StarHalfIcon />,
            desc: <QuickinfoRoutes/>,
            path: '/tsgadmin/quickinfo'
        },
        {
            title: "Student Site",
            icon: < SchoolOutlinedIcon />,
            desc: "this is admin for admin panel",
            path: '/'
        }
    ];
    return {tabs}
}
