import React from 'react';
import '../css/search.css'
import {
    Select,
    Input,
    Button,
    TreeSelect,
    DatePicker,

} from 'antd';

export default function Search() {
    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL
    return (<>
        <div className="searchStudent">
            <img alt="searchImg" src={`${baseUrl}AdminPanel/StudentProfile/studProfile.png`} className="searchStudImg"></img>
            <h2 className="searchText">Search</h2>
            <div style={{ marginBottom: "2em" }} className="selectCont">

                {/* <DatePicker onChange={onChange} /> */}
                <Button style={{ borderRadius: "50px" }} type="primary">Search</Button>

            </div>
        </div>
    </>);
}
