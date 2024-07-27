import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAccessToken } from "hume";
import { VoiceProvider } from "@humeai/voice-react";
import { lightenColor } from "../utils/adjustColor.ts";
import ChatInterface from "./ChatInterface.jsx";
import { formatTimestamp } from "../utils/formatTimestamp.ts";
import { createToolIfNotExists } from "../utils/createTool.ts";
import "./Home.css";

const NewChat = () => {
  const { chatGroupId } = useParams();
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState("");
  const [colorTheme, setColorTheme] = useState("#daf8e3");
  const [currentCharacter, setCurrentCharacter] = useState("Magical Kite");
  const [chatGroupsData, setChatGroupsData] = useState([]);
  const [chatGroupTranscript, setChatGroupTranscript] = useState([]);

  const [currentChat, setCurrentChat] = useState("");

  const [storySlidesOpen, setStorySlidesOpen] = useState(false);

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

  useEffect(() => {
    const changeColorToolName = "change_color";
    const changeColorToolParameters =
      '{"type": "object", "required": [], "properties": {"color": {"type": "string", "description": "The color to change into in hex code (e.g. #e6d7ff)"}}}';
    const changeColorToolDescription =
      "This tool is invoked when the user requests to change the color theme.";
    const changeColorToolFallbackContent =
      "Experiencing some difficulties trying to change the color.";
    createToolIfNotExists(
      changeColorToolName,
      changeColorToolParameters,
      changeColorToolDescription,
      changeColorToolFallbackContent
    );
  }, []);

  const handleChatSelect = async (key) => {
    if (key === "story") {
      setStorySlidesOpen(true);
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

  const handleCloseStorySlides = () => setStorySlidesOpen(false);

  const handleToolCall = async (toolCall) => {
    console.log("Tool call received", toolCall);
    if (toolCall.name === "change_color") {
      try {
        const args = JSON.parse(toolCall.parameters);
        if (args && args.color) {
          console.log(`Color ${args.color}.`);
          const lighterColor = lightenColor(args.color, 60);
          setColorTheme(lighterColor);
          return {
            type: "tool_response",
            tool_call_id: toolCall.tool_call_id,
            content: JSON.stringify({ success: true }),
          };
        }
      } catch (error) {
        console.error("Error changing to a different character:", error);
        return {
          type: "tool_error",
          tool_call_id: toolCall.tool_call_id,
          error: "Character change error",
          code: "character_change_error",
          level: "warn",
          content:
            "The kite is glitching, and lost its ability to change characters.",
        };
      }
    }
  };

  return (
    <section className="w-full h-screen relative">
      <>
        <VoiceProvider
          auth={{ type: "accessToken", value: accessToken }}
          onMessage={(message) => console.log(message)}
          onError={(error) => console.error(error)}
          onToolCall={handleToolCall}
          resumedChatGroupId={chatGroupId}
        >
          <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-auto">
            <ChatInterface
              className="pointer-events-auto"
              colorTheme={colorTheme}
              currentCharacter={currentCharacter}
              chatGroupsData={chatGroupsData}
              handleChatSelect={handleChatSelect}
              handleCloseStorySlides={handleCloseStorySlides}
              storySlidesOpen={storySlidesOpen}
              currentChat={currentChat}
              chatGroupTranscript={chatGroupTranscript}
            />
          </div>
        </VoiceProvider>
      </>
      <div className="gradient-bg w-full h-full absolute top-0 left-0 pointer-events-none"></div>
    </section>
  );
};

export default NewChat;
