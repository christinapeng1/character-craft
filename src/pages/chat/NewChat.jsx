import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAccessToken } from "hume";
import { VoiceProvider } from "@humeai/voice-react";
import ChatInterface from "../../components/ChatInterface.jsx";
import { formatTimestamp } from "../../utils/formatTimestamp.ts";
import handleToolCall from "./handleToolCall.ts";
import "../pages.css";

const NewChat = () => {
  // Get the chatGroupId from the URL parameters
  const { chatGroupId } = useParams();
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState("");
  const [chatGroupsData, setChatGroupsData] = useState([]);
  const [chatGroupTranscript, setChatGroupTranscript] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
  const [currentChatLabel, setCurrentChatLabel] = useState(
    localStorage.getItem(`chat_group_name_${chatGroupId}`) || "Unnamed Chat"
  );
  const [aboutOpen, setAboutOpen] = useState(false);
  const [isRenamingChat, setIsRenamingChat] = useState(false);
  const [assistantMessageColor, setAssistantMessageColor] = useState(
    localStorage.getItem("assistant_message_color" || "#daf8e3")
  );
  const [assistantBorderColor, setAssistantBorderColor] = useState(localStorage.getItem("assistant_border_color") || "#b6eac6");
  const [userBorderColor, setUserBorderColor] = useState(localStorage.getItem("user_border_color") || "#f5c6cb");
  const [userMessageColor, setUserMessageColor] = useState(
    localStorage.getItem("user_message_color" || "#f8d7da")
  );

  // Fetch the access token on component mount
  useEffect(() => {
    const fetchToken = async () => {
      // make sure to set these environment variables
      const accessToken =
        (await fetchAccessToken({
          apiKey: import.meta.env.VITE_HUME_API_KEY || "",
          secretKey: import.meta.env.VITE_HUME_SECRET_KEY || "",
        })) || "";
      setAccessToken(accessToken);
    };
    fetchToken();
  }, []);

  // Fetch the most recent 10 chat groups on component mount and when chatGroupId changes
  useEffect(() => {
    const fetchChatGroups = async () => {
      try {
        const response = await fetch(
          `https://api.hume.ai/v0/evi/chat_groups?page_number=0&ascending_order=false&page_size=10`,
          {
            method: "GET",
            headers: {
              "X-Hume-Api-Key": import.meta.env.VITE_HUME_API_KEY,
            },
          }
        );
        const body = await response.json();

        const chatGroupsData = body.chat_groups_page.map((group) => {
          const storedName = localStorage.getItem(
            `chat_group_name_${group.id}`
          );
          return {
            id: group.id,
            timestamp: group.first_start_timestamp,
            label:
              storedName && storedName !== ""
                ? storedName
                : `${formatTimestamp(group.first_start_timestamp)}`,
          };
        });

        setChatGroupsData(chatGroupsData);
      } catch (error) {
        console.error("Error fetching chat groups:", error);
      }
    };
    fetchChatGroups();
  }, [chatGroupId]);

  // Handle chat selection
  const handleChatSelect = async (key) => {
    if (key === "about") {
      setAboutOpen(true);
    } else if (key === "Start new chat") {
      setCurrentChat("new");
      setChatGroupTranscript([]);
      navigate(`/chat/new`);
    } else {
      setCurrentChat(key);
      navigate(`/chat/${key}`);
    }
  };

  // Fetch chat group transcript when chatGroupId or currentChat changes
  useEffect(() => {
    if (chatGroupId) {
      fetchChatGroupTranscript();
      setCurrentChatLabel(
        localStorage.getItem(`chat_group_name_${chatGroupId}`) || "Unnamed Chat"
      );
    } else {
      setCurrentChatLabel("New Chat");
    }
  }, [chatGroupId, currentChat]);

  // Fetch chat group transcript data
  const fetchChatGroupTranscript = async () => {
    if (!chatGroupId) {
      setChatGroupTranscript([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.hume.ai/v0/evi/chat_groups/${chatGroupId}/events?ascending_order=false&page_size=20&page_number=0`,
        {
          method: "GET",
          headers: {
            "X-Hume-Api-Key": import.meta.env.VITE_HUME_API_KEY,
          },
        }
      );

      const body = await response.json();

      if (!body.events_page) {
        console.warn("No events_page in response body");
        setChatGroupTranscript([]);
        return;
      }

      const chatGroupTranscriptData = body.events_page
        .map((msg) => ({
          type: msg.type,
          content: msg.message_text,
          emotion_features: msg.emotion_features,
          timestamp: `${formatTimestamp(msg.timestamp)}`,
        }))
        .reverse();

      setChatGroupTranscript(chatGroupTranscriptData);
    } catch (error) {
      console.error("Error fetching chat group transcript data:", error);
    }
  };

  // Handle closing about modal
  const handleCloseAbout = () => setAboutOpen(false);

  // Handle chat rename click
  const handleRenameClick = () => setIsRenamingChat(true);
  
  // Handle chat rename input change
  const handleRenameInputChange = (e) => setCurrentChatLabel(e.target.value);

  // Handle chat rename key down
  const handleRenameKeyDown = (e) => {
    if (e.key === "Enter") {
      handleRename();
    }
  };

  // Handle chat rename
  const handleRename = () => {
    localStorage.setItem(`chat_group_name_${chatGroupId}`, currentChatLabel);
    setIsRenamingChat(false);
  }

  // Render the NewChat component
  return (
    <section className="w-full h-screen relative">
      <>
        <VoiceProvider
          auth={{ type: "accessToken", value: accessToken }}
          onMessage={(message) => console.log(message)}
          onError={(error) => console.error(error)}
          onToolCall={(toolCall) =>
            handleToolCall(
              toolCall,
              setAssistantMessageColor,
              setAssistantBorderColor,
              setUserMessageColor,
              setUserBorderColor
            )
          }
          resumedChatGroupId={chatGroupId}
        >
          <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-auto">
            <ChatInterface
              className="pointer-events-auto"
              assistantMessageColor={assistantMessageColor}
              assistantBorderColor={assistantBorderColor}
              userMessageColor={userMessageColor}
              userBorderColor={userBorderColor}
              currentChatLabel={currentChatLabel}
              chatGroupsData={chatGroupsData}
              handleChatSelect={handleChatSelect}
              handleCloseAbout={handleCloseAbout}
              aboutOpen={aboutOpen}
              currentChat={currentChat}
              chatGroupTranscript={chatGroupTranscript}
              handleRenameClick={handleRenameClick}
              isRenamingChat={isRenamingChat}
              handleRenameInputChange={handleRenameInputChange}
              handleRenameKeyDown={handleRenameKeyDown}
            />
          </div>
        </VoiceProvider>
      </>
      <div className="gradient-bg w-full h-full absolute top-0 left-0 pointer-events-none"></div>
    </section>
  );
};

export default NewChat;
