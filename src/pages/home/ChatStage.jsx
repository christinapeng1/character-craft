import { useVoice } from '@humeai/voice-react';
import React, { useState } from 'react';
import { Layout, theme } from "antd";
import "./Home.css";
import { WelcomeScreen, ChatScreen } from "../../components";

/**
 * Main view for displaying the conversation
 */
const {Header, Sider} = Layout;

const ChatStage = ({
  characterNames,
  characterColor,
  currentCharacter,
  chatGroupsData,
  handleChatSelect,
  handleCloseStorySlides,
  handleHidePopover,
  setPopoverVisible,
  storySlidesOpen,
  popoverVisible,
  popoverTarget,
  chatGroupTranscript,
}) => {
  const { connect, disconnect, status, sendUserInput } = useVoice();
  const [inChatStage, setInChatStage] = useState(false);

  // connect -> switch to chat screen
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

  const handleLeaveChatStage = () => {
    disconnect();
    setInChatStage(false);
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
            characterNames={characterNames}
            characterColor={characterColor}
            currentCharacter={currentCharacter}
            colorBgContainer={colorBgContainer}
            chatGroupsData={chatGroupsData}
            handleChatSelect={handleChatSelect}
            handleCloseStorySlides={handleCloseStorySlides}
            storySlidesOpen={storySlidesOpen}
            setPopoverVisible={setPopoverVisible}
            popoverVisible={popoverVisible}
            popoverTarget={popoverTarget}
            handleHidePopover={handleHidePopover}
            chatGroupTranscript={chatGroupTranscript}
            handleLeaveChatStage={handleLeaveChatStage}
          />
        )}
      </div>
    </div>
  );
};

export default ChatStage;