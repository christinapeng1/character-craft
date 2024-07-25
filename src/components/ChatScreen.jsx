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
  colorTheme,
  currentCharacter,
  colorBgContainer,
  chatGroupsData,
  handleChatSelect,
  storySlidesOpen,
  handleCloseStorySlides,
  setSelectedChat,
  selectedChat,
  chatGroupTranscript,
  handleLeaveChatStage,
  setNewChat,
  newChat,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);

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
          colorTheme={colorTheme}
          chatGroupTranscript={chatGroupTranscript}
          setNewChat={setNewChat}
          newChat={newChat}
        />
      </div>
      <div className="foxcanvas-wrapper pointer-events-auto">
        <FoxCanvas />
      </div>
      <Controls
        color={colorTheme}
        currentCharacter={currentCharacter}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
    </React.Fragment>
  );
};

export default ChatScreen;
