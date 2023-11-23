"use client";
import { useEffect, useState, useContext } from "react";
import AppContext from "../Context/AppContext";

const ProcessingOverlay = () => {
  
  const { appState, setAppState } = useContext(AppContext);

  

  return (
    <>
      {appState.processingOverlay.visible ? (
      <div className="page-overlay">
        <div className="flex page-overlay-message mt-12 align-bottom justify-center"> {appState.processingOverlay.title}</div>
      </div>
      ) : null }
    </>
  );
};

export default ProcessingOverlay;