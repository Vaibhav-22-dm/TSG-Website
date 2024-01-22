import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import styles from './topbar.module.css';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showAdminApp, hideAdminApp } from '../../redux/features/admin';
import { logout } from '../../redux/features/login/loginThunk'

const ResponsiveAppBar = (props) => {

    const {profile_pic,first_name,last_name}= useSelector(state => state.auth.currentUser)
    const name = `${first_name}  ${last_name}`

    const location = useLocation();
    var page = !props.isAdmin ? location.pathname.split("/")[1] : location.pathname.split("/")[2];;
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const dispatch = useDispatch();
    const fxn = () => {
        console.log("Admin panel clicked ")
        dispatch(showAdminApp())
        console.log("/tsgadmin/* route called")
        // return(userType === 'tsgbearer' || userType === 'admin'?tabs[7].desc: "You need to be  Official  in order to view Admin Panel")
    }


    const logoutHandler = () => {
        dispatch(logout())
    }
    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL; 
    
    
    return (
        <AppBar position="static" elevation={0} sx={{backgroundColor: "white"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton sx={{ p: 0 }}>
                            <img className={styles.navlogo} src={`${baseUrl}Logos/tsg_logo.png`} alt="Tsg" />
                        </IconButton>
                    </Box>
                    <div style={{height: '100%', flexGrow: '1'}}></div>
                    <Box sx={{display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            disableRipple
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            sx={{ backgroundColor: "#7694ff", borderRadius: "10px", padding: "6px 7px" }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            PaperProps={{
                                style: {
                                    width: "70vw",
                                    top: "0px !important",
                                    right: "0px !important",
                                    backgroundColor: "#7694ff",
                                    color: "white",
                                },}}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem>
                            <img  style={profile_pic?{background:"#7694FF"}:null} src={profile_pic} className={styles.profileImg} alt="profile"></img>
                                {name}
                                <div className={styles.closeicon}>
                                    <div onClick={handleCloseNavMenu}>
                                        <CloseIcon/>
                                    </div>
                                </div>
                            </MenuItem>
                            {props.tabs.map((tab, index) =>{
                                var activeOrnot = page === tab.path.split("/")[props.isAdmin ? 2 : 1] ? styles.activeTab : styles.inactiveTab;
                                if (page == "tsgadmin") {
                                    console.log(page)
                                    fxn();
                                }
                                return(                                
                                    <Link to={tab.path} key={tab.title} >
                                        <MenuItem className={activeOrnot} onClick={handleCloseNavMenu}>
                                            {tab.icon}
                                            <Typography textAlign="center" sx={{marginLeft: "20px"}}>{tab.title}</Typography>
                                        </MenuItem>
                                    </Link>
                                )})}
                            <MenuItem onClick={logoutHandler}><LogoutIcon /> <Typography textAlign="center" sx={{ marginLeft: "20px" }}>Logout</Typography></MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
