import React, { useState, useEffect } from "react";
import axios from "axios";
import "./assets/css/card.css";
import { useContext } from "react";
import { Global } from "../ContexReducer/contex";
import Search from "./search";

export default function Category(props) {
  const obj = useContext(Global);
  const [totalpaged, setTotalpaged] = useState(2);
  const [totalpages, setTotalpages] = useState(2);
  const [paged, setPaged] = useState(1);
  const [pages, setPages] = useState(1);
  const [discover, setDiscover] = useState([]);
  const [search, setSearch] = useState([]);
  const [arr, setArr] = useState([]);
  const [lang, setLang] = useState([]);

  useEffect(() => {
    const fetchFun = async () => {
      /*  console.log(lang);
      console.log(lang.toString().replaceAll(",", "|")); */

      const data1 = await axios.get(
        `https://api.themoviedb.org/3/discover/${
          props.media_type
        }?api_key="ENTER_API_KEY"&sort_by=popularity.desc&page=${paged}&with_original_language=${lang
          .toString()
          .replaceAll(",", "|")}&with_genres=${arr}`
      );

      const data2 = await axios.get(
        `https://api.themoviedb.org/3/search/${
          props.media_type
        }?api_key="ENTER_API_KEY"&language=en-US&query=${
          obj.state.search ? obj.state.search : "a"
        }&page=${pages}&include_adult=false`
      );

      setTotalpaged(data1.data.total_pages);
      setDiscover(data1.data.results);
      setTotalpages(data2.data.total_pages);
      setSearch(data2.data.results);
    };

    fetchFun();
    {
      /* Ever time search redirect page_no. 1 */
    }
    setPages(1);
  }, [obj.state.search, paged, arr]);

  const paginationd = (num) => {
    setPaged(parseInt(num.target.textContent));
    window.scroll(0, 0);
  };

  const paginations = (num) => {
    const p = parseInt(num.target.textContent);
    setPages(p);
    const fun = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${props.media_type}?api_key=""ENTER_API_KEY"&language=en-US&query=${obj.state.search}&page=${p}&include_adult=false`
      );
      setSearch(data.results);
    };
    fun();
    window.scroll(0, 0);
  };

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
    obj.dispatcher({ type: "filter", payload: ind });
    setPaged(1);
  };

  return (
    <>
      {/*      it used for which filter on off that's distribution search_content & discover_content*/}
      {obj.state.search ? (
        <>
          {/*  it is search */}
          <Search
            media_type={props.media_type}
            obj={search}
            page={pages}
            totalpage={totalpages}
            pagination={paginations}
          />
        </>
      ) : (
        <>
          {/*   it is discover */}
          <Search
            media_type={props.media_type}
            obj={discover}
            filterfun={filterfun}
            page={paged}
            totalpage={totalpaged}
            pagination={paginationd}
            arr={arr}
          />
        </>
      )}
    </>
  );
}
