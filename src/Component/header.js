import React from "react";
import "./assets/css/header.css";
import Logo from "./assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const {
    searchState: { search },
  } = useSelector((state) => state);
  console.log(window.location.pathname);

  const menus = (id) => {
    return (
      <>
        <div className="menus" id={`menu-${id}`}>
          <NavLink to="/" className="mx-3 menus-item ">
            Home
          </NavLink>
          <NavLink to="/movies/1" className="mx-3 menus-item ">
            Movies
          </NavLink>
          <NavLink to="/webseries/1" className="mx-3 menus-item">
            Web series
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="header-tank">
        <div className="header-container-1 ">
          <div
            className="header-container-child-1"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={Logo} alt="logo" className="logo-img" />
            <span className="logo-text">Movie Time</span>
          </div>

          <div className="header-container-child-2">
            {menus(1)}

            {window.location.pathname === "/movietime/" ? (
              ""
            ) : (
              <div className="search-div">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    dispatcher({ type: "search", payload: e.target.value });
                  }}
                  className="searchtext "
                  placeholder="search here..."
                />
                {search ? (
                  <i
                    className="fa fa-close text-white"
                    onClick={() => {
                      dispatcher({ type: "search", payload: "" });
                    }}
                  ></i>
                ) : (
                  <i className="fa fa-search text-white "></i>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="header-container-2">{menus(2)}</div>
      </div>
    </>
  );
};

export default Header;
