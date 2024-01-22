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
    LOGIN_CLICK

} from './loginType'



const initialState = {
    currentUser: localStorage.getItem('token')
        ? localStorage.getItem('token')
        : null,
    token: localStorage.getItem('token')
        ? localStorage.getItem('token')
        : null,
    loading: false,
    isAuthenticated: false,
    isOtpSend: false,
    success: "",
    isUserCheck: "",
    societyList: null,
    hallList: null,
    departmentList: null,
    courseList: null,
    tagsList: null,



}


const authenticationReducer = (state = initialState, action) => {


    switch (action.type) {

        case LOG_OUT_REQUEST:
        case OTP_SEND_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
                isOtpSend: false,
                success: null

            };

        case USER_CHECK_REQUEST:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                isOtpSend: false,
                isUserCheck: true

            };

        case LOG_IN_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
                isOtpSend: true,
                success: null
            }


        case LOG_OUT_FAILURE:
        case OTP_SEND_FAILURE:

            return {
                ...state,
                loading: false,
                currentUser: null,
                isAuthenticated: false,
                isOtpSend: false,
                success: null
            };

        case LOG_IN_FAILURE:
            return {
                ...state,
                loading: false,
                currentUser: null,
                isAuthenticated: false,
                isOtpSend: true,
                success: null
            }

        case USER_CHECK_FAILURE:
            return {
                ...state,
                loading: false,
                currentUser: null,
                isAuthenticated: false,
                isOtpSend: false,
                success: null,
                isUserCheck: false,
                societyList: action.payload.socorrg_list,
                hallList: action.payload.hall_list,
                departmentList: action.payload.dept_list,
                courseList: action.payload.course_list,
                tagsList: action.payload.tags_list


            };

        case LOGIN_CLICK:
            return {
                ...state,
                loading: false,
                currentUser: null,
                isAuthenticated: false,
                isOtpSend: false,
                success: null,
                isUserCheck: false,
            }

        case OTP_SEND_SUCCESS:
            return {
                ...state,
                isOtpSend: true,
                loading: false,
                success: action.payload,
            }

        case LOG_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                isOtpSend: true,
                currentUser: action.payload.userData,
                token: action.payload.token,
                success: action.payload.success
            }

        case USER_CHECK_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload.user,
                isAuthenticated: true,
                isOtpSend: false,
                isUserCheck: false,
                societyList: action.payload.socorrg_list,
                hallList: action.payload.hall_list,
                departmentList: action.payload.dept_list,
                courseList: action.payload.course_list,
                tagsList: action.payload.tags_list

            }



        case LOG_OUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                currentUser: null,
                token: null,
                isOtpSend: false

            }
        default: return state
    }


}

export default authenticationReducer