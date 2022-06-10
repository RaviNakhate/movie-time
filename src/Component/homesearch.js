import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "./search";
import { useContext } from "react";
import { Global } from "../ContexReducer/contex";

export default function Homesearch() {
  const [totalpage, setTotalpage] = useState(2);
  const [page, setPage] = useState(1);
  const obj = useContext(Global);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    const searchfun = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key="Enter_here_API_key"&query=${obj.state.search}&page=${page}`
      );
      setSearch(data.results);
      setTotalpage(data.total_pages);
    };
    searchfun();
    setPage(1);
  }, [obj.state.search]);

  const pagination = (num) => {
    const p = parseInt(num.target.textContent);
    setPage(p);
    const fun = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key="Enter_here_API_key"&language=en-US&query=${
          obj.state.search ? obj.state.search : "a"
        }&page=${p}&include_adult=false`
      );
      setTotalpage(data.total_pages);
      setSearch(data.results);
    };
    fun();
    window.scroll(0, 0);
  };
  return (
    <>
      <Search
        obj={search}
        page={page}
        totalpage={totalpage}
        pagination={pagination}
      />
    </>
  );
}
