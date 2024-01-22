import{
    STUDENT_DATA_REQUEST,
    STUDENT_DATA_FAILURE,
    STUDENT_DATA_SUCCESS,

} from './profileType';


export const getStudentDataRequest = () => {
    return {
        type: STUDENT_DATA_REQUEST,
    }
}

export const getStudentDataSuccess = (payload) => {
    return {
        type: STUDENT_DATA_SUCCESS,
        payload:payload
    }
}

export const getStudentDataFailure = (error) => {
    return {
        type: STUDENT_DATA_FAILURE,
        payload:error
    }
}