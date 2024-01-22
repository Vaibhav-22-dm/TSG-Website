import React, { useState, useEffect } from "react";
import classes from "../../profile.module.css";
import { useSelector, useDispatch } from "react-redux";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
export default function SocAddForm(props) {
  const [soc, setSoc] = useState(-1);
  const [por, setPor] = useState("");
  const [hall, setHall] = useState(false);
  const [socs, setSocs] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Submitting", soc, por, hall)
    props.handleAddSoc(soc, por, hall);
  };

  const society = useSelector((state) => state.auth.societyList);
  const hallList = useSelector((state) => state.auth.hallList);
  console.log("societyList from auth", society);
  console.log("hallList from auth", hallList);

  const socList = useSelector((state) => state.student.userdata.socorhall_list);
  useEffect(() => {
    // setSocs(JSON.parse(socList));
    if (hall) setSocs(hallList);
    else setSocs(society);
  }, [hall]);
  // console.log("userdata se read", JSON.parse(userData.socorhall_list))
  return (
    <>
      <form className={classes.socaddform} onSubmit={handleSubmit}>
        <FormControlLabel
          sx={{ justifyContent: "flex-end" }}
          control={
            <Switch
              onChange={() => {
                setHall(!hall);
              }}
            />
          }
          label="Hall"
        />
        <div>
          {hall ? "Hall Of Residence" : "Society/Club"} Name
          <span className={classes.redtxt}>*</span>
        </div>
        {/* <input type="text" value={soc} onChange={(e) => setSoc(e.target.value)} className={classes.socinput} /> */}
        <select
          value={soc}
          onChange={(e) => setSoc(e.target.value)}
          className={classes.socinput}
        >
          {console.log("socs in select", socs)}
          {console.log("value of hall ", hall)}
          {!hall && (
            <option value="" hidden>
              Select Society/Club
            </option>
          )}
          {hall && (
            <option value="" hidden>
              Select Hall of Residence
            </option>
          )}
          {socs.map((soc, index) => {
            return (
              <option key={index} value={soc.id}>
                {soc.name}
              </option>
            );
          })}
        </select>
        <div>
          Position of Responsibility<span className={classes.redtxt}>*</span>
        </div>
        <input
          type="text"
          value={por}
          onChange={(e) => setPor(e.target.value)}
          className={classes.socinput}
        />
        <input type="submit" value={"Add"} className={classes.updatebtn} />
      </form>
    </>
  );
}
