import React, { useState, useEffect } from "react";
import { useVoice } from "@humeai/voice-react";
import { useNavigate } from "react-router-dom";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import ToggleThemeButton from "../components/ui/toggle-theme/ToggleThemeButton";
import DisconnectButton from "../components/ui/DisconnectButton";
import StorySlideshow from "../components/ui/story-slideshow/StorySlideshow";
import MenuList from "../components/ui/MenuList";
import Messages from "../components/Messages";
import FoxCanvas from "../components/3d-canvas/FoxCanvas";
import Controls from "../components/ui/controls-panel/Controls";
import "../pages/Home.css";

const { Header, Sider } = Layout;

const Chat = ({
  characterNames,
  colorTheme,
  currentCharacter,
  colorBgContainer,
  chatGroupsData,
  handleChatSelect,
  storySlidesOpen,
  handleCloseStorySlides,
  currentChat,
  chatGroupTranscript,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const {
    sendPauseAssistantMessage,
    sendResumeAssistantMessage,
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
    isAudioMuted
  } = useVoice();
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  useEffect(() => {
    if (status.value === "connected"){
      disconnect();
      clearMessages();
    }
  }, [currentChat]);

  const handleConnectChatGroup = async () => {
    if (status.value === "disconnected") {
      connect().then(() => {
        sendUserInput("CONTINUE_MESSAGE: continue where we left off");
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

  const handleChangeColor = () => sendUserInput("COLOR_THEME_CHANGE");

  const toggleTheme = () => setDarkTheme(!darkTheme);

  const handleToggleClick = () => setCollapsed(!collapsed);

  return (
    <React.Fragment>
      <StorySlideshow open={storySlidesOpen} onClose={handleCloseStorySlides} />
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
            <Header style={{ padding: 0, background: colorBgContainer }}>
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
          colorTheme={colorTheme}
          chatGroupTranscript={chatGroupTranscript}
        />
      </div>
      <div className="foxcanvas-wrapper pointer-events-auto">
        <FoxCanvas />
      </div>
      <Controls
        color={colorTheme}
        currentCharacter={currentCharacter}
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
      />
    </React.Fragment>
  );
};

export default Chat;
