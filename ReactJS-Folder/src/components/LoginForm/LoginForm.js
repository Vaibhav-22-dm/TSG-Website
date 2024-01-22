import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {loginClick } from '../../redux/features/login/loginActionCreator';
import StudentForm from './Components/StudentForm.js'
import classes from './css/LoginForm.module.css'
import './css/Overide.css'
import Message from '../Message/Message';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './css/Overide.css'
import OfficialForm from './Components/OfficialForm';
import TabPanel from './Components/TablePanel';

function Loginform() {

    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL;

    const [open, setOpen] = useState(false);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const dispatch = useDispatch()

    const currentState = useSelector((state) => state.auth)
    const { error } = useSelector((state) => state.errors)
    console.log(error)
    const { success } = currentState

    const handleClick = () => {
        setOpen(true);
    };

    useEffect(() => {
        dispatch(loginClick());
    }, [])


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };




    return (
        <div>

            <div className={classes.formContainer}>
                <div>
                    <div className={classes.formlogo}>
                        <img className={classes.logo} src={`${baseUrl}Logos/tsg_logo.png`} alt="Tsg" />
                    </div>

                    <div className={classes.layout} >

                        <h2>Login</h2>
                        <div>
                            <Box sx={{ width: '100%' }}>

                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="Student" {...a11yProps(0)} />
                                        <Tab label="Official" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>

                                <TabPanel value={value} index={0}>
                                    <StudentForm handleClick={handleClick} />
                                </TabPanel>

                                <TabPanel value={value} index={1}>
                                    <OfficialForm handleClick={handleClick}  />
                                </TabPanel>
                            </Box>
                        </div>

                    </div>


                </div>

                <div className={classes.loginPoster}>
                    <img style={{width:"60%"}} alt="poster" src={`${baseUrl}Login/connected.png`} />
                </div>
            </div>


            {
                (error || success) ? (
                    <Message
                        open={open}
                        handleClose={handleClose}
                        messagetype={(error) ? "error" : "success"}
                        message={(error) ? error : success}
                    />
                ) : ""
            }
            
           
        </div >
    )
}



function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default Loginform
