import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Component/App";
import Model from "./Component/model";
import { store } from "./store/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
export default root.render(
  <>
    <Provider store={store}>
      <App />
      <Model />
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
