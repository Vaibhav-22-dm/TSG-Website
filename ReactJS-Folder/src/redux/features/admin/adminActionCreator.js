import {
    SHOW_ADMIN_APP,
    HIDE_ADMIN_APP
} from './adminType'


export const showAdminApp = () => {

    return {
        type: SHOW_ADMIN_APP
    }
}

export const hideAdminApp = () => {

    return {
        type: HIDE_ADMIN_APP
    }
}
