import {SET_ERROR,CLEAR_ERROR} from './errorType'

export function setError(error) {
    return {
        type: SET_ERROR,
        error: error
    }
}
export function clearError() {
    return {
        type: CLEAR_ERROR,
        error: null
    }
}