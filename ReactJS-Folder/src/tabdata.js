import Home from './pages/Home/Home'
import React from "react"
import { useSelector, useDispatch } from "react-redux";
import StudentProfile from './pages/StudentProfile/StudentProfile'
import ProfileRoutes from './pages/StudentProfile/ProfileRoutes'
import TsgEvents from './pages/TsgEvents/TsgEvents'
import SocietyPoint from './pages/SocietyPoint/SocietyPoint'
import News from './pages/News/News'
import StudentPoint from './pages/StudentPoint/StudentPoint';
import QuickInfo from './pages/QuickInfo/Routes';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TableChartIcon from '@mui/icons-material/TableChart';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import WorkIcon from '@mui/icons-material/Work';
import AdminApp from './AdminApp';
import MapIcon from '@mui/icons-material/Map';
import KgpMap from './pages/KgpMap/KgpMap';





function Tabs() {

    const currentUser = useSelector((state) => state.auth.currentUser);
    const userType = currentUser?.user_type;
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    var tabs = [
        {
            title: "Home",
            icon: <HomeIcon />,
            desc: <Home />,
            path: '/'
        },
        isAuth ? {
            title: "Student Profile",
            icon: <PersonIcon />,
            desc: <ProfileRoutes />,
            path: '/profile'
        } : null,
        {
            title: "TSG Events",
            icon: <ApartmentIcon />,
            desc: <TsgEvents />,
            path: '/events'
        },
        {
            title: "Society Point",
            icon: <RocketLaunchIcon />,
            desc: <SocietyPoint />,
            path: '/socpoint'
        },
        {
            title: "News",
            icon: <TableChartIcon />,
            desc: <News />,
            path: '/news'
        },
        {
            title: "Student's Point",
            icon: <PersonPinCircleIcon />,
            desc: <StudentPoint />,
            path: '/studpoint'
        },
        {
            title: "Quick Info",
            icon: <StarHalfIcon />,
            desc: <QuickInfo />,
            path: '/quickinfo'
        },
        {
            title: "KGP Map",
            icon: <MapIcon />,
            desc: <KgpMap />,
            path: '/kgpmap'
        },
        userType === 'tsgbearer' || userType === 'admin' ? {
            title: "Admin",
            icon: <AdminPanelSettingsIcon />,
            desc: "Moving on to admin panel...",
            path: '/tsgadmin/'
        } : null
    ]
    tabs = tabs.filter(tab => tab !== null);

    return { tabs };
}


export default Tabs;