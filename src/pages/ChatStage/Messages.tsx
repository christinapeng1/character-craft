import { useVoice } from "@humeai/voice-react";
import React, { useState, useEffect, useRef } from "react";
import { darkenColor } from "../../pages/adjustColor";
import SendIcon from "@mui/icons-material/Send";
import { expressionColors } from "expression-colors";
import { getTopNProsody } from "../../utils";
import Tooltip from "@mui/material/Tooltip";

type Expression = keyof typeof expressionColors;

interface MessagesProps {
  characterColor: string;
}

const Messages: React.FC<MessagesProps> = ({ characterColor }) => {
  const { messages, sendUserInput } = useVoice();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [userInput, setUserInput] = useState("");
  const [clickedUserEmotionIndex, setClickedUserEmotionIndex] = useState<
    number | null
  >(null);
  const [clickedAssistantEmotionIndex, setClickedAssistantEmotionIndex] =
    useState<number | null>(null);
  const assistantBorderColor = darkenColor(characterColor, 15);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (userInput.trim()) {
      sendUserInput(userInput);
      setUserInput(""); // Clear the input box after sending the message
    }
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleUserEmotionClick = (index: number) => {
    setClickedUserEmotionIndex(
      index === clickedUserEmotionIndex ? null : index
    );
  };

  const handleAssistantEmotionClick = (index: number) => {
    setClickedAssistantEmotionIndex(
      index === clickedAssistantEmotionIndex ? null : index
    );
  };

  return (
    <React.Fragment>
      <div className="chat-container" id="chat-container">
        {messages.map((msg, index) => {
          if (msg.type === "user_message") {
            const topUserEmotions = getTopNProsody(
              msg.models.prosody?.scores || {},
              3
            );
            if (
              msg.message.content
                .trim()
                .startsWith("SUMMARY_OF_PREVIOUS_CONVERSATION:") ||
              msg.message.content.trim().startsWith("I_AM_A_NEW_USER:") ||
              msg.message.content.trim().startsWith("I_AM_A_RETURNING_USER:") ||
              msg.message.content.trim().startsWith("I_AM_A_LOGGED_IN_USER:")
            ) {
              return null; // Skip rendering this message
            }
            return (
              <>
                <div key={msg.type + index} className="user-message message">
                  <div className="content">{msg.message.content}</div>
                </div>
                {topUserEmotions.length > 0 && (
                  <div
                    className="user-emotion-scores"
                    onClick={() => handleUserEmotionClick(index)}
                  >
                    <Tooltip
                      title={`${topUserEmotions[0].name}: ${topUserEmotions[0].score}%`}
                    >
                      <div
                        className="emotion-circle pointer-events-auto"
                        style={{
                          backgroundColor: `rgba(${expressionColors[topUserEmotions[0].name as Expression].rgba})`,
                        }}
                      ></div>
                    </Tooltip>
                    <div className="top-emotion">
                      {topUserEmotions[0].name.toLowerCase()}
                    </div>
                    {clickedUserEmotionIndex === index &&
                      topUserEmotions.slice(1).map((score, idx) => (
                        <React.Fragment key={idx}>
                          <Tooltip title={`${score.name}: ${score.score}%`}>
                            <div
                              className="emotion-circle"
                              style={{
                                backgroundColor: `rgba(${expressionColors[score.name as Expression].rgba})`,
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
              </>
            );
          }
          if (msg.type === "assistant_message") {
            const topAssistantEmotions = getTopNProsody(
              msg.models.prosody?.scores || {},
              3
            );
            return (
              <>
                <div
                  key={msg.type + index}
                  className="assistant-message message"
                  style={{
                    backgroundColor: characterColor,
                    border: "2px solid " + assistantBorderColor, // Corrected the border style
                  }}
                >
                  <div className="content">{msg.message.content}</div>
                </div>
                {topAssistantEmotions.length > 0 && (
                  <div
                    className="assistant-emotion-scores"
                    onClick={() => handleAssistantEmotionClick(index)}
                  >
                    <Tooltip
                      title={`${topAssistantEmotions[0].name}: ${topAssistantEmotions[0].score}%`}
                    >
                      <div
                        className="emotion-circle pointer-events-auto"
                        style={{
                          backgroundColor: `rgba(${expressionColors[topAssistantEmotions[0].name as Expression].rgba})`,
                        }}
                      ></div>
                    </Tooltip>
                    <div className="top-emotion">
                      {topAssistantEmotions[0].name.toLowerCase()}
                    </div>
                    {clickedAssistantEmotionIndex === index &&
                      topAssistantEmotions.slice(1).map((score, idx) => (
                        <React.Fragment key={idx}>
                          <Tooltip title={`${score.name}: ${score.score}%`}>
                            <div
                              className="emotion-circle"
                              style={{
                                backgroundColor: `rgba(${expressionColors[score.name as Expression].rgba})`,
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
              </>
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
