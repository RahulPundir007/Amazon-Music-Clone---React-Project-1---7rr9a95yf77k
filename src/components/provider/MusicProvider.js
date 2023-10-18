import React from "react";
import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const initialState = {
    musicPlayer: "inactive",
    musicStatus: "pause",
    musicId: null,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "play":
        return { ...state, musicStatus: "play" };

      case "pause":
        return { ...state, musicStatus: "pause" };

      case "stop":
        return { ...initialState };

      case "setMusicId":
        return { ...state, musicId: action.payload, musicPlayer: "active" };

      default:
        return { ...state };
    }
  }
  const [musicState, musicDispatch] = useReducer(reducer, initialState);

  let obj = {
    musicPlayer: musicState.musicPlayer,
    musicStatus: musicState.musicStatus,
    musicId: musicState.musicId,
    musicDispatch,
  };

  return <MusicContext.Provider value={obj}>{children}</MusicContext.Provider>;
};

export function useMusic() {
  return useContext(MusicContext);
}
