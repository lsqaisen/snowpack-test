import React from "react";
import ReactDOM from "react-dom";
import dva from "dva";
import Router from "./router";
console.log(dva);
const app = (dva as any).default();
app.model({
  namespace: "count",
  state: 0,
  reducers: {
    add(count: number) {
      return count + 1;
    },
    minus(count: number) {
      return count - 1;
    },
  },
});

// 4. Router
app.router((props: any) => <Router />);

// 5. Start
app.start("#root");

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if ((import.meta as any).hot) {
  (import.meta as any).hot.accept();
}
