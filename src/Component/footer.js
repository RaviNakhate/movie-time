import React from "react";
import "./assets/css/footer.css";
import Logo from "./assets/logo.png";

export default function Footer() {
  return (
    <>
      <div className="footer text-white">
        <div className="row mx-5 justify-content-center">
          <div className="footerlogo">
            <img src={Logo} className="footerlogoimg" />
            <span className="footerlogotxt">MovieTime</span>
          </div>
        </div>
        <div className="row mx-5 my-5 justify-content-center">
          <span className="develop">
            <span
              style={{
                color: "orange",
                marginRight: "5px",
              }}
            >
              Develop
            </span>
            by
            <span style={{ color: "green", marginLeft: "5px" }}>
              Ravi Nakhate
            </span>
          </span>
        </div>
        <div className="row mx-5  justify-content-around ">
          <div className="w-50 mb-5 d-flex justify-content-around">
            <a href="https://www.instagram.com/ravi_nakhate_/" target="_blank">
              <i className="fa fa-instagram"></i>
            </a>

            <a href="https://github.com/RaviNakhate" target="_blank">
              <i className="fa fa-github"></i>
            </a>
            <a
              href="https://twitter.com/RaviNakhate2?t=mbn2hpUjncbMBMd_BxPTeg&s=09"
              target="_blank"
            >
              <i className="fa fa-twitter "></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
