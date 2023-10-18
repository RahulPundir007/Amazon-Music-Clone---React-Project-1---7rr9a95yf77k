import React from "react";
import MusicCard from "./MusicCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./styles/MusicContainer.css";

export default function MusicContainer({ musicList, key }) {

  function handleLeftArrow() {
    const left = document.getElementById(musicList.type + key);
    left.scrollBy(-600, 0);
  }
  //props.filter+props.keyValue);
  function handleRightArrow() {
    const right = document.getElementById(musicList.type + key);
    right.scrollBy(600, 0);
  }

  return (
    <div className="musicContainer">
      <div className="musicContainerDiv">
        <div className="musicContainerTitle">
          <h2>{musicList.title}</h2>
        </div>
        <div className="control">
          <div>
            <KeyboardArrowLeftIcon
              onClick={handleLeftArrow}
              className="leftIcon"
              fontSize="medium"
            />
          </div>
          <div>
            <KeyboardArrowRightIcon
              onClick={handleRightArrow}
              className="rightIcon"
              fontSize="medium"
            />
          </div>
          <button className="seeAll-btn">SEE ALL</button>
        </div>
      </div>
      <div className="musicListContainer" id={musicList.type + key}>
        {musicList.data &&
          musicList.data.map((eMusic, idx) => (
            <MusicCard {...eMusic} key={idx} />
          ))}
      </div>
    </div>
  );
}
