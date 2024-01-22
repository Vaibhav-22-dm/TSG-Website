import React, { useState } from "react";
import classes from "./Search.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { searchData } from "../../searchData";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Search = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  let data;
  if (isAuthenticated) {
    data = searchData;
  } else {
    data = searchData.filter(item => !item.isPrivate);
  }
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const onInput = e => setSearch(e.target.value);

  // Select the wrapper and toggle class 'focus'
  const onFocus = e => e.target.parentNode.parentNode.classList.add("focus");
  const onBlur = e => e.target.parentNode.parentNode.classList.remove("focus");
  // Select item
  const onClickItem = item => navigate(item.path);

  let filtered = data.filter(item => {
    return item.keywords
      .toString()
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  return (
    <div className={classes.body}>
      <div className={classes.wrapper}>
        <div className={classes.search}>
          <input
            id="search"
            type="search"
            value={search}
            placeholder="What are you looking for?"
            onChange={onInput}
            onFocus={onFocus}
            onBlur={onBlur}
            autocomplete="off"
          />
          <SearchIcon style={{ color: "#7694FF" }} />
        </div>
        {search.length > 1 && filtered.length > 0 && (
          <ul className={classes.list}>
            {filtered.map(item => (
              <li onClick={() => onClickItem(item)}>{item.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
