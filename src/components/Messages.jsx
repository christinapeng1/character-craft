import { useVoice } from "@humeai/voice-react";
import React, { useState, useEffect, useRef } from "react";
import { darkenColor } from "../utils/adjustColor";
import SendIcon from "@mui/icons-material/Send";
import { expressionColors } from "expression-colors";
import { getTopNProsody } from "../utils/getTopNProsody";
import Tooltip from "@mui/material/Tooltip";

const Messages = ({ colorTheme, chatGroupTranscript }) => {
  const { connect, messages, sendUserInput, status } = useVoice();
  const chatEndRef = useRef(null);
  const [userInput, setUserInput] = useState("");
  const [clickedUserEmotionIndex, setClickedUserEmotionIndex] = useState(null);
  const [clickedAssistantEmotionIndex, setClickedAssistantEmotionIndex] =
    useState(null);
  const assistantBorderColor = darkenColor(colorTheme, 15);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, chatGroupTranscript]);

  const handleSendMessage = () => {
    if (userInput.trim()) {
      try {
        if (status.value === "disconnected") {
          connect().then(() => {
            sendUserInput(userInput);
            setUserInput("");
          });
        } else {
          sendUserInput(userInput);
          setUserInput(""); // Clear the input box after sending the message
        }
      } catch (error) {
        console.error("Error sending message:", error);
        // Optionally, you can add some user feedback here
      }
    }
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleUserEmotionClick = (index) => {
    setClickedUserEmotionIndex(
      index === clickedUserEmotionIndex ? null : index
    );
  };

  const handleAssistantEmotionClick = (index) => {
    setClickedAssistantEmotionIndex(
      index === clickedAssistantEmotionIndex ? null : index
    );
  };

  return (
    <React.Fragment>
      <div className="chat-container" id="chat-container">
        {chatGroupTranscript &&
          chatGroupTranscript.map((msg, index) => {
            if (msg.type === "USER_MESSAGE") {
              return (
                <div
                  key={`past-user-${index}`}
                  className="user-message message"
                >
                  <div className="content">{msg.content}</div>
                </div>
              );
            }
            if (msg.type === "AGENT_MESSAGE") {
              return (
                <div
                  key={`past-assistant-${index}`}
                  className="assistant-message message"
                  style={{
                    backgroundColor: colorTheme,
                    border: "2px solid " + assistantBorderColor,
                  }}
                >
                  <div className="content">{msg.content}</div>
                </div>
              );
            }
            return null;
          })}

        {messages.map((msg, index) => {
          if (msg.type === "user_message") {
            const topUserEmotions = getTopNProsody(
              msg.models.prosody?.scores || {},
              3
            );
            if (
              msg.message.content.trim().startsWith("CONTINUE_MESSAGE:")
            ) {
              return null; // Skip rendering this message
            }
            return (
              <React.Fragment key={`user-message-${index}`}>
                <div key={`user-${index}`} className="user-message message">
                  <div className="content">{msg.message.content}</div>
                </div>
                {topUserEmotions.length > 0 && (
                  <div
                    key={`user-emotions-${index}`}
                    className="user-emotion-scores"
                    onClick={() => handleUserEmotionClick(index)}
                  >
                    <Tooltip
                      title={`${topUserEmotions[0].name}: ${topUserEmotions[0].score}%`}
                    >
                      <div
                        className="emotion-circle pointer-events-auto"
                        style={{
                          backgroundColor: `rgba(${expressionColors[topUserEmotions[0].name].rgba})`,
                        }}
                      ></div>
                    </Tooltip>
                    <div className="top-emotion">
                      {topUserEmotions[0].name.toLowerCase()}
                    </div>
                    {clickedUserEmotionIndex === index &&
                      topUserEmotions.slice(1).map((score, idx) => (
                        <React.Fragment key={`user-emotion-${index}-${idx}`}>
                          <Tooltip title={`${score.name}: ${score.score}%`}>
                            <div
                              className="emotion-circle"
                              style={{
                                backgroundColor: `rgba(${expressionColors[score.name].rgba})`,
                              }}
                            ></div>
                          </Tooltip>
                          <div className="top-emotion">
                            {score.name.toLowerCase()}
                          </div>
                        </React.Fragment>
                      ))}
                  </div>
                )}
              </React.Fragment>
            );
          }
          if (msg.type === "assistant_message") {
            const topAssistantEmotions = getTopNProsody(
              msg.models.prosody?.scores || {},
              3
            );
            return (
              <React.Fragment key={`assistant-message-${index}`}>
                <div
                  key={`assistant-${index}`}
                  className="assistant-message message"
                  style={{
                    backgroundColor: colorTheme,
                    border: "2px solid " + assistantBorderColor, // Corrected the border style
                  }}
                >
                  <div className="content">{msg.message.content}</div>
                </div>
                {topAssistantEmotions.length > 0 && (
                  <div
                    key={`assistant-emotions-${index}`}
                    className="assistant-emotion-scores"
                    onClick={() => handleAssistantEmotionClick(index)}
                  >
                    <Tooltip
                      title={`${topAssistantEmotions[0].name}: ${topAssistantEmotions[0].score}`}
                    >
                      <div
                        className="emotion-circle pointer-events-auto"
                        style={{
                          backgroundColor: `rgba(${expressionColors[topAssistantEmotions[0].name].rgba})`,
                        }}
                      ></div>
                    </Tooltip>
                    <div className="top-emotion">
                      {topAssistantEmotions[0].name.toLowerCase()}
                    </div>
                    {clickedAssistantEmotionIndex === index &&
                      topAssistantEmotions.slice(1).map((score, idx) => (
                        <React.Fragment
                          key={`assistant-emotion-${index}-${idx}`}
                        >
                          <Tooltip title={`${score.name}: ${score.score}`}>
                            <div
                              className="emotion-circle"
                              style={{
                                backgroundColor: `rgba(${expressionColors[score.name].rgba})`,
                              }}
                            ></div>
                          </Tooltip>
                          <div className="top-emotion">
                            {score.name.toLowerCase()}
                          </div>
                        </React.Fragment>
                      ))}
                  </div>
                )}
              </React.Fragment>
            );
          }

          return null;
        })}
        <div ref={chatEndRef} />
      </div>
      <div className="input-container pointer-events-auto">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleSubmit}
          placeholder="Send a message..."
          className="input-box"
          rows={3}
        />
        <button onClick={handleSendMessage} className="send-button">
          <SendIcon />
        </button>
      </div>
    </React.Fragment>
  );
};

export default Messages;
