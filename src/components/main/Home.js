import React, { useEffect, useState } from "react";
import MusicContainer from "./MusicContainer";
import "./styles/Home.css";
import { useMusic } from "../provider/MusicProvider";
import MusicPlayer from "./MusicPlayer";
import Navbar from "../Navbar";

const Project_Id = "j3akjazjoyky";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [musicList, setMusicList] = useState([
    { title: "Trending Songs", data: [], type: "trendSong" },
    {
      title: "New Release",
      data: [],
      type: "newRelease",
      sort: { release: 1 },
    },
    { title: "Let's Party", data: [], type: "happy", mood: "happy" },
    { title: "Top Romantic", data: [], type: "romantic", mood: "romantic" },
    { title: "Heal Your Heart", data: [], type: "sad", mood: "sad" },
    { title: "Party Banger!!", data: [], type: "excited", mood: "excited" },
  ]);

  function setMusicData({ type, payload }) {
    let updatedMusicList = musicList.map((eMusic) => {
      if (eMusic.type === type) eMusic.data = payload;
      return eMusic;
    });
    setMusicList(updatedMusicList);
  }

  const fetchMusic = async () => {
    try {
      setIsLoading(true);

      musicList.map((eMusic) => {
        if (eMusic.sort) {
          fetch(
            `https://academics.newtonschool.co/api/v1/music/song?sort={"release": 1}`,
            {
              headers: {
                projectId: Project_Id,
              },
            }
          )
            .then((resp) => {
              return resp.json();
            })
            .then((rs) => {
              setMusicData({ type: eMusic.type, payload: rs.data });
            })
            .catch((err) => console.log(err));
        } else if (eMusic.mood) {
          fetch(
            `https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"${eMusic.mood}"}`,
            {
              headers: {
                projectId: Project_Id,
              },
            }
          )
            .then((resp) => {
              return resp.json();
            })
            .then((rs) => {
              setMusicData({ type: eMusic.type, payload: rs.data });
            })
            .catch((err) => console.log(err));
        } else {
          fetch("https://academics.newtonschool.co/api/v1/music/song", {
            headers: {
              projectId: Project_Id,
            },
          })
            .then((resp) => {
              return resp.json();
            })
            .then((rs) => {
              setMusicData({ type: eMusic.type, payload: rs.data });
            })
            .catch((err) => console.log(err));
        }
      });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMusic();
  }, []);

  // console.log(musicList);

  const { musicPlayer } = useMusic();

  return (
    <div className="pages">
      <Navbar />

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        musicList && (
          <section className="MusicContainer">
            {musicList.map((eMusicItem, idx) => (
              <MusicContainer musicList={eMusicItem} key={idx}  />
            ))}

            {musicPlayer === "active" && <MusicPlayer />}
          </section>
        )
      )}
    </div>
  );
}

// import React from "react";
// import Carousel from "./Carousel";

// export default function Home() {
//   const featuredFilter = [
//     "Top 20 of this week",
//     "Evergreen melodies",
//     "Trending songs",
//   ];
//   const moodFilter = ["excited", "happy", "romantic", "sad"];

//   return (
//     <div>
//       {featuredFilter.map((ele, id) => {
//         return <Carousel value={ele} filter={"featured"} title={ele} key={id} keyValue={id}/> ;
//       })}
//       {moodFilter.map((ele, id) => {
//         return <Carousel value={ele} filter={"mood"} title={ele} key={id} keyValue={id}/>;
//       })}
//     </div>
//   );
// }
