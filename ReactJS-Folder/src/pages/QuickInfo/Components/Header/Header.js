import React,{useEffect} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation } from 'react-router-dom'
import classes from './Header.module.css'


function Header(props) {

    const goToBack = (e) => {
        e.preventDefault();
        window.history.back()
    }

    const { pathname } = useLocation()
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 0)
    }, [pathname])

    return (
        <div style={{ margin: "0.2em",display:"flex",justifyContent:"center" }} className={props.hide===true?classes.headerContainerHide:null}>
            <div className={classes.headerDiv}>
                <div className={classes.headerH1}>
                    <h1>{props.label}</h1>
                </div>
                <div  className={classes.goToBack} onClick={goToBack}>
                    <ArrowBackIcon style={{ color: "white" }} />
                </div>
            </div>
        </div>
    )
}

export default Header
