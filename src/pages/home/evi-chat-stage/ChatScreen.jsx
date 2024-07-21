import React from "react";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import ToggleThemeButton from "../../../components/ui/toggle-theme/ToggleThemeButton";
import StorySlideshow from "../../../components/ui/story-slideshow/StorySlideshow";
import MenuList from "../../../components/ui/MenuList";
import Messages from "./Messages";
import FoxCanvas from "../../../components/3d-canvas/FoxCanvas";
import Controls from "../../../components/ui/controls-panel/Controls";

const { Header, Sider } = Layout;

const ChatScreen = ({
  darkTheme,
  toggleTheme,
  storySlidesOpen,
  setStorySlidesOpen,
  collapsed,
  setCollapsed,
  handleChatSelect,
  characterNames,
  characterColor,
  currentCharacter,
  colorBgContainer,
}) => {
  return (
    <React.Fragment>
      <ToggleThemeButton darkTheme={darkTheme} togglTheme={toggleTheme} />
      <StorySlideshow
        open={storySlidesOpen}
        onClose={() => setStorySlidesOpen(false)}
      />
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
              onChatSelect={handleChatSelect}
              characterNames={characterNames}
            />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <Button
                type="text"
                className="toggle pointer-events-auto"
                onClick={() => setCollapsed(!collapsed)}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              />
            </Header>
          </Layout>
        </Layout>
      </div>
      <div className="chat-wrapper">
        <Messages characterColor={characterColor} />
      </div>
      <div className="foxcanvas-wrapper pointer-events-auto">
        <FoxCanvas />
      </div>
      <Controls color={characterColor} currentCharacter={currentCharacter} />
    </React.Fragment>
  );
};

export default ChatScreen;
