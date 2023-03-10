import React, { useEffect, useState } from "react";
import "./assets/css/model.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Keyboard, Mousewheel, Autoplay } from "swiper";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import { Modal } from "@mui/material";
import Fade from "@mui/material/Fade";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

export default function Model() {
  const dispatcher = useDispatch();
  const { dataState } = useSelector((state) => state);

  const [openclose, setOpenclose] = useState(false);
  const [video, setVideo] = useState("mnd7sFt5c3A");
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (dataState.value) {
      setTimeout(() => {
        setOpenclose(true);
      }, 100);
    } else {
      setOpenclose(false);
    }
  }, [dataState.value]);

  const style = {
    backgroundImage: `linear-gradient(to top,black,transparent),  url(${
      dataState.details.poster_path
        ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${dataState.details.poster_path}`
        : ``
    })`,
    backgroundSize: "cover",
    p: 4,
  };

  useEffect(() => {
    const getcast = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${dataState.media_type}/${dataState.id}/credits?api_key=fc5651851be8402e7bff14388c1e39ca&language=en-US`
      );

      setCast(data.cast);
    };

    const getvideo = async () => {
      if (dataState.media_type == "tv") {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${dataState.id}/season/${
            dataState.details.number_of_seasons
              ? dataState.details.number_of_seasons
              : 1
          }/videos?api_key=fc5651851be8402e7bff14388c1e39ca&language=en-US`
        );

        if (data.results.length) {
          setVideo(data.results[0].key);
        } else {
          setVideo("");
        }
      } else {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${dataState.id}/videos?api_key=fc5651851be8402e7bff14388c1e39ca&language=en-US`
        );

        if (data.results.length) {
          setVideo(data.results[0].key);
        } else {
          setVideo(1);
        }
      }
    };

    getvideo();
    getcast();
  }, [dataState.id, dataState.details]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openclose}
        onClose={() => {
          dispatcher({ type: "modal" });
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openclose}>
          <Box sx={style} className="mode ">
            <>
              <div className="model ">
                <div className="container ">
                  <div className="row  justify-content-center align-items-center position-relative">
                    <div className="position-relative ">
                      <img
                        src={
                          dataState.details.poster_path
                            ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${dataState.details.poster_path}`
                            : " "
                        }
                        alt="not found"
                        className="modelimg  "
                      />

                      <div className="row  justify-content-center  my-2">
                        {video ? (
                          <a
                            href={`https://www.youtube.com/watch?v=${video}`}
                            target="_blank"
                          >
                            <button className="btn btn-danger btn-sm py-0">
                              <small> WATCH TRAILER </small>
                              <i className="fa fa-youtube-play text-white ml-2  "></i>
                            </button>
                          </a>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modelcontent text-center  mx-auto  ">
                  <div className="modeltitlecontent">
                    <div className="font-weight-bold">
                      {dataState.details.title
                        ? dataState.details.title
                        : dataState.details.name}

                      {` (${
                        dataState.media_type == "movie" ? "Movie" : "Web Series"
                      })`}
                    </div>
                    <div>{dataState.date}</div>
                    <div>
                      {dataState.details.genres
                        ? dataState.details.genres.map((val, ind) => {
                            return <span key={ind}>{val.name}, </span>;
                          })
                        : ""}
                    </div>
                    <div>
                      {!(dataState.details.vote_average == 0) ? (
                        <div>
                          <i className="fa fa-star mr-1 text-warning"></i>
                          {dataState.details.vote_average} / 10
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>

                  <div className="rounded border border-dark modaloverview mt-3 p-1">
                    <small>
                      {dataState.details.overview
                        ? dataState.details.overview
                        : "No Record"}
                    </small>
                  </div>
                  <div>
                    <div className="my-2 text-left">Cast : </div>
                    <Swiper
                      spaceBetween={5}
                      slidesPerView={2}
                      breakpoints={{
                        840: {
                          slidesPerView: 4,
                          spaceBetween: 10,
                        },
                      }}
                      modules={[Keyboard, Mousewheel, Autoplay]}
                      autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                      }}
                      mousewheel={true}
                      keyboard={{ enabled: true }}
                      className="modalswiper  p-1 border-dark rounded"
                    >
                      {cast.length ? (
                        cast.map((val, ind) => {
                          return (
                            <div key={ind}>
                              <SwiperSlide
                                key={ind}
                                className="modalswiperslide bg-dark"
                              >
                                <img
                                  className="avatar m-1  border border-white"
                                  src={`${
                                    val.profile_path
                                      ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${val.profile_path}`
                                      : ``
                                  }`}
                                  alt="image not found"
                                />

                                <div className="modalcastcontent mx-3  text-center">
                                  <small>
                                    <div className="my-2 ">{` (${
                                      val.character
                                        ? val.character
                                        : "not found"
                                    })`}</div>
                                  </small>
                                </div>
                              </SwiperSlide>
                            </div>
                          );
                        })
                      ) : (
                        <small>No Record</small>
                      )}
                    </Swiper>
                  </div>
                </div>

                <div className="close ">
                  <i
                    className="fa fa-close text-white"
                    onClick={() => {
                      dispatcher({ type: "modal" });
                    }}
                  ></i>
                </div>
              </div>
            </>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
