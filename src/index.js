import React from "react";
import ReactDOM from "react-dom/client";
import './assets/styles/color.css';
import './assets/styles/font.css';
import App from "./App";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
