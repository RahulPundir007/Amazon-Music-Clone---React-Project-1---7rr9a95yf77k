import React, { useEffect, useRef, useState } from "react";
import { useMusic } from "../provider/MusicProvider";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import useSound from "use-sound";
import "./styles/MusicPlayer.css";

const defaultaudioURL =
  "https://newton-project-resume-backend.s3.amazonaws.com/audio/64cf94e447ae38c3e33a7253.mp3";

export default function MusicPlayer() {
  const { musicId, musicStatus, musicDispatch } = useMusic();
  const [audioURL, setAudioURL] = useState(defaultaudioURL);
  const [musicDetails, setMusicDetails] = useState({});

  const [play, { pause, stop, duration }] = useSound(audioURL, { volume: 1 });

  const isFirstTimeRender = useRef(true);
  const [isCapable, setIsCapable] = useState(false);

  function handlePause() {
    musicDispatch({ type: "pause" });
  }

  function handlePlay() {
    musicDispatch({ type: "play" });
  }

  function stopMusicHandler() {
    stop();
    musicDispatch({ type: "stop" });
  }

  useEffect(() => {
    if (musicId) {
      console.log(musicId); 
      musicDispatch({ type: "pause" });
      stop();
      setAudioURL(defaultaudioURL);
      setIsCapable(false);
      fetch(`https://academics.newtonschool.co/api/v1/music/song/${musicId}`, {
        headers: {
          projectId: "j3akjazjoyky",
        },
      })
        .then((resp) => resp.json())
        .then((rs) => {
          setMusicDetails(rs.data);
          setAudioURL(rs.data.audio_url);
          musicDispatch({ type: "play" });
        })
        .catch((err) => console.log(err));
    }
    return ()=> stop();

  }, [musicId]);

  useEffect(() => {
    if (duration > 0) {
      if (isFirstTimeRender.current) {
        isFirstTimeRender.current = false;
        return;
      } else {
        play();
      }
      if (musicStatus === "play") {
        setIsCapable(true);
      }
    }
    return ()=> stop();
  }, [duration]);

  useEffect(() => {
    if (isCapable) {
      if(musicStatus==="play"){
        play();
      }else{
        pause();
      }
    }
  }, [musicStatus]);

  let artistList = musicDetails?.artist?.map((eVal) => eVal.name);
  const artistName = artistList?.join(" & ");

  return (
    <div className="musicPlayer">
      <div className="musicPlayerDiv">
        <div className="musicImage">
          <div className="musicImageDiv">
            <img className="musicImageMain" src={musicDetails?.thumbnail} />
          </div>
          <div>
            <p>{musicDetails?.title}</p>
            <p>{artistName}</p>
          </div>
        </div>
        {console.log(musicStatus)}
        <div className="actionButton">
          <SkipPreviousRoundedIcon className="prevNextButton" />
          <div className="musicPlayToggler">
            {musicStatus === "play" ? (
              <PauseRoundedIcon
                onClick={handlePause}
                className="musicTogglerButton"
                style={{ color: "white" }}
              />
            ) : (
              <PlayArrowRoundedIcon
                onClick={handlePlay}
                className="musicTogglerButton"
                style={{ color: "white" }}
              />
            )}
          </div>
          <SkipNextRoundedIcon className="prevNextButton" />
        </div>

        <div className="musicStopDiv">
          <CancelRoundedIcon
            className="musicStopIcon"
            onClick={stopMusicHandler}
          />
        </div>
      </div>
    </div>
  );
}
