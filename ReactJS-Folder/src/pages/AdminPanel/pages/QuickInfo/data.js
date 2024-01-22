import HorIcon from './Icon/HorIcon'
import SocietyIcon from './Icon/SocietyIcon'
import DepIcon from './Icon/DepIcon'
import MapIcon from './Icon/MapIcon.js'
import ContactIcon from './Icon/ContactIcon.js'
import QLIcon from './Icon/QLIcon.js'
import CdcIcon from './Icon/CdcIcon.js'
import classes from './navigation.module.css'

function tablist(params) {
    const data = [
        {
            title: "Societies",
            icon: <SocietyIcon size={params} />,
            activeicon: <SocietyIcon size={params} className={classes.activeicon} />,
            route: "/tsgadmin/quickinfo/societies"
        },
        {
            title: "Halls of Residance",
            icon: <HorIcon size={params} />,
            activeicon: <HorIcon size={params} className={classes.activeicon} />,
            route: "/tsgadmin/quickinfo/hall"
        },
        {
            title: "Department",
            icon: <DepIcon size={params} />,
            activeicon: <DepIcon size={params} className={classes.activeicon} />,
            route: "/tsgadmin/quickinfo/departments"
        },
        {
            title: "GC Statistics",
            icon: <MapIcon size={params} />,
            activeicon: <MapIcon size={params} className={classes.activeicon} />,
            route: "/tsgadmin/quickinfo/gcstats"
        },
        {
            title: "Contact us",
            icon: <ContactIcon size={params} />,
            activeicon: <ContactIcon size={params} className={classes.activeicon} />,
            route: "/tsgadmin/quickinfo/contactus"
        },
        {
            title: "Quick Links",
            icon: <QLIcon size={params} />,
            activeicon: <QLIcon size={params} className={classes.activeicon} />,
            route: "/tsgadmin/quickinfo/quicklinks"
        },
        {
            title: "CDC Statistics",
            icon: <SocietyIcon size={params} />,
            activeicon: <SocietyIcon size={params} className={classes.activeicon} />,
            route: "/tsgadmin/quickinfo/cdcstats"
        },
        {
            title: "Grade Distribution",
            icon: <CdcIcon size={params} />,
            activeicon: <CdcIcon size={params} className={classes.activeicon} />,
            route: "/tsgadmin/quickinfo/grades"
        }
    ]
    return data;
}
export default tablist;