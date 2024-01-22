import React from "react";
import { Select, Input, Button } from "antd";
import { useSelector } from "react-redux";
const { Option } = Select;

function SearchStudentProfile(props) {
  const baseUrl = process.env.REACT_APP_ASSETS_BASEURL;
  const department = useSelector((state) => state.auth.departmentList);
  return (
    <div className="searchStudent">
      <img
        alt="searchImg"
        src={`${baseUrl}AdminPanel/StudentProfile/studProfile.png`}
        className="searchStudImg"
      ></img>
      <h2 className="searchText">Search Student Profile</h2>
      <div className="selectCont">
        <Select
          placeholder="Search Department "
          style={{ width: "80%" }}
          onChange={(value) => {
            props.setDepartment(value);
            props.setCustomSearch(true);
            props.setRoll_no(null);
          }}
        >
          {props.departmentList.map((department) => (
            <Option value={department}>{department}</Option>
          ))}
        </Select>

        <Select
          placeholder="Search Department Year"
          style={{ width: "80%" }}
          onChange={(value) => {
            props.setYear(value);
            props.setRoll_no(null);
            props.setCustomSearch(true);

          }}
        >
          {props.yearList.map((year) => (
            <Option value={year}>{year}</Option>
          ))}
        </Select>
      </div>
      <h5 style={{ textAlign: "center" }}>Or</h5>
      <div className="rollNoInput">
        <div style={{ width: "70%" }}>
          <h4 style={{ margin: "0" }}>Enter Roll No:</h4>
          <Input
            onChange={(e) => {
              props.setRoll_no(e.target.value );
              props.setCustomSearch(true);
              props.setYear(null);
              props.setDepartment(null);
            }}
            value={props.roll_no}
            placeholder=""
          />
        </div>
        <Button
          style={{ borderRadius: "50px" }}
          type="primary"
          onClick={() => {
            props.getUserData(1, 8,true);
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchStudentProfile;
