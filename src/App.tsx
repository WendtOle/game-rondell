import React from "react";
import { SessionView } from "./SessionView";
import { RecoilRoot } from "recoil";

export const App = () => {
  return (
    <RecoilRoot>
      <SessionView />
    </RecoilRoot>
  );
};
