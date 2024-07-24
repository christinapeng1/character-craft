import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import "./DisconnectButton.css";

const DisconnectButton = ({ handleLeaveChatStage, darkTheme }) => {
  return (
    <button
      className={`disconnect-button ${darkTheme ? "dark" : "light"}`}
      onClick={handleLeaveChatStage}
    >
      <LogoutOutlined className="icon" />
      Disconnect
    </button>
  );
};

export default DisconnectButton;
