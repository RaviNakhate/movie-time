import React, { useEffect, useState } from "react";
import "./assets/css/model.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Keyboard, Mousewheel, Autoplay } from "swiper";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import { Modal, Avatar } from "@mui/material";
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
        `https://api.themoviedb.org/3/${obj.state.modal.media_type}/${obj.state.modal.id}/credits?api_key="Enter_here_API_key"&language=en-US`
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
          }/videos?api_key="Enter_here_API_key"&language=en-US`
        );

        if (data.results.length) {
          setVideo(data.results[0].key);
        } else {
          setVideo("");
        }
      } else {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${obj.state.modal.id}/videos?api_key="Enter_here_API_key"&language=en-US`
        );

        if (data.results.length) {
          setVideo(data.results[0].key);
        } else {
          setVideo(0);
        }
      }
    };

    getvideo();
    getcast();
  }, [obj.state.modal.id, obj.state.modal]);

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
                <div className="row justify-content-center align-items-center ">
                  <div>
                    <div>
                      <img
                        src={
                          obj.state.modal.details.poster_path
                            ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${obj.state.modal.details.poster_path}`
                            : " "
                        }
                        alt="not found"
                        className="modelimg  "
                      />
                    </div>
                    <div className="row justify-content-center  my-3">
                      {video ? (
                        <a
                          href={`https://www.youtube.com/watch?v=${video}`}
                          target="_blank"
                        >
                          <button className="btn btn-danger btn-sm">
                            WATCH THE TRAILER
                            <i className="fa fa-youtube-play text-white ml-2  "></i>
                          </button>
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                <div className="modelcontent text-center  mx-auto my-5 ">
                  <div className="h3 font-weight-bold">
                    {obj.state.modal.details.title
                      ? obj.state.modal.details.title
                      : obj.state.modal.details.name}

                    {` (${
                      obj.state.modal.media_type == "movie"
                        ? "Movie"
                        : "Web Series"
                    })`}
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
                      spaceBetween={10}
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
                      className="modalswiper py-3 border border-dark rounded"
                    >
                      {cast.length ? (
                        cast.map((val, ind) => {
                          return (
                            <div key={ind}>
                              <SwiperSlide
                                key={ind}
                                className="modalswiperslide bg-dark my-auto"
                                style={{
                                  backgroundImage: `linear-gradient(#13151f,transparent,#13151f),url(${
                                    val.profile_path
                                      ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${val.profile_path}`
                                      : ``
                                  })`,
                                  backgroundSize: "cover",
                                }}
                              >
                                <Avatar
                                  sx={{ width: 56, height: 56 }}
                                  className="mx-auto my-4"
                                  style={{ border: "3px solid white" }}
                                  alt={val.name.slice(0)}
                                  src={`${
                                    val.profile_path
                                      ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${val.profile_path}`
                                      : ``
                                  }`}
                                />
                                <div className="modalcastcontent">
                                  <small>
                                    <span>
                                      <strong> {val.name} </strong>
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
                                    </span>
                                    <div className="my-2">{` (${val.character})`}</div>
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
