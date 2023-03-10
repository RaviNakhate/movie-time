import React from "react";
import "./assets/css/footer.css";
import Logo from "./assets/logo.png";

export default function Footer() {
  return (
    <>
      <footer className="footerDistributed">
        <div className="footerRight">
          <a href="https://www.instagram.com/ravi_nakhate_/" target="_blank">
            <i className="fa fa-instagram"></i>
          </a>
          <a
            href="https://twitter.com/RaviNakhate2?t=mbn2hpUjncbMBMd_BxPTeg&s=09"
            target="_blank"
          >
            <i className="fa fa-twitter"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/ravi-nakhate-a1272b1ba/"
            target="_blank"
          >
            <i className="fa fa-linkedin"></i>
          </a>
          <a href="https://github.com/RaviNakhate" target="_blank">
            <i className="fa fa-github"></i>
          </a>
        </div>

        <div className="footerLeft">
          <p className="footerLinks">
            <a href="/">Home</a>
            {" | "}
            <a href="/movies">Movies</a>
            {" | "}
            <a href="/webseries">Web Series</a>
          </p>

          <p className="footerCompany">
            Movie Time &copy; 2023 | Ravi D. Nakhate | ravi165528@gmail.com
          </p>
        </div>
      </footer>
    </>
  );
}
