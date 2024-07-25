import React from "react";
import KiteCanvas from "../components/3d-canvas/KiteCanvas";
import "./Home.css"
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const handleNavigateToNewChat = () => {
    navigate("/chat/new");
  };

  return (
    <React.Fragment>
      <div className="kitecanvas-wrapper pointer-events-auto">
        <KiteCanvas />
      </div>
      <div className="about-container">
        <h1 className="title-text">
          Message in a Kite
        </h1>
        <h2 className="subtitle-text">
          An interactive chat interface
        </h2>
        <button
          onClick={handleNavigateToNewChat}
          className="enter-chat-button"
        >
          follow the kites
        </button>
      </div>
      <div className="gradient-bg w-full h-full absolute top-0 left-0 pointer-events-none"></div>
    </React.Fragment>
  );
};

export default Home;
