import React from "react";
import "./App.css";
import Home from "../pages/home";
import Header from "./header";
import Movie from "../pages/movies";
import Footer from "./footer";
import Webseries from "../pages/webseries";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const {
    searchState: { search },
  } = useSelector((state) => state);

  return (
    <>
      <BrowserRouter >
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movies/:page" element={<Movie />}></Route>
          <Route path="/webseries/:page" element={<Webseries />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
