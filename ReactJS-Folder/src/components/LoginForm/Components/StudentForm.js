import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginwithOtp, sendOtp } from '../../../redux/features/login/loginThunk';
import { loginClick} from '../../../redux/features/login/loginActionCreator';
import Form from './Form.js'


function StudentForm(props) {

    const [otp, setOtp] = useState(null);
    const [rollNo, setRollNo] = useState(null)
    const [rollNowithOtp, setrollNowithOtp] = useState(null)

    const dispatch = useDispatch()

    const currentState = useSelector((state) => state.auth)

    const { isOtpSend, loading } = currentState


    useEffect(() => {
        dispatch(loginClick());
    }, [])


    const onOtpChange = (e) =>  setOtp(e.target.value)

    const onRollNoChange = (e) => setRollNo(e.target.value)

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        dispatch(loginwithOtp({
            otp,
            rollNo: rollNowithOtp
        }))
        props.handleClick();
    }

    const handleRollNoSubmit = (e) => {
        e.preventDefault();
        dispatch(sendOtp(rollNo))
        setrollNowithOtp(rollNo)
        setOtp('')
        props.handleClick();
    }


    return (
        <div>
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

        </div >
    )
}



export default StudentForm
