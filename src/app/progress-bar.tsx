"use client";

import { ReactNode } from "react";

import { AppProgressBar } from "next-nprogress-bar";

const ProgressBar = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <AppProgressBar height="4px" color="#33337a" options={{ showSpinner: true }} shallowRouting />
    </>
  );
};

export default ProgressBar;
