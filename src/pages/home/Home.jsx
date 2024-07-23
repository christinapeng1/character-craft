import {useState, useEffect} from 'react';
import { fetchAccessToken } from 'hume';
import { VoiceProvider } from "@humeai/voice-react";
import { lightenColor } from "../../utils/adjustColor.ts"
import ChatStage from "./ManageChatStage.jsx";
import './Home.css';

const Home = () => {
  const [accessToken, setAccessToken] = useState("");
  const [resumedChatGroupId, setResumedChatGroupId] = useState(
    localStorage.getItem("chat_group_id") || ""
  );
  const [characterNames, setCharacterNames] = useState(
    JSON.parse(localStorage.getItem("character_names")) || []
  );
  const [characterColor, setCharacterColor] = useState("#daf8e3"); 
  const [currentCharacter, setCurrentCharacter] = useState("Magical Kite"); 

  useEffect(() => {
    const fetchToken = async () => {
      // make sure to set these environment variables
      const accessToken = (await fetchAccessToken({
        apiKey: import.meta.env.VITE_HUME_API_KEY || "",
        secretKey: import.meta.env.VITE_HUME_SECRET_KEY || "",
      }) || "");
      setAccessToken(accessToken);
    };
    fetchToken();
  })

  const handleStatusChange = (status) => {
    setIsConnected(status === "connected");
  };

  const handleWebSocketMessageEvent = async (message) => {
    console.log("WebSocket message received:", message);
    if (message.type === "chat_metadata") {
      console.log("Received chat metadata:", message);
      localStorage.setItem("chat_group_id", message.chat_group_id);
      setResumedChatGroupId(message.chat_group_id);
      console.log(`chat group id set: ${resumedChatGroupId}`)
    }
  };

  const handleToolCall = async (toolCall) => {
    console.log("Tool call received", toolCall);
    if (toolCall.name === 'change_character'){
      try {
        const args = JSON.parse(toolCall.parameters);
        if (args && args.name && args.color){
          console.log(`Changed to ${args.name}.`);
          console.log(`Color ${args.color}.`);
          const lighterColor = lightenColor(args.color, 60);
          setCharacterColor(lighterColor);
          setCurrentCharacter(args.name);
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
          content: "The kite is glitching, and lost its ability to change characters.",
        };
      }
    }

    if (toolCall.name === 'save_character' && currentUser) {
      try {
        const args = JSON.parse(toolCall.parameters);
        if (args && args.name){
          const userChatDoc = doc(db, "users", currentUser.uid);
          await setDoc(userChatDoc,
            { character_names: arrayUnion(args.name) },
            { merge: true }
          );
          setCharacterNames((prevNames) => {
            if (prevNames && !prevNames.includes(args.name)) {
              return [...prevNames, args.name];
            } else if (!prevNames.includes(args.name)) {
              return [args.name];
            }
            return prevNames;
          });
          console.log(`Character name ${args.name} saved successfully.`);
          return {
            type: "tool_response",
            tool_call_id: toolCall.tool_call_id,
            content: JSON.stringify({ success: true }),
          };
        }
      } catch (error) {
        console.error("Error saving character name:", error);
        return {
          type: "tool_error",
          tool_call_id: toolCall.tool_call_id,
          error: "Character save error",
          code: "character_save_error",
          level: "warn",
          content: "The kite is glitching, and lost its ability to save characters.",
        };
      }
    } else {
      return {
        type: "tool_error",
        tool_call_id: toolCall.tool_call_id,
        error: "Attempting to save a character while signed out",
        code: "attempt_save_while_signed_out",
        level: "warn",
        content: "You must login to save a character to memory.",
      };
    }
  };

  return (
    <section className="w-full h-screen relative">
      <>
        <VoiceProvider
          auth={{ type: "accessToken", value: accessToken }}
          configId={"982405eb-6d48-4faa-808c-26202ae17933"} // set your configId here
          onMessage={handleWebSocketMessageEvent}
          onToolCall={handleToolCall}
          resumedChatGroupId={resumedChatGroupId}
        >
          <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-auto">
            <ChatStage
              className="pointer-events-auto"
              onStatusChange={handleStatusChange}
              characterNames={characterNames}
              characterColor={characterColor}
              currentCharacter={currentCharacter}
            />
          </div>
        </VoiceProvider>
      </>
      <div className="gradient-bg w-full h-full absolute top-0 left-0 pointer-events-none"></div>
    </section>
  );
}

export default Home