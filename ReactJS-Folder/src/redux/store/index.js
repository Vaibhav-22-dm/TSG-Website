import { applyMiddleware,createStore,combineReducers } from "redux";
import authentication from '../features/login/loginReducer'
import student from '../features/studentprofile/profileReducer'
import errors from '../error/errorReducer'
import admin from '../features/admin/adminReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

const rootReducer=combineReducers({
    auth:authentication,
    student:student,
    errors:errors,
    admin:admin

})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk) ));
export default store