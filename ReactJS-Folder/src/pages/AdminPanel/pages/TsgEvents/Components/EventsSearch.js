import React from "react";
import { Select, Input, Button, TreeSelect } from "antd";
const { TreeNode } = TreeSelect;
const { Option } = Select;

function EventsSearch(props) {
  console.log(props);
  const treeData = [
    {
      title: "Societies",
      value: "0-0",
      children: props.societyList,
    },
    {
      title: "Hall",
      value: "0-1",
      childern: props.hallList,
    },
  ];

  const baseUrl = process.env.REACT_APP_ASSETS_BASEURL;

  return (
    <div className="searchStudent">
      <img
        alt="searchImg"
        src={`${baseUrl}AdminPanel/StudentProfile/studProfile.png`}
        className="searchStudImg"
      ></img>
      <h2 className="searchText">Search Event</h2>
      <div style={{ marginBottom: "2em" }} className="selectCont">
        <Select
          placeholder="Select Month "
          style={{ width: "80%" }}
          onChange={props.handleChange}
        >
          {props.monthList.map((month, index) => (
            <Option value={index + 1}>{month}</Option>
          ))}
        </Select>

        <TreeSelect
          style={{ width: "80%" }}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Select Organisation"
          treeDefaultExpandAll
          onChange={props.onOrganisationChange}
        >
          <TreeNode value="society" title="Society">
            {props.societyList.map((society, index) => (
              <TreeNode value={society} title={society}></TreeNode>
            ))}
          </TreeNode>
          <TreeNode value="hall" title="Hall">
            {props.hallList.map((hall, index) => (
              <TreeNode value={hall} title={hall}></TreeNode>
            ))}
          </TreeNode>
        </TreeSelect>

        <Button
          style={{ borderRadius: "50px" }}
          type="primary"
          onClick={() => {
            props.getEventData(1, 8);
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default EventsSearch;
