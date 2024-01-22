import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    OTP_SEND_REQUEST,
    OTP_SEND_SUCCESS,
    OTP_SEND_FAILURE,
    USER_CHECK_REQUEST,
    USER_CHECK_SUCCESS,
    USER_CHECK_FAILURE,
    FIELD_EMPTY,
    LOGIN_CLICK

} from './loginType'



//ALL the action creator for login flow (userCheck->otpSend->login->logout)

export const userCheckRequest = () => {

    return {
        type: USER_CHECK_REQUEST
    }


}

export const userCheckSuccess = (user) => {

    return {
        type: USER_CHECK_SUCCESS,
        payload: user
    }
}

export const userCheckFailure = (error) => {
    return {
        type: USER_CHECK_FAILURE,
        payload: error
    }
}

export const loginRequest = () => {

    return {
        type: LOG_IN_REQUEST,
    }

}

export const loginSuccess = (currentUser) => {

    return {
        type: LOG_IN_SUCCESS,
        payload:{
            token:currentUser.token,
            userData:currentUser.user,
            success:currentUser.message
        }
    }
}

export const loginFailure = (error) => {

    return {
        type: LOG_IN_FAILURE,
        payload:error
    }
}

export const loginClick = () => {

    return {
        type: LOGIN_CLICK,
       
    }
}
export const otpRequest = () => {

    return {
        type: OTP_SEND_REQUEST,
    }
}

export const otpSuccess = (payload) => {

    return {
        type: OTP_SEND_SUCCESS,
        payload:payload
    }
}

export const otpFailure = () => {

    return {
        type: OTP_SEND_FAILURE,
    }
}


export const logoutRequest = () => {
    return {
        type: LOG_OUT_REQUEST
    }
}

export const logoutSuccess = () => {
    return {
        type: LOG_OUT_SUCCESS
    }
}

export const logoutFailure = () => {

    return {
        type: LOG_OUT_FAILURE
    }
}












