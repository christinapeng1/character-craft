import React, { useState, useEffect } from "react";
import { useVoice } from "@humeai/voice-react";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import ToggleThemeButton from "./ui/toggle-theme/ToggleThemeButton";
import DisconnectButton from "./ui/DisconnectButton";
import StorySlideshow from "./ui/story-slideshow/StorySlideshow";
import MenuList from "./ui/MenuList";
import Messages from "./Messages";
import FoxCanvas from "./3d-canvas/FoxCanvas";
import Controls from "./ui/controls-panel/Controls";
import Popover from "@mui/material/Popover";
import "../pages/home/Home.css";

const { Header, Sider } = Layout;

const ChatScreen = ({
  characterNames,
  characterColor,
  currentCharacter,
  colorBgContainer,
  chatGroupsData,
  handleChatSelect,
  storySlidesOpen,
  handleCloseStorySlides,
  handleHidePopover,
  setPopoverVisible,
  popoverVisible,
  popoverTarget,
  chatGroupTranscript,
  handleLeaveChatStage,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const { connect, disconnect, status, sendUserInput, clearMessages } =
    useVoice();

  const toggleTheme = () => setDarkTheme(!darkTheme);

  const handleToggleClick = () => setCollapsed(!collapsed);

  useEffect(() => {
    if (popoverVisible) {
      disconnect();
      clearMessages();
    }
  }, [popoverVisible]);

  const handleOpenChatGroup = async () => {
    connect().then(() => {
      sendUserInput("Continue where we left off");
      setPopoverVisible(false);
    });
  };

  return (
    <React.Fragment>
      <StorySlideshow open={storySlidesOpen} onClose={handleCloseStorySlides} />
      <Popover
        open={popoverVisible}
        anchorEl={popoverTarget}
        onClose={handleHidePopover}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <div>
          <Button type="primary" onClick={handleOpenChatGroup}>
            Open
          </Button>
        </div>
      </Popover>
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
              <div className="disconnect-button-wrapper">
                <DisconnectButton
                  handleLeaveChatStage={handleLeaveChatStage}
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
          characterColor={characterColor}
          chatGroupTranscript={chatGroupTranscript}
        />
      </div>
      <div className="foxcanvas-wrapper pointer-events-auto">
        <FoxCanvas />
      </div>
      <Controls color={characterColor} currentCharacter={currentCharacter} />
    </React.Fragment>
  );
};

export default ChatScreen;
