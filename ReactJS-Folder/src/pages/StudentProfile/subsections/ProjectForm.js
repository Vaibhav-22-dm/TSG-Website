import React, { useState } from 'react'
import classes from "../profile.module.css";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import LinkIcon from '@mui/icons-material/Link';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import API from '../../../api';
import Loader from '../../../components/DataLoader/Loader';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
export default function ProjectForm(props) {
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [link, setLink] = useState(props.link);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.edit)
            props.submitHandler(title, description, link, props.id);
        else
            props.submitHandler(title, description, link);
    }
    return (
        <>
            <form className={`${classes.formproject}`} onSubmit={handleSubmit}>
                <div>Project Title<span className={classes.redtxt}>*</span></div>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className={classes.socinput} />
                <div>Project Description<span className={classes.redtxt}>*</span></div>
                <input type="text" required value={description} onChange={(e) => setDescription(e.target.value)} className={classes.socinput} />
                <div>Project Link<span className={classes.redtxt}>*</span></div>
                <input type="text" required value={link} onChange={(e) => setLink(e.target.value)} className={classes.socinput} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <input type='submit' value={props.edit ? "Update" : "Add"} style={{ width: '40%' }} className={classes.updatebtn} />
                    <input type='text' value='Cancel' onClick={props.handleCancel} style={{ width: '40%' }} className={classes.cancelbtn} />
                </div>
            </form>
        </>
    );
}
