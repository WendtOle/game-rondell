import { createRoot } from "react-dom/client";
import { App } from "./App";
import React from "react";
import { RecoilRoot } from "recoil";

const container = document.getElementById("app");
if (!container) throw new Error("No container");
const root = createRoot(container);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
