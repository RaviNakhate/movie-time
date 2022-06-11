import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Navigation } from "swiper";
import "swiper/css/navigation";
import "swiper/css";
import Card from "./card";

export default function Slide(props) {
  return (
    <>
      <div className="container text-white my-4">
        <div>
          <div className="row title justify-content-center">
            <div className="titlehead">{props.title}</div>
          </div>

          <Swiper
            spaceBetween={125}
            slidesPerView={3}
            navigation
            modules={[Navigation, Keyboard, Mousewheel]}
            mousewheel={true}
            keyboard={{ enabled: true }}
            breakpoints={{
              480: {
                slidesPerView: 3,
                spaceBetween: 175,
              },
            }}
            className="px-5"
          >
            {props.obj.map((val, ind) => {
              return (
                <div key={ind}>
                  <SwiperSlide key={ind}>
                    {/*we get media_type props whenever rendering*/}
                    <Card media_type={props.media_type} val={val} />
                  </SwiperSlide>
                </div>
              );
            })}

            {props.limitfun ? (
              <SwiperSlide>
                <div className="viewmore ">
                  <div
                    className="viewmoreitem"
                    onClick={() => {
                      props.limitfun(props.limit);
                    }}
                  >
                    view more
                  </div>
                </div>
              </SwiperSlide>
            ) : (
              <div></div>
            )}
          </Swiper>
        </div>
      </div>
    </>
  );
}
