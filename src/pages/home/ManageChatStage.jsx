import { useVoice } from '@humeai/voice-react';
import React, { useState } from 'react';
import { Layout, theme } from "antd";
import "./Home.css";
import WelcomeScreen from './welcome-stage/WelcomeScreen';
import ChatScreen from "./evi-chat-stage/ChatScreen";

/**
 * Main view for displaying the conversation
 */
const {Header, Sider} = Layout;

const ChatStage = ({
  characterNames,
  characterColor,
  currentCharacter
}) => {
  const {
    connect,
    disconnect,
    status,
    sendUserInput,
    lastVoiceMessage
  } = useVoice();
  const [darkTheme, setDarkTheme] = useState(true);
  const [storySlidesOpen, setStorySlidesOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [inChatStage, setInChatStage] = useState(false);

  // convert to chat screen, connect!
  const handleEnterChatStage = () => {
    try {
        connect().then(() => {
          setInChatStage(true);
          sendUserInput("say your greeting");
        });
      } catch (e) {
        setInChatStage(false);
        console.error(e);
      }
    };

  const handleChatSelect = (menuItem) => {
    if (menuItem === "story") {
      setStorySlidesOpen(true);
    } else {
      sendUserInput(
        `TALK_TO_SAVED_CHARACTER: ${menuItem}`
      );
    }
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div className="main-container">
      <div>
        {!inChatStage ? (
          <WelcomeScreen
            handleEnterChatStage={handleEnterChatStage}
            status={status}
          />
        ) : (
          <ChatScreen
            darkTheme={darkTheme}
            toggleTheme={toggleTheme}
            storySlidesOpen={storySlidesOpen}
            setStorySlidesOpen={setStorySlidesOpen}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            handleChatSelect={handleChatSelect}
            characterNames={characterNames}
            characterColor={characterColor}
            currentCharacter={currentCharacter}
            colorBgContainer={colorBgContainer}
          />
        )}
      </div>
    </div>
  );
};

export default ChatStage;