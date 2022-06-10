import React from "react";
import "./App.css";
import MovieTime from "./movietime";
import Movie from "./movie";
import Webseries from "./webseries";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/movietime" element={<MovieTime />}></Route>
          <Route path="/movie" element={<Movie />}></Route>
          <Route path="/webseries" element={<Webseries />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
