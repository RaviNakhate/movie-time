import React, { useEffect, useState } from "react";
import "./assets/css/model.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Keyboard, Mousewheel, Autoplay } from "swiper";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import { Modal } from "@mui/material";
import Fade from "@mui/material/Fade";
import { useContext } from "react";
import { Global } from "../ContexReducer/contex";
import axios from "axios";

export default function Model() {
  const obj = useContext(Global);
  const [openclose, setOpenclose] = useState(false);
  const [video, setVideo] = useState("mnd7sFt5c3A");
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (obj.state.modal.value) {
      setTimeout(() => {
        setOpenclose(true);
      }, 100);
    } else {
      setOpenclose(false);
    }
  }, [obj.state.modal.value]);

  const style = {
    backgroundImage: `linear-gradient(to top,black,transparent),  url(${
      obj.state.modal.details.poster_path
        ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${obj.state.modal.details.poster_path}`
        : ``
    })`,
    backgroundSize: "cover",
    p: 4,
  };

  useEffect(() => {
    const getcast = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${obj.state.modal.media_type}/${obj.state.modal.id}/credits?api_key="ENTER_API_KEY"&language=en-US`
      );

      setCast(data.cast);
    };

    const getvideo = async () => {
      if (obj.state.modal.media_type == "tv") {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${obj.state.modal.id}/season/${
            obj.state.modal.details.number_of_seasons
              ? obj.state.modal.details.number_of_seasons
              : 1
          }/videos?api_key="ENTER_API_KEY"&language=en-US`
        );

        if (data.results.length) {
          setVideo(data.results[0].key);
        } else {
          setVideo("");
        }
      } else {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${obj.state.modal.id}/videos?api_key="ENTER_API_KEY"&language=en-US`
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
  }, [obj.state.modal.id, obj.state.modal.details]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openclose}
        onClose={() => {
          obj.dispatcher({ type: "modal" });
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
                  <div className="row w-75 justify-content-center align-items-center position-relative">
                    <div className="position-relative ">
                      <img
                        src={
                          obj.state.modal.details.poster_path
                            ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${obj.state.modal.details.poster_path}`
                            : " "
                        }
                        alt="not found"
                        className="modelimg  "
                      />
                      <a
                        target="_blank"
                        href={` https://www.google.com/search?q=${
                          obj.state.modal.details.title
                            ? obj.state.modal.details.title
                            : obj.state.modal.details.name
                        }&tbm=isch`}
                        className="photo "
                      >
                        <i className="fa fa-photo text-white "></i>
                      </a>
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
                      {obj.state.modal.details.title
                        ? obj.state.modal.details.title
                        : obj.state.modal.details.name}

                      {` (${
                        obj.state.modal.media_type == "movie"
                          ? "Movie"
                          : "Web Series"
                      })`}

                      <a
                        target="_blank"
                        href={`https://en.wikipedia.org/wiki/${
                          obj.state.modal.details.title
                            ? obj.state.modal.details.title
                            : obj.state.modal.details.name
                        }`}
                      >
                        <i className="fa fa-wikipedia-w mx-2"></i>
                      </a>
                      <a
                        target="_blank"
                        href={` https://www.google.com/search?q=${
                          obj.state.modal.details.title
                            ? obj.state.modal.details.title
                            : obj.state.modal.details.name
                        }`}
                      >
                        <i className="fa fa-google mx-2"></i>
                      </a>
                    </div>
                    <div>{obj.state.modal.date}</div>
                    <div>
                      {obj.state.modal.details.genres
                        ? obj.state.modal.details.genres.map((val, ind) => {
                            return <span key={ind}>{val.name}, </span>;
                          })
                        : ""}
                    </div>
                    <div>
                      {!(obj.state.modal.details.vote_average == 0) ? (
                        <div>
                          <i className="fa fa-star mr-1 text-warning"></i>
                          {obj.state.modal.details.vote_average} / 10
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <div>
                      <a
                        href={`${
                          obj.state.modal.details.id
                            ? obj.state.modal.details.production_countries
                                .length
                              ? obj.state.modal.details.production_countries[0]
                                  .name == "India"
                                ? `https://bollyverse.xyz/?s= ${
                                    obj.state.modal.details.title
                                      ? obj.state.modal.details.title
                                      : obj.state.modal.details.name
                                  }`
                                : `https://themoviesverse.co/?s= ${
                                    obj.state.modal.details.title
                                      ? obj.state.modal.details.title
                                      : obj.state.modal.details.name
                                  }`
                              : ""
                            : ""
                        }`}
                        target="_blank"
                      >
                        <button className="btn btn-primary btn-primary btn-sm mt-2">
                          Download
                        </button>
                      </a>
                    </div>
                  </div>

                  <div className="rounded border border-dark modaloverview mt-3 p-1">
                    <small>
                      {obj.state.modal.details.overview
                        ? obj.state.modal.details.overview
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
                                  alt="no image found"
                                />

                                <div className="modalcastcontent mx-3  text-center">
                                  <small>
                                    <span>
                                      <strong className="p-1 row justify-content-around">
                                        {val.name}
                                        <a
                                          target="_blank"
                                          href={`https://en.wikipedia.org/wiki/${val.name.replace(
                                            " ",
                                            "_"
                                          )}`}
                                        >
                                          {" "}
                                          <i className="fa fa-wikipedia-w "></i>
                                        </a>
                                      </strong>
                                    </span>
                                    <div className="my-2 ">{` (${val.character})`}</div>
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
                      obj.dispatcher({ type: "modal" });
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
