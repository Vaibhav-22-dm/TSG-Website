import React, { useEffect, useState } from 'react'
import { Table, Select, Input, Button } from 'antd';
import './AdminStudProf.css'
import { useSelector } from 'react-redux'
import useMediaQuery from "@mui/material/useMediaQuery";
import API from '../../../../api/'
const { Option } = Select;



function AdminTable() {

    const token = useSelector(state => state.auth.token)
    const [userCount, setUserCount] = useState(0);
    const [userData, setUserData] = useState([]);
    const [loading,setLoading]=useState(false)

    useEffect(() => {
        getUserData(1,9);
    },[])

    const getUserData = (pageNum, pageSize) => {

        setLoading(true)

        const body = {
            token: token,
            page_size:9
        }
    

        API.post(`/user/all/?page=${pageNum}`, body)
            .then((res) => {
                setLoading(false)
                const userData=res.data.results.map((user)=>{
                    user["name"]=user.first_name+" "+user.last_name;
                    return user
                })
                setUserData(userData);
                setUserCount(res.data.count);
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }


  
    const matches = useMediaQuery("(max-width:1040px)");

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    const departmentList = useSelector((state) => state.auth.departmentList);
    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL
    const yearList = [1, 2, 3, 4, 5]
    const columns = [

        { title: 'Name', dataIndex: 'name', key: 'name', width: 150 },
        { title: 'Roll No', dataIndex: 'roll_no', key: 'roll_no', width: 150 },
        { title: 'Department', dataIndex: 'department', key: 'department', width: 150 },
        { title: 'Year', dataIndex: 'year', key: 'year', width: 150 },
        { title: 'Action', key: '9', width: 150, render: () => <a>action</a>, },
    ];

    return (
        <>
            <div className="adminStudProfCont">
                <div className="searchStudent">
                    <img alt="searchImg" src={`${baseUrl}AdminPanel/StudentProfile/studProfile.png`} className="searchStudImg"></img>
                    <h2 className="searchText">Search Student Profile</h2>
                    <div className="selectCont">
                        <Select placeholder="Search Department " style={{ width: "80%" }} onChange={handleChange}>

                            {departmentList.map((department) => <Option value={department}>{department}</Option>)}
                        </Select>

                        <Select placeholder="Search Department Year" style={{ width: "80%" }} onChange={handleChange}>
                            {yearList.map((year) => <Option value={year}>{year}</Option>)}
                        </Select>
                    </div>

                    <h5 style={{ textAlign: "center" }}>Or</h5>

                    <div className="rollNoInput">
                        <div style={{ width: "70%" }}>
                            <h4 style={{ margin: "0" }}>Enter Roll No:</h4>
                            <Input placeholder="" />
                        </div>
                        <Button type="primary">Search</Button>
                    </div>


                </div>
                <div className="tsgtable" >
                    <div style={{ width: "95%" }}>
                        {/* <Table  columns={columns} dataSource={data} scroll={{ x: 'max-content'}} /> we can use this scroll attribute for large no of column and in mobile screen  */}
                        <Table
                            loading={loading}
                            pagination={{ onChange: getUserData, total: userCount, showSizeChanger:false }}
                            columns={columns}
                            dataSource={userData}
                            scroll={matches ? { x: "max-content",y:"80vh" } :null}
                          
                            
                            />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminTable