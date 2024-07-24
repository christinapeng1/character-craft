import React from "react";
import KiteCanvas from "./3d-canvas/KiteCanvas";
import "../pages/home/Home.css";

const WelcomeScreen = ({ handleEnterChatStage, status }) => {
  return (
    <React.Fragment>
      <div className="kitecanvas-wrapper">
        <KiteCanvas />
      </div>
      <div className="about-container">
        <h1 className="title-text pointer-events-none">
          Where do lost kites go?
        </h1>
        <h2 className="subtitle-text pointer-events-none">
          Talking to characters across worlds
        </h2>
        <button onClick={handleEnterChatStage} className="disconnected-button">
          {status.value === "connected" ? "disconnect" : "follow the kites"}
        </button>
      </div>
    </React.Fragment>
  );
};

export default WelcomeScreen;
