import React, { useState, useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import classes from '../css/LoginForm.module.css'
import { Button, TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { TailSpin } from 'react-loading-icons'
import { OfficialLogin} from '../../../redux/features/login/loginThunk';

function Officialform(props) {

    const[email,setEmail]=useState(null)
    const[password,setPassword]=useState(null)
    const dispatch = useDispatch()

    const matches = useMediaQuery('(min-width:600px)');
    const currentState = useSelector((state) => state.auth)
    const { loading } = currentState

    const onEmailChange = (e) =>  setEmail(e.target.value)
    const onPasswordChange = (e) =>  setPassword(e.target.value)

    const onSubmitHandler=(e)=>{
        e.preventDefault();
        dispatch(OfficialLogin({
            email,
            password
        }))
        props.handleClick();

    }
  


    return (

        <div style={{ marginTop: "3em" }}>
            <form onSubmit={(e)=>{
                onSubmitHandler(e);
            }}>

                <div style={{ marginBottom: "2em", width: '100%', display: "flex", flexDirection: "column", rowGap: "2em" }}>

                    <TextField
                        value={email}
                        onChange={onEmailChange}
                        label="Email Id"
                        sx={{ width: matches ? 340 : 300 }}
                        type="email"
                    />
                    <TextField
                        value={password}
                        onChange={onPasswordChange}
                        label="Password"
                        sx={{ width: matches ? 340 : 300 }}
                        type="password"
                    />

                </div>
                <div>

                    <Button type="submit" className={classes.submitButton} >
                        {loading && (
                            <div style={{ margin: "2px 8px 0px 0px" }}>
                                <TailSpin width="20" height="20" />
                            </div>

                        )}
                        {loading && <span>Submitting</span>}
                        {!loading && <span>Submit</span>}
                    </Button>

                </div>
            </form>
        </div>

    )
}


export default Officialform

