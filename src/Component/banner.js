import React, { useState, useEffect } from "react";
import axios from "axios";
import "./assets/css/banner.css";
import { Carousel } from "react-bootstrap";
import Card from "./card";

export default function Banner() {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    const bannerfun = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/week?api_key="Enter_API_KEY"`
      );
      setBanner(data.results);
    };
    bannerfun();
  }, []);

  return (
    <div className="banner text-white d-flex justify-content-center ">
      <Carousel
        interval={2000}
        fade={true}
        pause={false}
        indicators={false}
        prevLabel={""}
        nextLabel={""}
        nextIcon={[
          <div className="px-3 py-2 bg-dark rounded-circle" key={1}>
            <span
              aria-hidden="true"
              className="mt-2 carousel-control-next-icon"
            />
          </div>,
        ]}
        prevIcon={[
          <div className="px-3 py-2  bg-dark rounded-circle" key={2}>
            <span
              aria-hidden="true"
              className="mt-2 carousel-control-prev-icon"
            />
          </div>,
        ]}
      >
        {banner.map((val, ind) => {
          return (
            <Carousel.Item key={ind} className=" ">
              <div
                className="bannerbody px-2  "
                style={{
                  backgroundImage: `linear-gradient(transparent,#13151f),url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${
                    val.backdrop_path
                      ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${val.backdrop_path}`
                      : ``
                  })`,
                  backgroundSize: "cover",
                }}
              >
                <div className="bannerimgdiv  p-1">
                  <img
                    className="bannerimg  "
                    src={` ${
                      val.poster_path
                        ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${val.poster_path}`
                        : ``
                    }`}
                    alt="poster_image"
                  />
                </div>
                <div className="bannercontent  mt-0">
                  <div className="  bannertitle justify-content-center  font-weight-bold">
                    {val.title ? val.title : val.name}

                    {val.media_type ? (
                      <div className="mx-auto">
                        {val.media_type === "tv"
                          ? "( Web Series )"
                          : " ( Movie )"}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>

                  <Card
                    media_type={val.media_type}
                    val={val}
                    getDetailsForBanner={true}
                  />

                  <div className="row w-100 mx-auto  justify-content-center">
                    {!(val.vote_average == 0) ? (
                      <div>
                        <i className="fa fa-star mr-1 text-warning"></i>
                        {val.vote_average} / 10
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>

                  <div className="row banneroverview w-100 mx-auto  justify-content-center">
                    {val.overview}
                  </div>
                </div>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
