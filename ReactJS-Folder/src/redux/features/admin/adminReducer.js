import {
    SHOW_ADMIN_APP,
    HIDE_ADMIN_APP
} from './adminType'


const initialState = {
    showAdminApp: false
}

const adminReducer = (state = initialState, action) => {
    
        switch (action.type) {
    
            case SHOW_ADMIN_APP:
                return {
                    showAdminApp: true
                };
    
            case HIDE_ADMIN_APP:
                return {
                    showAdminApp: false
                };
    
            default:
                return state;
        }
    }

    export default adminReducer;