import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import "./DisconnectButton.css";

const DisconnectButton = ({ handleNavigateHome, darkTheme }) => {
  return (
    <button
      className={`disconnect-button ${darkTheme ? "dark" : "light"}`}
      onClick={handleNavigateHome}
    >
      <LogoutOutlined className="icon" />
      Disconnect
    </button>
  );
};

export default DisconnectButton;
