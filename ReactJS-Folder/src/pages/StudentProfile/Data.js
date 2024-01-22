import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import classes from "./profile.module.css";
import { useSelector, useDispatch } from "react-redux";
import API from "../../api/index";
import { useState } from "react";
import { Image } from "antd";

export default function Data() {
  const user = useSelector((state) => state.auth.currentUser);
  const token = useSelector((state) => state.auth.token);
  // console.log(token)
  // const [achievements, setAchievements] = useState([]);
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const nameroll = {
    name: `${toTitleCase(user.first_name ? user.first_name : "")} ${toTitleCase(
      user.last_name ? user.last_name : ""
    )}`,
    roll: user.roll_no,
    icon:  user.profile_pic ? user.profile_pic : "",
    // icon: <ModeEditOutlinedIcon sx={{ width: "59px", height: "59px" }} />,
  };
  const info = [
    {
      title: "Course",
      value: user.course,
    },
    {
      title: "Department",
      value: user.department ? user.department.name : null,
    },
    {
      title: "EAA",
      value: user.eaa,
    },
    {
      title: "Hall of Residence",
      value: user.hall ? user.hall.name : "",
    },
    {
      title: "Contact",
      value: user.email,
    },
  ];
  const about = {
    about: user.about,
  };
  const societydummy = [];
  const achievementsdummy = [];
  const projectsdummy = [];

  return {
    nameroll,
    info,
    about,
    achievementsdummy,
    projectsdummy,
    societydummy,
  };
}
