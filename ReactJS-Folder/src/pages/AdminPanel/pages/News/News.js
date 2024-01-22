import React, { useEffect, useState } from "react";
import {
  Table,
  Select,
  Tooltip,
  Space,
  Popconfirm,
  message,
  Spin,
  Modal,
} from "antd";
import "./News.css";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import API from "../../../../api/";
import AdminHeader from "../../Components/Table/Header/Header";
import NewsSearch from "./Components/NewsSearch";
import { useDispatch } from "react-redux";
import { getStudentData } from "../../../../redux/features/studentprofile/";
import TsgEditor from "./Components/NewsEditor/NewsEditor";

function StudentProfile() {
  const token = useSelector((state) => state.auth.token);
  const [newsCount, setNewCount] = useState(0);
  const [newsData, setNewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hideTable, setHideTable] = useState(false);
  const [pageNumber, setpageNumber] = useState(1);
  const [activityLoading, setActivityLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [date, setDate] = useState("");
  const [customSearch, setCustomSearch] = useState(false);

  const addStudentClickHandler = () => {
    setHideTable(true);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getNewData(1, 8);
    dispatch(getStudentData());
  }, []);

  const getNewData = (pageNum, pageSize, isCustom = false) => {
    setpageNumber(pageNum);

    setLoading(true);

    let body = {
      token: token,
      page_size: 10,
    };
    console.log(customSearch);
    if (!customSearch) {
      console.log("normal search");
      API.post(`/news/all/?page=${pageNum}`, body)
        .then((res) => {
          setLoading(false);
          const newsData = res.data.results.map((news) => {
            var utcDate = news.date; // ISO-8601 formatted date returned from server
            var localDate = new Date(utcDate);
            localDate = localDate.toString();
            let datetime = localDate.split(" ");
            let day = datetime[0];
            let month = datetime[1];
            let year = datetime[3].slice(2, 4);
            let time = datetime[4].slice(0, 5);
            let hours = time.slice(0, 2);
            let minutes = time.slice(3, 5);
            var newformat = hours >= 12 ? "PM" : "AM";
            hours = hours % 12;
            hours = hours ? hours : 12;
            news[
              "time"
            ] = `${day} \xa0 ${hours}:${minutes} ${newformat} \xa0 ${datetime[2]} ${month}/ ${year}`;

            return news;
          });
          setNewData(newsData);
          setNewCount(res.data.count);

          message.success("New data fetch successfully");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          message.error(err.response.data.message);
        });
    } else {
      body = { ...body, date };
      API.post(`/findnews/?page=${pageNum}`, body)
        .then((res) => {
          setLoading(false);
          const newsData = res.data.results.map((news) => {
            var utcDate = news.date; // ISO-8601 formatted date returned from server
            var localDate = new Date(utcDate);
            localDate = localDate.toString();
            let datetime = localDate.split(" ");
            let day = datetime[0];
            let month = datetime[1];
            let year = datetime[3].slice(2, 4);
            let time = datetime[4].slice(0, 5);
            let hours = time.slice(0, 2);
            let minutes = time.slice(3, 5);
            var newformat = hours >= 12 ? "PM" : "AM";
            hours = hours % 12;
            hours = hours ? hours : 12;
            news[
              "time"
            ] = `${day} \xa0 ${hours}:${minutes} ${newformat} \xa0 ${datetime[2]} ${month}/ ${year}`;

            return news;
          });
          setNewData(newsData);
          setNewCount(res.data.count);

          message.success("New data fetch successfully");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          message.error(err.response.data.message);
        });
    }
  };

  const NewDeleteHandler = (newsID) => {
    setActivityLoading(true);
    setLoadingText("Deleting...");

    API.delete(`/news/${newsID}/`, {
      data: {
        token,
      },
    })
      .then((res) => {
        message.success("New deleted successfully");
        getNewData(pageNumber, 8);
        setActivityLoading(false);
      })
      .catch((err) => {
        message.error(err.response.data.message);
        getNewData(pageNumber, 8);
        setActivityLoading(false);
      });
  };

  const matches = useMediaQuery("(max-width:1040px)");

  //   function handleChange(value) {
  //     console.log(`selected ${value}`);
  //   }
  function handleChange(date, dateString) {
    console.log(date, dateString);
    setCustomSearch(true);
    setDate(dateString);
    console.log(date);
  }
  const { societyList, hallList } = useSelector((state) => state.auth);
  var monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const baseUrl = process.env.REACT_APP_ASSETS_BASEURL;
  const yearList = [1, 2, 3, 4, 5];
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Details",
      dataIndex: "content",
      key: "content",
      width: 150,
      ellipsis: true,
    },
    { title: "Date", dataIndex: "date", key: "date", width: 150 , ellipsis: true},
    {
      title: "Action",
      key: "9",
      width: 150,
      fixed: matches ? "right" : "",
      render: (actions) => {
        return (
          <Space justify="space-between">
            <Tooltip color="#333333" placement="bottom" title="Update News">
              <img
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowModel(true);
                }}
                width="70%"
                alt="update"
                src={`${baseUrl}icons/update.png`}
              ></img>
            </Tooltip>

            <Tooltip color="#333333" placement="bottom" title="Delete News">
              <Popconfirm
                onConfirm={() => {
                  NewDeleteHandler(actions.id);
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
            {/* 
                        <Tooltip color="#333333" placement="bottom" title="Featured News for Gallery">
                            <img style={{ cursor: "pointer" }} onClick={() => {
                                setHideTable(true)
                            }} width="70%" alt="update" src={`${baseUrl}icons/feature.png`} ></img>
                        </Tooltip> */}
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Modal
        style={{ width: "100vw" }}
        centered={true}
        footer={<></>}
        visible={showModel}
        onCancel={() => setShowModel(false)}
      >
        <TsgEditor  
          getNewData={getNewData}
          setShowModel={setShowModel}/>
      </Modal>

      <AdminHeader
        label="News"
        btnLabel="Add News"
        btnClickHandler={() => setShowModel(true)}
      />
      <Spin tip={loadingText} spinning={activityLoading}>
        <div className="adminStudProfCont">
          <NewsSearch
            setDate={setDate}
            handleChange={handleChange}
          
          />

          <div className="tsgtable">
            <Table
              loading={loading}
              pagination={{
                onChange: getNewData,
                total: newsCount,
                showSizeChanger: false,
              }}
              columns={columns}
              dataSource={newsData}
              scroll={matches ? { x: "fit-content", y: "75vh" } : { y: "75vh" }}
            />
          </div>
        </div>
      </Spin>
    </div>
  );
}

export default StudentProfile;
