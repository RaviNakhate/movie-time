import React, { useReducer } from "react";
import { createContext } from "react";
import { reducer } from "./reducer.js";

export const Global = createContext();
export default function Contex({ children }) {
  const val1 = {
    search: "",
    searchtype: "Search",
    all: [],
    filtertoggle: true,
    filter: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 16, name: "Animation" },
      { id: "hi", name: "Bollywood", lang: true },
      { id: 35, name: "Comedy" },
      { id: 80, name: "Crime" },
      { id: 99, name: "Documentary" },
      { id: 18, name: "Drama" },
      { id: "en", name: "Hollywood", lang: true },
      { id: 10751, name: "Family" },
      { id: 14, name: "Fantasy" },
      { id: 36, name: "History" },
      { id: 27, name: "Horror" },
      { id: 10402, name: "Music" },
      { id: 9648, name: "Mystery" },
      { id: 10749, name: "Romance" },
      { id: 878, name: "Science Fiction" },
      { id: 53, name: "Thriller" },
      { id: "te,ta,kn,mr,ml", name: "Tollywood", lang: true },
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
