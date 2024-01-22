import * as auth from './loginActionCreator'
import * as error from '../../error/errorActionCreator'
import API from '../../../api'

//ALL the Asyncronous logic for login will be here

export const checkUserAuth = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token
        dispatch(auth.userCheckRequest())
        dispatch(error.clearError());

        API.post('/login_check/', { token })
            .then((res) => {
                dispatch(auth.userCheckSuccess(res.data))
            })
            .catch((err) => {
                dispatch(error.setError(err.response.data.message))
                dispatch(auth.userCheckFailure(err.response.data))

            })

    }
}


export const sendOtp = (roll_no) => {


    const body = JSON.stringify({ roll_no })

    return (dispatch) => {

        if (roll_no === "" || roll_no === null) {
            dispatch(error.setError('Roll No required'))
            dispatch(auth.otpFailure())
        }

        else {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            dispatch(auth.otpRequest());
            dispatch(error.clearError());

            API.post('/otp_send/', body, config)
                .then((response) => {

                    dispatch(auth.otpSuccess(response.data.message))
                })
                .catch((err) => {
                    dispatch(error.setError(err.response.data.message))
                    dispatch(auth.otpFailure())
                })
        }
    }
}

export const loginwithOtp = (payload) => {

    const { rollNo, otp } = payload;

    const body = JSON.stringify({
        roll_no: rollNo,
        otp: otp
    })

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return (dispatch) => {

        if (otp === "") {
            dispatch(error.setError('Otp required'));
            dispatch(auth.loginFailure());
        }
        else {

            dispatch(auth.loginRequest());
            dispatch(error.clearError());

            API.post('/otp_login/', body, config)
                .then((response) => {
                    const { token } = response.data;
                    localStorage.setItem('token', token);
                    dispatch(auth.loginSuccess(response.data));

                })
                .catch((err) => {
                    dispatch(error.setError(err.response.data.message));
                    dispatch(auth.loginFailure());
                })
        }
    }

}

export const logout = () => {

    return (dispatch, getState) => {
        const token = getState().auth.token
        dispatch(auth.logoutRequest());
        dispatch(error.clearError());

        API.post('/logout/', { token })
            .then((res) => {
                dispatch(auth.logoutSuccess())
            })
            .catch((err) => {
                dispatch(error.setError(err.response.data.message))
                dispatch(auth.logoutFailure())
            })

    }
}

export const OfficialLogin = (payload) => {

    const { email, password } = payload;



    const body = JSON.stringify({
        email: email,
        password: password
    })

    console.log(body)
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return (dispatch) => {

        if (password === null || email === null || password === "" || email === "") {

            let string=""

            if ((password === null || password === "") && (email === null || email === "")) {
                string = "Both Password and Email"
            }
            else {
               string = email ? "Password" : "Email"
            }
            dispatch(error.setError(`${string} Required`));
            dispatch(auth.loginFailure());
        }
        else {

            dispatch(auth.loginRequest());
            dispatch(error.clearError());

            API.post('/login/', body, config)
                .then((response) => {
                    const { token } = response.data;
                    localStorage.setItem('token', token);
                    dispatch(auth.loginSuccess(response.data));

                })
                .catch((err) => {
                    console.log(err.response.data.message)
                    dispatch(error.setError(err.response.data.message));
                    dispatch(auth.loginFailure());
                })
        }
    }

}














