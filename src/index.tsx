import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App className="app" />
  </React.StrictMode>,
  document.getElementById("root")
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if ((import.meta as any).hot) {
  (import.meta as any).hot.accept();
}
