import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginwithOtp, sendOtp } from '../../../redux/features/login/loginThunk';
import {  userCheckFailure} from '../../../redux/features/login/loginActionCreator';
import Form from './Form.js'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import classes from './css/LoginForm.module.css'
import './css/Overide.css'
import Message from '../../../components/Message/Message';


function Loginform() {

    const [otp, setOtp] = useState(null);
    const [rollNo, setRollNo] = useState(null)
    const [rollNowithOtp, setrollNowithOtp] = useState(null)
    const [open, setOpen] = useState(false);
   
    const dispatch = useDispatch()

    const currentState = useSelector((state) => state.auth)

    const { isOtpSend, loading, error, success } = currentState

    const handleClick = () => {
        setOpen(true);
    };

    useEffect(() => {
        dispatch(userCheckFailure());
    }, [])


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return; 
        setOpen(false);
    };

    const onOtpChange = (e) => setOtp(e.target.value) 

    const onRollNoChange = (e) =>setRollNo(e.target.value) 

    const handleOtpSubmit = () => {
        dispatch(loginwithOtp({
            otp,
            rollNo: rollNowithOtp
        }))
        handleClick();
    }

    const handleRollNoSubmit = () => {
        dispatch(sendOtp(rollNo))
        setrollNowithOtp(rollNo)
        setOtp('')
        handleClick();
    }


    return (
        <div>

            <div className={classes.formContainer}>

                <div className={classes.formlogo}>
                    <img className={classes.logo} src="./assets/images/tsg_logo.png" alt="Tsg" />
                </div>

                <div className={classes.layout} >

                    <h2>Login</h2>
                    <div>

                        <ToggleButtonGroup
                            color="primary"
                            exclusive
                        >
                            <ToggleButton value="web">Student</ToggleButton>
                            <ToggleButton value="android">Official</ToggleButton>

                        </ToggleButtonGroup>
                    </div>

                    {(isOtpSend) ?
                        (
                            <Form
                                onChange={onOtpChange}
                                value={otp}
                                label="Otp"
                                handleSubmit={handleOtpSubmit}
                                labeltext='Verify Otp'
                                loadingtext='Verifying'
                                loading={loading}
                            />
                        ) : (

                            <Form
                                onChange={onRollNoChange}
                                value={rollNo}
                                label="Roll No"
                                handleSubmit={handleRollNoSubmit}
                                labeltext='Submit'
                                loadingtext='Submitting'
                                loading={loading}
                            />
                        )
                    }

                </div>


            </div>

            <div>
                {/* Poster will come */}
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

export default Loginform
