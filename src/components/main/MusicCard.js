import React, { useState } from "react";
import "./styles/MusicCard.css";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useMusic } from "../provider/MusicProvider";

export default function MusicCard(props) {
  let { thumbnail, title, artist } = props;
  const [show, setShow] = useState(false);
  const [play, setPlay] = useState(false);

  title = title.substring(0, 20) + "...";

  const artistList =
    artist
      .map((eArtist) => eArtist.name)
      .join(" & ")
      .substring(0, 20) + "...";

  const { musicStatus, musicDispatch } = useMusic();

  function handlePause() {
    setPlay(false);
    musicDispatch({ type: "pause" });
    musicDispatch({ type: "setMusicId", payload: props._id });
  }

  function handlePlay() {
    setPlay(true);
    musicDispatch({ type: "play" });
    musicDispatch({ type: "setMusicId", payload: props._id });
  }

  function handleShowIcon() {
    setShow(true);
  }

  function handleHideIcon() {
    setShow(false);
  }

  const helperFunction = {
    handlePause,
    handlePlay,
    play,
  };
  // onClick={() => {
  //   console.log("line 58");
  //   musicDispatch({ type: "setMusicId", payload: props._id });
  // }}

  return (
    <section className="musicCard">
      <div className="musicCardDiv" onMouseEnter={handleShowIcon} onMouseLeave={handleHideIcon}>
        <img
          src={thumbnail}
          alt={title}
          height="210"
          width="200"
          className="bannerImage"
        />
        {show && <Icon {...helperFunction} />}
      </div>
      <div>{title}</div>
      <div className="artist">{artistList}</div>
    </section>
  );
}

function Icon({ handlePause, handlePlay, play }) {
  return play === true ? (
    <PauseRoundedIcon className="musicToggler" fontSize="large" onClick={handlePause} />
  ) : (
    <PlayArrowRoundedIcon className="musicToggler" fontSize="large" onClick={handlePlay} />
  );
}
