import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./assets/css/search.css";

export default function Filter(props) {
  const dispatcher = useDispatch();
  const {
    filterState: { filtertoggle, filter },
  } = useSelector((state) => state);
  return (
    <>
      <div
        className="row mt-3 mx-3 
          
        }  justify-content-start text-white"
      >
        {props.filterfun ? (
          <>
            <div className="row w-100 mb-2 justify-content-center mx-auto filtertoggle">
              <button
                className="btn w-100 btn-sm row text-white text-left"
                onClick={() => {
                  dispatcher({ type: "filtertoggle" });
                }}
              >
                <div className="float-left ml-3">Filter </div>
                <i className="fa fa-filter text-white float-right m-1"></i>
              </button>
            </div>

            <div
              className={`row filterlist ${
                filtertoggle ? "d-none" : ""
              } h-25 mx-auto`}
            >
              {filter.map((val, ind) => {
                const booleanCheck = props.arr.includes(val.id);

                return (
                  <div key={ind}>
                    <div
                      className={`filtertxt ${
                        booleanCheck ? "filteractive" : ""
                      }`}
                      onClick={() => {
                        props.filterfun(val.id, ind, val.lang);
                      }}
                    >
                      {val.name}
                    </div>
                  </div>
                );
              })}
              <div>
                <div
                  className=" row align-items-center p-1 ml-1 "
                  onClick={() => {
                    props.filterfun("clear");
                  }}
                >
                  <div className="filtertxtclosetitle  p-2 px-3 m-1">
                    Clear All
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
