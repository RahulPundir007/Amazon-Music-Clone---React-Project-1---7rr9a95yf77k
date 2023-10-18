import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import "./Navbar.css";
import Profile from "../login/Profile";
import SearchResults from "./SearchResults";

export default function Navbar() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const fetchData = (value) => {
    fetch("https://academics.newtonschool.co/api/v1/music/song", {
      headers: {
        projectId: "j3akjazjoyky",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const result = data.data.filter((user) => {
          return value && user && user.title && user.title.toLowerCase().includes(value);
        });
        setResults(result);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <nav className="navbar">
      <ul className="nav-ul">
        <li className="nav-logo-li">
          <div className="nav-logo-div">
            <NavLink to="/">
              <img
                className="Logo"
                src="https://d5fx445wy2wpk.cloudfront.net/static/logo.svg"
                alt="Amazon Prime Music"
              />
            </NavLink>
          </div>
        </li>
        <li className="nav-content-li">
          <div className="nav-content-div">
            <div className="nav-content-div-comps">
              <HomeIcon
                style={{
                  color: "rgb(37,209,218)",
                  fontSize: "30px",
                  paddingBottom: "5px",
                }}
              />
              <NavLink style={{ color: "rgb(37,209,218)" }} to="/">
                Home
              </NavLink>
            </div>
            <div className="nav-content-div-comps">
              <PodcastsIcon
                style={{ fontSize: "30px", paddingBottom: "5px" }}
              />
              <NavLink to="/podcast">Podcast</NavLink>
            </div>
            <div className="nav-content-div-comps">
              <HeadphonesIcon
                style={{ fontSize: "30px", paddingBottom: "5px" }}
              />
              <NavLink to="/library">Library</NavLink>
              <KeyboardArrowDownIcon />
            </div>
          </div>
          <div className="nav-search-div">
            <input
              type="search"
              autoComplete="off"
              name="search"
              id="search"
              placeholder="Type to search..."
              value={input}
              onChange={(e) => {
                return handleChange(e.target.value);
              }}
            />
            <SearchIcon style={{ color: "gray" }} />
            
            {input && <SearchResults results={results}/>}
          </div>
        </li>
        <Profile />
      </ul>
    </nav>
  );
}
