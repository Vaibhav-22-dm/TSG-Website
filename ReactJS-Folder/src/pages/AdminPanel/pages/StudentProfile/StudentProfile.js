import React, { useEffect, useState } from "react";
import { Table, Select, Tooltip, Space, Popconfirm, message, Spin } from "antd";
import "./StudentProfile.css";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import API from "../../../../api/";
import AdminHeader from "../../Components/Table/Header/Header";
import SearchStudentProfile from "./Components/SearchStudentProfile";
import StudentForm from "./Components/StudentForm/StudentForm";
import { useDispatch } from "react-redux";
import { getStudentData } from "../../../../redux/features/studentprofile/";

function StudentProfile() {
  const token = useSelector((state) => state.auth.token);
  const [userCount, setUserCount] = useState(0);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hideTable, setHideTable] = useState(false);
  const [pageNumber, setpageNumber] = useState(1);
  const [activityLoading, setActivityLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [department, setDepartment] = useState(null);
  const [year, setYear] = useState(null);
  const [roll_no, setRoll_no] = useState(null);
  const [customSearch, setCustomSearch] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const addStudentClickHandler = () => {
    setHideTable(true);
    setEditMode(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getUserData(1, 8);
    dispatch(getStudentData());
  }, []);

  const getUserData = (pageNum, pageSize) => {
    setpageNumber(pageNum);

    setLoading(true);

    let body = {
      token: token,
      page_size: 10,
    };
    if (!customSearch) {
      console.log("first request");
      API.post(`/user/all/?page=${pageNum}`, body)
        .then((res) => {
          setLoading(false);
          const userData = res.data.results.map((user) => {
            user["name"] = user.first_name + " " + user.last_name;
            user["action"] = user;
            return user;
          });
          setUserData(userData);
          setUserCount(res.data.count);

          message.success("User data fetch successfully");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          message.error(err.response.data.message);
        });
    } else {
      console.log("custom request");
      body = { ...body, department, year, roll_no };
      API.post(`/finduser/?page=${pageNum}`, body)
        .then((res) => {
          setLoading(false);
          const userData = res.data.results.map((user) => {
            user["name"] = user.first_name + " " + user.last_name;
            user["department"] = user.department?user.department.name:"";
            user["action"] = user;
            return user;
          });
          setUserData(userData);
          setUserCount(res.data.count);

          message.success("User data fetch successfully");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          message.error(err.response.data.message);
        });
    }
  };

  const SpDeleteHandler = (userID) => {
    setActivityLoading(true);
    setLoadingText("Deleting...");

    API.delete(`/user/${userID}/`, {
      data: {
        token,
      },
    })
      .then((res) => {
        message.success("User deleted successfully");
        getUserData(pageNumber, 8);
        setActivityLoading(false);
      })
      .catch((err) => {
        message.error(err.response.data.message);
        getUserData(pageNumber, 8);
        setActivityLoading(false);
      });
  };

  const matches = useMediaQuery("(max-width:1040px)");

  function handleChange() {
    setCustomSearch(true);
    getUserData(1, 8, true);
  }

  let { departmentList, hallList } = useSelector((state) => state.auth);

  departmentList = departmentList.map((department) => department.name);
  hallList = hallList.map((hall) => hall.name);

  const baseUrl = process.env.REACT_APP_ASSETS_BASEURL;
  const yearList = [1, 2, 3, 4, 5];
  const columns = [
    { title: "Name", dataIndex: "name", key: "name", width: 150 },
    { title: "Roll No", dataIndex: "roll_no", key: "roll_no", width: 150 },
    {
      title: "Department",
      dataIndex: "department",
      key: "name",
      ellipsis: true,
      width: 150,
    },
    { title: "Year", dataIndex: "year", key: "year", width: 150 },
    {
      title: "Action",
      key: "9",
      width: 150,
      fixed: matches ? "right" : "",
      render: (actions) => {
        return (
          <Space justify="space-between">
            <Tooltip
              color="#333333"
              placement="bottom"
              title="Update Student Profile"
            >
              <img
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setHideTable(true);
                  setFormData(actions.action);
                  setEditMode(true);
                }}
                width="70%"
                alt="update"
                src={`${baseUrl}icons/update.png`}
              ></img>
            </Tooltip>

            <Tooltip
              color="#333333"
              placement="bottom"
              title="Delete Student Profile"
            >
              <Popconfirm
                onConfirm={() => {
                  SpDeleteHandler(actions.id);
                }}
                title="Sure to delete?"
              >
                <img
                  width="70%"
                  style={{ cursor: "pointer" }}
                  alt="delete"
                  src={`${baseUrl}icons/delete.png`}
                ></img>
              </Popconfirm>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <AdminHeader
        label="Student Profile"
        btnLabel="Add Student"
        btnClickHandler={addStudentClickHandler}
      />
      <Spin tip={loadingText} spinning={activityLoading}>
        <div className="adminStudProfCont">
          <SearchStudentProfile
            departmentList={departmentList}
            yearList={yearList}
            setDepartment={setDepartment}
            setYear={setYear}
            setRoll_no={setRoll_no}
            roll_no={roll_no}
            setCustomSearch={setCustomSearch}
            getUserData={getUserData}
          />
          {hideTable ? (
          (
              <StudentForm
                setHideTable={setHideTable}
                token={token}
                departmentList={departmentList}
                yearList={yearList}
                hallList={hallList}
                formData={formData}
                editMode={editMode}
                setEditMode={setEditMode}

              />
            )
          ) : (
            <div className="tsgtable">
              <Table
                loading={loading}
                pagination={{
                  onChange: getUserData,
                  total: userCount,
                  showSizeChanger: false,
                }}
                columns={columns}
                dataSource={userData}
                scroll={
                  matches ? { x: "fit-content", y: "75vh" } : { y: "75vh" }
                }
              />
            </div>
          )}
        </div>
      </Spin>
    </div>
  );
}

export default StudentProfile;
