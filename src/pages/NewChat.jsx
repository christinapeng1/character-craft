import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAccessToken } from "hume";
import { VoiceProvider } from "@humeai/voice-react";
import ChatInterface from "./ChatInterface.jsx";
import { formatTimestamp } from "../utils/formatTimestamp.ts";
import handleToolCall from "./handleToolCall";
import "./Home.css";

const NewChat = () => {
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
  
  const [assistantColorTheme, setAssistantColorTheme] = useState(
    localStorage.getItem("assistant_color_theme" || "#daf8e3")
  );
  const [userColorTheme, setUserColorTheme] = useState(
    localStorage.getItem("user_color_theme" || "#f8d7da")
  );

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

  //fetch the most recent 10 chat groups
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

  const handleCloseStorySlides = () => setAboutOpen(false);

  const handleRenameClick = () => setIsRenamingChat(true);
  
  const handleRenameInputChange = (e) => setCurrentChatLabel(e.target.value);

  const handleRenameKeyDown = (e) => {
    if (e.key === "Enter") {
      handleRename();
    }
  };

  const handleRename = () => {
    localStorage.setItem(`chat_group_name_${chatGroupId}`, currentChatLabel);
    setIsRenamingChat(false);
  }

  return (
    <section className="w-full h-screen relative">
      <>
        <VoiceProvider
          auth={{ type: "accessToken", value: accessToken }}
          onMessage={(message) => console.log(message)}
          onError={(error) => console.error(error)}
          onToolCall={(toolCall) => handleToolCall(toolCall, setAssistantColorTheme, setUserColorTheme)}
          resumedChatGroupId={chatGroupId}
        >
          <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-auto">
            <ChatInterface
              className="pointer-events-auto"
              assistantColorTheme={assistantColorTheme}
              userColorTheme={userColorTheme}
              currentChatLabel={currentChatLabel}
              chatGroupsData={chatGroupsData}
              handleChatSelect={handleChatSelect}
              handleCloseStorySlides={handleCloseStorySlides}
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
