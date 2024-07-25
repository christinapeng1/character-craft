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
  colorTheme,
  currentCharacter,
  chatGroupsData,
  handleChatSelect,
  handleCloseStorySlides,
  setSelectedChat,
  storySlidesOpen,
  selectedChat,
  chatGroupTranscript,
  resetChatGroupId,
  setNewChat,
  newChat
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
            colorTheme={colorTheme}
            currentCharacter={currentCharacter}
            colorBgContainer={colorBgContainer}
            chatGroupsData={chatGroupsData}
            handleChatSelect={handleChatSelect}
            handleCloseStorySlides={handleCloseStorySlides}
            storySlidesOpen={storySlidesOpen}
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
            chatGroupTranscript={chatGroupTranscript}
            handleLeaveChatStage={handleLeaveChatStage}
            resetChatGroupId={resetChatGroupId}
            setNewChat={setNewChat}
            newChat={newChat}
          />
        )}
      </div>
    </div>
  );
};

export default ChatStage;