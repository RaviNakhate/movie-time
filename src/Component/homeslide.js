import React, { useEffect, useState } from "react";
import "./assets/css/card.css";
import Slidecontain from "./slidecontain";
import axios from "axios";

export default function Home() {
  const [tv, setTv] = useState([]);
  const [movie, setMovie] = useState([]);
  const [upcomingmovie, setUpcomingmovie] = useState([]);
  const [upcomingtv, setUpcomingtv] = useState([]);
  const [poptv, setPoptv] = useState([]);
  const [popmovie, setPopmovie] = useState([]);
  const [topmovie, setTopmovie] = useState([]);
  const [toptv, setToptv] = useState([]);
  {
    /* Different pages for different home_slides section */
  }
  const [l1, setL1] = useState(1);
  const [l2, setL2] = useState(1);
  const [l3, setL3] = useState(1);
  const [l4, setL4] = useState(1);
  const [l5, setL5] = useState(1);
  const [l6, setL6] = useState(1);

  useEffect(() => {
    const moviefun = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key="ENTER_API_KEY"`
      );
      setMovie(data.results);
    };

    const tvfun = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/tv/week?api_key="ENTER_API_KEY"`
      );

      setTv(data.results);
    };
    tvfun();
    moviefun();
  }, []);

  useEffect(() => {
    const upcomingmoviefun = async () => {
      const { data } = await axios.get(
        ` https://api.themoviedb.org/3/movie/upcoming?api_key="ENTER_API_KEY"&page=${l1}`
      );
      setUpcomingmovie([...upcomingmovie, ...data.results]);
    };
    upcomingmoviefun();
  }, [l1]);
  useEffect(() => {
    const upcomingtvfun = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/on_the_air?api_key="ENTER_API_KEY"&language=en-US&page=${l2}`
      );
      setUpcomingtv([...upcomingtv, ...data.results]);
    };
    upcomingtvfun();
  }, [l2]);
  useEffect(() => {
    const popmoviefun = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key="ENTER_API_KEY"&page=${l3}&region=IN`
      );
      setPopmovie([...popmovie, ...data.results]);
    };
    popmoviefun();
  }, [l3]);
  useEffect(() => {
    const poptvfun = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key="ENTER_API_KEY"&page=${l4}&region=IN`
      );
      setPoptv([...poptv, ...data.results]);
    };
    poptvfun();
  }, [l4]);
  useEffect(() => {
    const topmoviefun = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key="ENTER_API_KEY"&language=en-US&page=${l5}&region=IN`
      );
      setTopmovie([...topmovie, ...data.results]);
    };

    topmoviefun();
  }, [l5]);
  useEffect(() => {
    const toptvfun = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key="ENTER_API_KEY"&language=en-US&page=${l6}&region=IN`
      );
      setToptv([...toptv, ...data.results]);
    };
    toptvfun();
  }, [l6]);

  const limitfun = (get) => {
    switch (get) {
      case "l1":
        setL1(l1 + 1);
        break;
      case "l2":
        setL2(l2 + 1);
        break;
      case "l3":
        setL3(l3 + 1);
        break;
      case "l4":
        setL4(l4 + 1);
        break;
      case "l5":
        setL5(l5 + 1);
        break;
      case "l6":
        setL6(l6 + 1);
        break;
    }
  };

  return (
    <>
      <Slidecontain obj={movie} title=" Trending : Movies" media_type="movie" />
      <Slidecontain obj={tv} title="Trending : Web Series" media_type="tv" />
      <Slidecontain
        limitfun={limitfun}
        obj={upcomingmovie}
        title="Upcoming : Movies"
        limit="l1"
        media_type="movie"
      />
      <Slidecontain
        limitfun={limitfun}
        obj={upcomingtv}
        title="Upcoming : Web Series"
        limit="l2"
        media_type="tv"
      />

      <Slidecontain
        limitfun={limitfun}
        obj={popmovie}
        title="Popular : Movies"
        limit="l3"
        media_type="movie"
      />

      <Slidecontain
        limitfun={limitfun}
        obj={poptv}
        title="Popular : Web Series"
        limit="l4"
        media_type="tv"
      />

      <Slidecontain
        limitfun={limitfun}
        obj={topmovie}
        title="Top Rated : Movies"
        limit="l5"
        media_type="movie"
      />
      <Slidecontain
        limitfun={limitfun}
        obj={toptv}
        title="Top Rated : Web Series"
        limit="l6"
        media_type="tv"
      />
    </>
  );
}
