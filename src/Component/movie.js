import React, { useEffect } from "react";
import Header from "./header";
import Category from "./category";
import Footer from "./footer";
import { Global } from "../ContexReducer/contex";
import { useContext } from "react";

export default function Movie() {
  const obj = useContext(Global);
  useEffect(() => {
    obj.dispatcher({ type: "search", payload: "" });
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <div className="back text-white">
        <Header />
        <Category media_type="movie" />
        <Footer />
      </div>
    </>
  );
}
