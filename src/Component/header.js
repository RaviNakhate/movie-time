import React from "react";
import "./assets/css/header.css";
import Logo from "./assets/logo.png";
import { useRef } from "react";
import { Global } from "../ContexReducer/contex";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const obj = useContext(Global);
  const toggle = useRef("");
  const types = window.location.pathname;
  const type = types.slice(1, types.length);

  const togglefun = () => {
    toggle.current.style.display === "block"
      ? (toggle.current.style.display = "none")
      : (toggle.current.style.display = "block");
  };

  const searchtype = (e) => {
    obj.dispatcher({
      type: "searchtype",
      payload: e,
    });
  };

  return (
    <>
      <div className="container-md-fluid mt-3 ">
        <div className="row text-white justify-content-md-between  justify-content-center mx-4">
          <div className="row  contain1 justify-content-between stick">
            <div
              className="logo px-2  py-3 "
              onClick={() => {
                navigate("/movietime");
              }}
            >
              <img src={Logo} alt="logo" className="logoimg" />
              <span className="logotxt">MovieTime</span>
            </div>

            <div className=" d-flex align-items-center">
              <i
                className="fa fa-bars fa-2x"
                onClick={() => {
                  togglefun();
                }}
              ></i>
              <div className="listnone">
                <div className="list" ref={toggle}>
                  <ul
                    type="none"
                    onClick={() => {
                      togglefun();
                    }}
                  >
                    <li className="mt-1">
                      <NavLink
                        to="/movietime"
                        className="menuslist "
                        onClick={() => {
                          searchtype("search");
                        }}
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/movie"
                        className="menuslist "
                        onClick={() => {
                          searchtype("movies");
                        }}
                      >
                        Movies
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/webseries"
                        className="menuslist "
                        onClick={() => {
                          searchtype("webseires");
                        }}
                      >
                        Web series
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row contain2 justify-content-center align-items-center">
            <div className="menus red  mr-4 ">
              <NavLink
                to="/movietime"
                className="mx-3 menusitem "
                onClick={() => {
                  searchtype("search");
                }}
              >
                Home
              </NavLink>
              <NavLink
                to="/movie"
                className="mx-3 menusitem "
                onClick={() => {
                  searchtype("movies");
                }}
              >
                Movies
              </NavLink>
              <NavLink
                to="/webseries"
                className="mx-3 menusitem"
                onClick={() => {
                  searchtype("webseires");
                }}
              >
                Web series
              </NavLink>
            </div>

            <div className="my-3" id="form">
              <div className="search">
                <div className="searchselect mx-3">
                  {type.replace("/", " ")}
                </div>
                <input
                  type="text"
                  value={obj.state.search}
                  onChange={(e) => {
                    obj.dispatcher({ type: "search", payload: e.target.value });
                  }}
                  className="searchtxt ml-2"
                  placeholder="search here..."
                />
                {obj.state.search ? (
                  <i
                    className="fa fa-close searchicon  my-3 mx-3"
                    onClick={() => {
                      obj.dispatcher({ type: "search", payload: "" });
                    }}
                  ></i>
                ) : (
                  <i className="fa fa-search searchicon  my-3 mx-3"></i>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fix">
        <i
          className="fa fa-arrow-up"
          onClick={() => {
            window.scroll(0, 0);
          }}
        ></i>
      </div>
    </>
  );
}
