import React, { useEffect } from "react";
import Header from "./header";
import Banner from "./banner";
import Homeslide from "./homeslide";
import Footer from "./footer";
import { useContext } from "react";
import { Global } from "../ContexReducer/contex";
import Homesearch from "./homesearch";

export default function MovieTime() {
  const obj = useContext(Global);
  useEffect(() => {
    obj.dispatcher({ type: "search", payload: "" });
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <div className="back">
        <Header />

        {obj.state.search === "" ? (
          <Banner />
        ) : (
          <div>
            <Homesearch />
            <Footer />
          </div>
        )}
      </div>
      {obj.state.search === "" ? (
        <div>
          <Homeslide />
          <Footer />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
