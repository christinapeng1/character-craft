import { useVoice } from '@humeai/voice-react';
import React, { useState } from 'react';
import Messages from './Messages';
import Emotions from './Emotions';
import KiteCanvas from "../KiteCanvas";
import FoxCanvas from "../FoxCanvas";
import "./Messages.css"
import { Button, Layout, theme } from "antd";
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons';
import MenuList from '../../components/MenuList';
import ToggleThemeButton from '../../components/ToggleThemeButton';
import LogInSignIn from "../../components/LogInSignIn";
import UserTypePopup from "../../components/UserTypePopup";
import StorySlideshow from '../../components/story/StorySlideshow';
import slides from '../../components/story/storyslides';
import Controls from '../../components/Controls';

/**
 * Main view for displaying the conversation
 */
const {Header, Sider} = Layout;

// Define the interface for the props
interface ChatStageProps {
  characterNames: string[];
  currentUser: any;
  characterColor: string;
  currentCharacter: string;
}

const ChatStage: React.FC<ChatStageProps> = ({
  characterNames,
  currentUser,
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
  const [userType, setUserType] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [inChatStage, setInChatStage] = useState(false);

  const handleConnect = () => {
    if (status.value === "connected") {
      disconnect();
      setInChatStage(false);
      setUserType("");
      return;
    }

    if (!currentUser && userType === "") {
      setShowPopup(true);
    } else {
      try {
      connect().then(() => {
        sendUserInput("I_AM_A_LOGGED_IN_USER: Treat me as a user who has already logged in for all subsequent interactions. Continue the conversation from where we left off by reintroducing your name and revisiting what we talked about last time, because I am forgetful.");
      })
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleEnterChatStage = () => {
    setInChatStage(true);
    handleConnect();
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

  const handleUserTypeSelected = (type) => {
    setUserType(type);
    connect()
      .then(() => {
        if (type === "new") {
          sendUserInput(
            "I_AM_A_NEW_USER: I am a first-time user. Please provide me with the first-time user introduction experience."
          );
        } else {
          sendUserInput(
            "I_AM_A_RETURNING_USER: I am a returning user who has used the magical kite before. I have already been given the first-time user introduction and talked to Luna the Lost Spirit. DO NOT give me the introduction again, I find it painful. IMMEDIATELY take me to a new character."
          );
        }
        setShowPopup(false);
        console.log(`User type selected: ${type}`);
      })
      .catch((e) => {
        console.error(e);
      });
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
          <React.Fragment>
            <div className="kitecanvas-wrapper">
              <KiteCanvas />
            </div>
            <div className="about-container">
              <h1 className="title-text pointer-events-auto">
                Where do lost kites go?
              </h1>
              <h2 className="subtitle-text pointer-events-auto">
                Talking to characters across worlds
              </h2>
              <button
                onClick={() => handleEnterChatStage()}
                className="disconnected-button"
              >
                {status.value === "connected"
                  ? "disconnect"
                  : "follow the kites"}
              </button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {showPopup && (
              <UserTypePopup onUserTypeSelected={handleUserTypeSelected} />
            )}
            <ToggleThemeButton darkTheme={darkTheme} togglTheme={toggleTheme} />
            <StorySlideshow
              slides={slides}
              open={storySlidesOpen}
              onClose={() => setStorySlidesOpen(false)}
            />
            <div className="sidebar-wrapper pointer-events-auto">
              <Layout>
                <Sider
                  className="sidebar pointer-events-auto"
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
                  {collapsed ? (
                    <div className="placeholder"></div>
                  ) : (
                    <LogInSignIn />
                  )}
                </Sider>
                <Layout>
                  <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                      type="text"
                      className="toggle pointer-events-auto"
                      onClick={() => setCollapsed(!collapsed)}
                      icon={
                        collapsed ? (
                          <MenuUnfoldOutlined />
                        ) : (
                          <MenuFoldOutlined />
                        )
                      }
                    ></Button>
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
            <Controls
              color={characterColor}
              currentCharacter={currentCharacter}
              currentUser={currentUser}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default ChatStage;