import React, { useEffect } from "react";
import Banner from "../Component/banner";
import Homeslide from "../Component/homeslide";
import { useSelector } from "react-redux";

export default function Home() {
  const {
    searchState: { search },
  } = useSelector((state) => state);

  return (
    <>
      <Banner />
      <Homeslide />
    </>
  );
}
