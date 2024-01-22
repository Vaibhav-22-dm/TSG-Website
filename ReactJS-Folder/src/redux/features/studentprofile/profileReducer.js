import{
    STUDENT_DATA_REQUEST,
    STUDENT_DATA_FAILURE,
    STUDENT_DATA_SUCCESS,
}from './profileType';

const initialState = {
    userdata: null,
    error: "",
    success: "",
    loading: false,
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case STUDENT_DATA_REQUEST:
            return {
                ...state,
                error: "",
                success: "",
                loading: true,
            }
        case STUDENT_DATA_SUCCESS:
            return {
                ...state,
                userdata: action.payload,
                error: "",
                success: "",
                loading: false,
            }
        case STUDENT_DATA_FAILURE:
            return {
                ...state,
                error: action.payload,
                success: "",
                loading: false,
            }
        default:
            return state;
    }
}
export default profileReducer;