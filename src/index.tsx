import React from "react";
import ReactDOM from "react-dom";
// import dva from "dva";
import App from "./pages/app";

// const app = dva();
// app.model({
//   namespace: "count",
//   state: 0,
//   reducers: {
//     add(count) {
//       return count + 1;
//     },
//     minus(count) {
//       return count - 1;
//     },
//   },
// });

// // 4. Router
// app.router(() => (
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// ));

// // 5. Start
// app.start("#root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if ((import.meta as any).hot) {
  (import.meta as any).hot.accept();
}
