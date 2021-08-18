import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import SolarSystem from "./SolarSystemScene";
import Test from "./Test";
// import MyCallbackTest from './MyCallbackTest';

import 'antd/dist/antd.css'

ReactDOM.render(
  <React.StrictMode>
    {/* <SolarSystem /> */}
    <Test />
    {/* <MyCallbackTest /> */}
  </React.StrictMode>,
  document.getElementById("root")
)

