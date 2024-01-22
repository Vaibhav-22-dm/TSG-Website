import React from "react";
import { Select, Input, Button, TreeSelect, DatePicker } from "antd";
const { TreeNode } = TreeSelect;
const { Option } = Select;

function EventsSearch(props) {


  const baseUrl = process.env.REACT_APP_ASSETS_BASEURL;

  return (
    <div className="searchStudent">
      <img
        alt="searchImg"
        src={`${baseUrl}AdminPanel/StudentProfile/studProfile.png`}
        className="searchStudImg"
      ></img>
      <h2 className="searchText">Search News</h2>
      <div style={{ marginBottom: "2em" }} className="selectCont">
        <DatePicker onChange={props.handleChange} />
        <Button
          style={{ borderRadius: "50px" }}
          type="primary"
          onClick={() => {
            props.getNewData(1, 8);
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default EventsSearch;
