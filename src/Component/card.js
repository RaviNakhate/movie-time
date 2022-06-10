import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Global } from "../ContexReducer/contex";
import Noimg from "./assets/noimg.jpg";
import axios from "axios";

export default function Card(props) {
  const obj = useContext(Global);
  const [date, setDate] = useState("");
  const [details, setDetails] = useState([]);

  /* API Request for per card details & date */
  useEffect(() => {
    const getdetails = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${
          props.media_type == "tv" ? "tv" : "movie"
        }/${props.val.id}?api_key="Enter_here_API_key"&language=en-US`
      );

      if (props.media_type == "tv") {
        if (data.seasons.length) {
          setDate(data.seasons[data.number_of_seasons - 1].air_date);
        } else {
          setDate("");
        }
      } else {
        if (data.release_date.length) {
          setDate(data.release_date);
        } else {
          setDate("");
        }
      }
      setDetails(data);
    };
    getdetails();
  }, [props.val.id]);

  useEffect(() => {
    const setFormatDate = (date) => {
      if (date) {
        const d = date.replaceAll("-", "").slice(6, 8);
        const m = date.replaceAll("-", "").slice(4, 6);
        const y = date.replaceAll("-", "").slice(0, 4);
        const newDate = " (" + d + "-" + m + "-" + y + ")";
        setDate(newDate);
      } else {
        setDate("");
      }
    };
    setFormatDate(date);
  }, [details]);

  return props.getDetailsForBanner ? (
    <div>{date}</div>
  ) : (
    <>
      <div
        className="searchcard mx-2 my-2 text-white "
        style={{
          backgroundImage: `linear-gradient(#13151f,transparent,#13151f),url(${
            props.val.backdrop_path
              ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.val.backdrop_path}`
              : ``
          })`,
          backgroundSize: "cover",
        }}
      >
        <div className="card bg-transparent">
          <img
            onClick={() => {
              obj.dispatcher({
                type: "modal",
                payload: {
                  id: props.val.id,
                  details: details ? details : [],
                  date: date ? date : "",
                  media_type:
                    props.media_type == "search"
                      ? props.val.media_type
                      : props.media_type,
                },
              });
            }}
            src={
              props.val.poster_path
                ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.val.poster_path}`
                : Noimg
            }
            alt=""
            className="card-top-img cardimg mx-auto mt-2"
          />
          <div className="card-body">
            <div className="card-title text-center">
              {props.val.title ? props.val.title : props.val.name}
              {date}
            </div>

            <div className="card-content text-center">
              <div>
                {!(props.val.vote_average == 0) ? (
                  <div>
                    <i className="fa fa-star mr-1 text-warning"></i>
                    {props.val.vote_average} / 10
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
