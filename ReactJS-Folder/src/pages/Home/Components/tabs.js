import Home from '../../Home/Home'
import TsgEvents from '../../TsgEvents/TsgEvents'
import SocietyPoint from '../../SocietyPoint/SocietyPoint'
import News from '../../News/News'
import StudentPoint from '../../StudentPoint/StudentPoint';
import QuickInfo from '../../QuickInfo/QuickInfo';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TableChartIcon from '@mui/icons-material/TableChart';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import WorkIcon from '@mui/icons-material/Work';
export default function tabs(){
    const tabs = [
        {
            title: "Home",
            icon: <HomeIcon />,
            desc: <Home />,
            path: '/'
        },
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
            title: "Work",
            icon: <WorkIcon />,
            desc: "This is my Description # 8",
            path: '/work'
        },
    ]
    return {tabs};
}