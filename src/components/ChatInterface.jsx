import React, { useState, useEffect } from "react";
import { useVoice } from "@humeai/voice-react";
import sessionSettings from "../pages/chat/sessionSettings";
import { useNavigate } from "react-router-dom";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import DisconnectButton from "./buttons/DisconnectButton";
import About from "./About";
import MenuList from "./MenuList";
import Messages from "./Messages";
import FoxCanvas from "./3d-canvas/FoxCanvas";
import Controls from "./controls-panel/Controls";
import "../pages/pages.css";

const { Header, Sider } = Layout;

const ChatInterface = ({
  characterNames,
  assistantColorTheme,
  userColorTheme,
  currentChatLabel,
  chatGroupsData,
  handleChatSelect,
  aboutOpen,
  handleCloseAbout,
  currentChat,
  chatGroupTranscript,
  handleRenameClick,
  isRenamingChat,
  handleRenameInputChange,
  handleRenameKeyDown,
}) => {
  const navigate = useNavigate();
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

  // Handle navigation to home page
  const handleNavigateHome = () => {
    disconnect();
    navigate("/");
  };

  useEffect(() => {
    // Disconnect and clear messages when currentChat changes
    if (status.value === "connected") {
      disconnect();
      clearMessages();
    }
  }, [currentChat]);

  // Handle connecting to chat group
  const handleConnectChatGroup = async () => {
    if (status.value === "disconnected") {
      connect().then(() => {
        // A Session Settings message is sent at the start of each conversation
        // to equip EVI with the tools and context needed to assist the user.
        sendSessionSettings(sessionSettings);
        // Send a message to the assistant reminding it of its role.
        sendUserInput(`BEGIN_MESSAGE: begin the conversation or continue where
          you left off. Take into context the previous conversation and continue
          your role as a writer's assistant, embodying the character the user is creating.`);
        // Unpause the conversation
        setIsPaused(false);
      });
    } else {
      handlePause();
    }
  };

  // Handle pausing/resuming assistant
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

  // Handle muting/unmuting microphone
  const handleMuteMic = () => {
    if (isMuted) {
      unmute();
    } else {
      mute();
    }
  };

  // Handle muting/unmuting audio
  const handleMuteAudio = () => {
    if (isAudioMuted) {
      unmuteAudio();
    } else {
      muteAudio();
    }
  };

  // Handle changing color theme
  const handleChangeColor = () => sendUserInput("Change the color theme to a random color.");

  // Toggle dark theme for the menu
  const toggleTheme = () => setDarkTheme(!darkTheme);

  // Handle collapsing/expanding the menu
  const handleMenuCollapse = () => setCollapsed(!collapsed);

  const isDisabled = status.value === "disconnected" || isPaused;

  return (
    <React.Fragment>
      <About open={aboutOpen} onClose={handleCloseAbout} />
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
                onClick={handleMenuCollapse}
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
        <FoxCanvas onClick={toggleTheme} />
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
