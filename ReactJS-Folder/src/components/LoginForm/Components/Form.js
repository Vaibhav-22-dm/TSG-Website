import React from 'react'
import classes from '../css/LoginForm.module.css'
import '../css/Overide.css'
import { Button, TextField } from "@mui/material";
import { TailSpin } from 'react-loading-icons'
import useMediaQuery from '@mui/material/useMediaQuery';


function Form(props) {

    const matches = useMediaQuery('(min-width:600px)');

    return (
        <>
            <div style={{ marginTop: "3em" }}>
                <form onSubmit={(e) => props.handleSubmit(e)}>

                    <div style={{ marginBottom: "2em", width: '100%', display: "flex", flexDirection: "column", rowGap: "2em" }}>

                        <TextField
                            onChange={props.onChange}
                            value={props.value}
                            label={props.label} //optional
                            sx={{ width: matches ? 340 : 300 }}
                        />



                    </div>
                    <div >


                        <Button type="submit" className={classes.submitButton} >
                            {props.loading && (
                                <div style={{ margin: "2px 8px 0px 0px" }}>
                                    <TailSpin width="20" height="20" />
                                </div>

                            )}
                            {props.loading && <span>{props.loadingtext}</span>}
                            {!props.loading && <span>{props.labeltext}</span>}
                        </Button>


                        <TextField

                            sx={{ width: matches ? 340 : 300,visibility:"hidden" ,marginBottom: "2em" }}

                        />


                    </div>
                </form>
            </div>


        </>
    )
}

export default Form
