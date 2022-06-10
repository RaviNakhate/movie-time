import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Component/App";
import Contex from "./ContexReducer/contex";
import Model from "./Component/model";

const root = ReactDOM.createRoot(document.getElementById("root"));
export default root.render(
  <>
    <Contex>
      <App />
      <Model />
    </Contex>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
