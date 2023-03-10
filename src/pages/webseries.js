import React, { useEffect, useState } from "react";
import Card from "../Component/card";
import Paginations from "../Component/paginations";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import Filter from "../Component/filter";
import { useSelector, useDispatch } from "react-redux";

export default function Movie() {
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const {
    searchState: { search },
  } = useSelector((state) => state);
  const { page } = useParams();
  const [arr, setArr] = useState([]);
  const [lang, setLang] = useState([]);

  const filterfun = (id, ind, lang_value) => {
    if (id == "clear") {
      setArr([]);
      setLang([]);
      return null;
    }
    if (lang_value) {
      const a = lang.find((val) => {
        if (val == id) {
          return val;
        }
      });
      if (a) {
        /* deleting value */
        const k = lang.filter((val) => {
          if (!(val == id)) {
            return val;
          }
        });
        setLang([...k]);
      } else {
        /* adding value */
        setLang([...lang, id]);
      }
    }

    /* check value present in array & get index for (dark green or not change)*/
    const a = arr.find((val) => {
      if (val == id) {
        return val;
      }
    });
    if (a) {
      /* deleting value */
      const k = arr.filter((val) => {
        if (!(val == id)) {
          return val;
        }
      });
      setArr([...k]);
    } else {
      /* adding value */
      setArr([...arr, id]);
    }
    dispatcher({ type: "filter", payload: ind });
    changePage(1);
  };

  const [webseries, setWebseries] = useState([]);
  const [totalPages, setTotalpages] = useState(2);
  const media_type = "tv";

  const changePage = (e) => {
    navigate("/webseries/" + e);
    window.scroll(0, 0);
  };

  useEffect(() => {
    /* Default-Movies */
    const fetchFun1 = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/${media_type}?api_key=fc5651851be8402e7bff14388c1e39ca&sort_by=popularity.desc&page=${page}&with_original_language=${lang
          .toString()
          .replaceAll(",", "|")}&with_genres=${arr}`
      );
      setWebseries(data.results);
      setTotalpages(data.total_pages);
    };
    /* Search-Movies */
    const fetchFun2 = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${media_type}?api_key=fc5651851be8402e7bff14388c1e39ca&language=en-US&query=${search}&page=${page}&include_adult=false`
      );
      setWebseries(data.results);
      setTotalpages(data.total_pages);
    };

    {
      search ? fetchFun2() : fetchFun1();
    }
  }, [page, search, arr, lang]);
  return (
    <>
      {<Filter filterfun={filterfun} arr={arr} />}
      <div className="back text-white">
        <div className="searchtank my-4 ">
          {!webseries.length ? (
            <div className="norecordfound h2">No Record Found</div>
          ) : (
            <>
              {webseries.map((val, ind) => {
                return (
                  <div key={ind}>
                    <Card media_type="tv" val={val} />
                  </div>
                );
              })}
            </>
          )}
        </div>
        <Paginations
          page={parseInt(page)}
          totalpage={totalPages}
          changePage={changePage}
        />
      </div>
    </>
  );
}
