import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Message(props) {
    return (
        <div>
            <Snackbar
                open={props.open}
                autoHideDuration={3000}
                onClose={props.handleClose}
                anchorOrigin={
                    {
                    horizontal:'center',
                    vertical:'top'
                    }
                }

            >
                <Alert onClose={props.handleClose} severity={props.messagetype} sx={{ width: '100%' }}>
                    {props.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Message
