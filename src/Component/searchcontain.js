import React, { useEffect, useState } from "react";
import Card from "./card";

export default function Search(props) {
  {
    /*The Moive & Web-seires Search Content undefined media_type that's we used manual media_type*/
    /*The Multi Search Content defined media_type */
  }
  const [media_type, setMedia_type] = useState("movie");
  useEffect(() => {
    switch (props.title) {
      case "Movie":
        setMedia_type("movie");
        break;
      case "Web Series":
        setMedia_type("tv");
        break;
      default:
        setMedia_type("movie");
    }
  }, [props.title]);

  return (
    <>
      {!props.obj.length ? (
        <div className="norecordfound h2">No Record Found</div>
      ) : (
        <div></div>
      )}
      {props.obj.map((val, ind) => {
        return (
          <div key={ind}>
            {/*The Multi Search Content All types of Data*/}
            {val.media_type === "person" ? (
              <div></div>
            ) : (
              <Card
                media_type={val.media_type ? val.media_type : media_type}
                val={val}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
