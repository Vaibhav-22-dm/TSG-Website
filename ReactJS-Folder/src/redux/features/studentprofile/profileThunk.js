import * as student from './profileActionCreator'
import API from '../../../api'
import axios from 'axios'
export const getStudentData = () => {
    var post = false, achievement = false, projects = false;
    return (dispatch, getState) => {
        const token = getState().auth.token
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        dispatch(student.getStudentDataRequest())
        API.post('/studentdata/', { token })
            .then((res) => {
                console.log(res)
                dispatch(student.getStudentDataSuccess(res.data.userdata))
                console.log(res.data)
            })
            .catch((err) => {
                dispatch(student.getStudentDataFailure(err))
            })
        API.get('/achievement/', { data: { token } })
            .then((res) => {
                console.log(res.data)
                // dispatch(student.getStudentPostSuccess(res.data.posts))
            })
    }
}