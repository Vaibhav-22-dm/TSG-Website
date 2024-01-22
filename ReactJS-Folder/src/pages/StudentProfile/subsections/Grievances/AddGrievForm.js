import React, { useState } from 'react';
import classes from '../../profile.module.css'
import { Radio, Input, Space } from 'antd';
import { Upload, message } from 'antd';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

export default function AddGrievForm(props) {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [other, setOther] = useState('');
    const { Dragger } = Upload;
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(subject, description, type);
        props.setshowModel(false);
    }
    const propss = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    return (
        <form onSubmit={handleSubmit}>
            <b>New Grievance/Complaint</b>
            <div className={`${classes.dflex} ${classes.twowrapper}`}>
                <div className={`${classes.twoparttions}`} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                        Subject<span className={classes.redtxt}>*</span>
                    </div>
                    <div>
                        <input
                            type="text"
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className={classes.socinput}
                        />
                    </div>
                    <div>
                        Description<span className={classes.redtxt}>*</span>
                    </div>
                    <div style={{ flexGrow: '1' }}>
                        <textarea
                            style={{ height: '100%', resize: 'none' }}
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={classes.socinput}
                        />
                    </div>
                </div>
                <div className={`${classes.twoparttions}`}>
                    <div>
                        Choose your type of grievance<span className={classes.redtxt}>*</span>
                    </div>
                    <Radio.Group onChange={(e) => setType(e.target.value)} value={type}>
                        <Space direction="vertical">
                            <Radio value={"Academic_Department"}>Academic Department</Radio>
                            <Radio value={"Payment"}>Payment</Radio>
                            <Radio value={"Scholarship"}>Scholarship</Radio>
                            <Radio value={"Extra_curricular"}>Extra curricular </Radio>
                            <Radio value={"Mental_Health"}>Mental Health</Radio>
                            <Radio style={{ display: 'flex' }} value={"other"}>Other:
                                <input
                                    type="text"
                                    required
                                    disabled={type !== "other"}
                                    value={other}
                                    onChange={(e) => setOther(e.target.value)}
                                    className={classes.socinput}
                                    style={{ width: 'auto', marginLeft: '20px' }}
                                /></Radio>
                        </Space>
                    </Radio.Group>
                    <div>
                        Choose your type of grievance<span className={classes.redtxt}>*</span>
                    </div>
                    <Dragger height={'150px'} backgroundColor="blue" style={{ backgroundColor: '#f2f2f2' }} {...propss}>
                        <p className="ant-upload-drag-icon">
                            <CloudUploadOutlinedIcon style={{ width: '70px', height: '70px', color: '#9c9c9c' }} />
                        </p>
                        <p className="ant-upload-text" style={{ marginBottom: '0px !important', color: '#9c9c9c' }}>Drop Here</p>
                    </Dragger>
                </div>
            </div>
            <div className={`${classes.dflex} ${classes.jcen} ${classes.acen} ${classes.eqspace}`}>
                <input type={"submit"} value={"Submit"} className={classes.sumbitbtngriev} />
            </div>
        </form>
    );
}
