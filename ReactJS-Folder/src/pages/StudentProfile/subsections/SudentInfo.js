import React from 'react'
import classes from '../profile.module.css'
export default function SudentInfo(props) {
    return (
        <>
         <table className={classes.table}>
            <tbody>
            {props.info.map((fv, index)=>{
                return(
                    <tr key={index}>
                        <td className={`${classes.td} ${classes.infotitle}`}>{fv.title}</td>
                        <td className={classes.td}>{fv.value}</td>
                    </tr>
                )
            })}
            </tbody>
         </table>   
        </>
    )
}
