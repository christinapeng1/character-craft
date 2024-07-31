import React, { useState, useEffect } from "react";
import { useVoice } from "@humeai/voice-react";
import sessionSettings from "./sessionSettings";
import { useNavigate } from "react-router-dom";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import ToggleThemeButton from "../components/buttons/ToggleThemeButton";
import DisconnectButton from "../components/buttons/DisconnectButton";
import StorySlideshow from "../components/About";
import MenuList from "../components/MenuList";
import Messages from "../components/Messages";
import FoxCanvas from "../components/3d-canvas/FoxCanvas";
import Controls from "../components/controls-panel/Controls";
import "../pages/Home.css";

const { Header, Sider } = Layout;

const ChatInterface = ({
  characterNames,
  assistantColorTheme,
  userColorTheme,
  currentChatLabel,
  chatGroupsData,
  handleChatSelect,
  aboutOpen,
  handleCloseStorySlides,
  currentChat,
  chatGroupTranscript,
  handleRenameClick,
  isRenamingChat,
  handleRenameInputChange,
  handleRenameKeyDown,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const {
    sendPauseAssistantMessage,
    sendResumeAssistantMessage,
    sendSessionSettings,
    sendUserInput,
    mute,
    unmute,
    muteAudio,
    unmuteAudio,
    lastVoiceMessage,
    clearMessages,
    connect,
    disconnect,
    status,
    isMuted,
    isAudioMuted,
  } = useVoice();
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    disconnect();
    navigate("/");
  };

  useEffect(() => {
    if (status.value === "connected") {
      disconnect();
      clearMessages();
    }
  }, [currentChat]);

  const handleConnectChatGroup = async () => {
    if (status.value === "disconnected") {
      connect().then(() => {
        sendSessionSettings(sessionSettings);
        sendUserInput(`BEGIN_MESSAGE: begin the conversation or continue where
          you left off. Take into context the previous conversation and continue
          your role as a writer's assistant, embodying the character the user is creating.`);
        setIsPaused(false);
      });
    } else {
      handlePause();
    }
  };

  const handlePause = () => {
    if (isPaused) {
      sendResumeAssistantMessage();
      setIsPaused(false);
      if (!isAudioMuted) {
        unmuteAudio();
      }
    } else {
      sendPauseAssistantMessage();
      setIsPaused(true);
      muteAudio();
    }
  };

  const handleMuteMic = () => {
    if (isMuted) {
      unmute();
    } else {
      mute();
    }
  };

  const handleMuteAudio = () => {
    if (isAudioMuted) {
      unmuteAudio();
    } else {
      muteAudio();
    }
  };

  const isDisabled = status.value === "disconnected" || isPaused;

  const handleChangeColor = () => sendUserInput("Change the color theme to a random color.");

  const toggleTheme = () => setDarkTheme(!darkTheme);

  const handleToggleClick = () => setCollapsed(!collapsed);

  return (
    <React.Fragment>
      <StorySlideshow open={aboutOpen} onClose={handleCloseStorySlides} />
      <ToggleThemeButton darkTheme={darkTheme} togglTheme={toggleTheme} />
      <div className="sidebar-wrapper pointer-events-auto">
        <Layout>
          <Sider
            className="menu-bar pointer-events-auto"
            theme={darkTheme ? "dark" : "light"}
            collapsed={collapsed}
            collapsible
            trigger={null}
          >
            <MenuList
              darkTheme={darkTheme}
              onChatSelect={(key, event) => handleChatSelect(key, event)}
              characterNames={characterNames}
              chatGroupsData={chatGroupsData}
            />
            {collapsed ? (
              <div className="placeholder"></div>
            ) : (
              <div className="disconnect-button-wrapper pointer-events-auto">
                <DisconnectButton
                  handleNavigateHome={handleNavigateHome}
                  darkTheme={darkTheme}
                />
              </div>
            )}
          </Sider>
          <Layout>
            <Header style={{ padding: 0 }}>
              <Button
                type="text"
                className="toggle pointer-events-auto"
                onClick={handleToggleClick}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              />
            </Header>
          </Layout>
        </Layout>
      </div>
      <div className="chat-wrapper">
        <Messages
          assistantColorTheme={assistantColorTheme}
          userColorTheme={userColorTheme}
          chatGroupTranscript={chatGroupTranscript}
        />
      </div>
      <div className="foxcanvas-wrapper pointer-events-auto">
        <FoxCanvas />
      </div>
      <Controls
        color={assistantColorTheme}
        currentChatLabel={currentChatLabel}
        handleConnectChatGroup={handleConnectChatGroup}
        lastVoiceMessage={lastVoiceMessage}
        status={status}
        handleChangeColor={handleChangeColor}
        handleMuteMic={handleMuteMic}
        handleMuteAudio={handleMuteAudio}
        isPaused={isPaused}
        isDisabled={isDisabled}
        isMicMuted={isMuted}
        isAudioMuted={isAudioMuted}
        handleRenameClick={handleRenameClick}
        isRenamingChat={isRenamingChat}
        handleRenameInputChange={handleRenameInputChange}
        handleRenameKeyDown={handleRenameKeyDown}
      />
    </React.Fragment>
  );
};

export default ChatInterface;
