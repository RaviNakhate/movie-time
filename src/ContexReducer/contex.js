import React, { useReducer } from "react";
import { createContext } from "react";
import { reducer } from "./reducer.js";

export const Global = createContext();
export default function Contex({ children }) {
  const val1 = {
    search: "",
    searchtype: "Search",
    all: [],
    filter: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 16, name: "Animation" },
      { id: 35, name: "Comedy" },
      { id: 80, name: "Crime" },
      { id: 99, name: "Documentary" },
      { id: 18, name: "Drama" },
      { id: 10751, name: "Family" },
      { id: 14, name: "Fantasy" },
      { id: "hi", name: "Hindi (Bollywood) ", lang: true },
      { id: 36, name: "History" },
      { id: 27, name: "Horror" },
      { id: "kn", name: "Kannada", lang: true },
      { id: "ml", name: "Malayalam", lang: true },
      { id: "mr", name: "Marathi", lang: true },
      { id: 10402, name: "Music" },
      { id: 9648, name: "Mystery" },
      { id: 10749, name: "Romance" },
      { id: 878, name: "Science Fiction" },
      { id: "ta", name: "Tamil", lang: true },
      { id: "te", name: "Telugu (Tollywood) ", lang: true },
      { id: 53, name: "Thriller" },
      { id: 10770, name: "TV Movie" },
      { id: 10752, name: "War" },
      { id: 37, name: "Western" },
    ],

    modal: {
      id: "66732",
      media_type: "tv",
      date: "",
      value: false,
      details: [],
    },
  };
  const [state, dispatcher] = useReducer(reducer, val1);
  return (
    <>
      <Global.Provider value={{ state, dispatcher }}>
        {children}
      </Global.Provider>
    </>
  );
}
