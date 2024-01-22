import React, { useState ,useEffect } from "react";
import classes from "../css/Home.module.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import styles from "./css/topbar.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";
import tabsdata from "./tabs";
import LoginForm from "../../../components/LoginForm/LoginForm";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "../../../components/Search/SearchIcon";

const Topnav = props => {
  const baseUrl = process.env.REACT_APP_ASSETS_BASEURL;

  const location = useLocation();
  var page = location.pathname.split("/")[1];
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const [active, setactive] = useState("Home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeStyle = { color: "#7694ff" };

  const modalCloseHandler = () => {
    setIsModalOpen(false);
  };

  const modalOpenHandler = () => {
    setIsModalOpen(true);
  };

  const matches = useMediaQuery("(min-width:600px)");
  const mq944 = useMediaQuery("(min-width:944px)");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
    width: matches ? "fit-content" : "95vw",
    borderRadius: "10px",
    maxWidth: "1000px",
    padding: matches ? "10px 0px 0px 10px" : "",
  };
  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const tabs = props.tabs;
  // console.log(tabs)


const [navstyle, setnavstyle] = useState({})
const listenScrollEvent = (event) => {
  if (window.scrollY > 100) {
     setnavstyle({
       position:"fixed",
      background: "white",
      width:"100%",
      top:"0",
      transition:"0.3s",
      boxShadow: "3px 3px 18px rgba(118, 148, 255, 0.25)"
    })
  } else  {
     setnavstyle({})
  } 
}

useEffect(() => {
  window.addEventListener('scroll', listenScrollEvent);

  return () =>
    window.removeEventListener('scroll', listenScrollEvent);
}, []);

  return (
    <>
      <SearchIcon />
      {isModalOpen && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "1200px",
          }}
        >
          <Modal open={isModalOpen} onClose={modalCloseHandler}>
            <Box sx={style}>
              <LoginForm />
            </Box>
          </Modal>
        </div>
      )}
      {mq944 ? (
        <div style={navstyle} className={classes.navBarLayout}>
          <div className={classes.navbarLogo}>
            <img
              className={classes.navlogo}
              src={`${baseUrl}Logos/tsg_logo.png`}
              alt="Tsg"
            />
          </div>

          <div className={classes.rightNav}>
            <ul>
              {tabs.map((tab, index) => (
                <Link
                  to={tab.path}
                  style={active === tab.title ? activeStyle : {}}
                  onClick={() => {
                    setactive(tab.title);
                  }}
                  key={index}
                >
                  {tab.title}
                </Link>
              ))}
            </ul>

            <div>
              <Button
                onClick={modalOpenHandler}
                className={classes.LoginButton}
                variant="contained"
              >
                {" "}
                login{" "}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <AppBar
          position="static"
          elevation={0}
          sx={{ backgroundColor: "white" }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
              <Box sx={{ flexGrow: 0 }}>
                <IconButton sx={{ p: 0 }}>
                  <img
                    className={styles.navlogo}
                    src={`${baseUrl}Logos/tsg_logo.png`}
                    alt="Tsg"
                  />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", flexGrow: 1 }}></Box>
              <Box sx={{ display: "flex" }}>
                <IconButton
                  disableRipple
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                  sx={{
                    backgroundColor: "#7694ff",
                    borderRadius: "10px",
                    padding: "6px 7px",
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  PaperProps={{
                    style: {
                      maxWidth: "350px",
                      width: "70vw",
                      top: "0px !important",
                      right: "0px !important",
                      backgroundColor: "#7694ff",
                      color: "white",
                    },
                  }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: "flex",
                  }}
                >
                  <MenuItem>
                    <div
                      onClick={modalOpenHandler}
                      className={styles.loginbutton}
                    >
                      Login
                    </div>
                    <div className={styles.closeicon}>
                      <div onClick={handleCloseNavMenu}>
                        <CloseIcon />
                      </div>
                    </div>
                  </MenuItem>
                  {tabs.map((tab, index) => {
                    var activeOrnot =
                      page === tab.path.split("/")[1]
                        ? styles.activeTab
                        : styles.inactiveTab;
                    return (
                      <Link to={tab.path} key={index}>
                        <MenuItem
                          className={activeOrnot}
                          onClick={handleCloseNavMenu}
                        >
                          {tab.icon}
                          <Typography
                            textAlign="center"
                            sx={{ marginLeft: "20px" }}
                          >
                            {tab.title}
                          </Typography>
                        </MenuItem>
                      </Link>
                    );
                  })}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </>
  );
};
export default Topnav;
