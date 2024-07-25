import React, { useState, useEffect } from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useVoice } from "@humeai/voice-react";
import Waveform from "./Waveform";
import "./Controls.css";

const Controls = ({
  color,
  currentCharacter,
  selectedChat,
  setSelectedChat,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const {
    sendPauseAssistantMessage,
    sendResumeAssistantMessage,
    sendUserInput,
    sendAssistantInput,
    mute,
    unmute,
    muteAudio,
    unmuteAudio,
    lastVoiceMessage,
    clearMessages,
    connect,
    disconnect,
    status,
  } = useVoice();

  useEffect(() => {
    if (selectedChat) {
      disconnect();
      clearMessages();
      setSelectedChat(false);
      console.log("disconnected from current session");
    }
  }, [selectedChat]);

  const handleConnectChatGroup = async () => {
    if (status.value === "disconnected"){
      connect().then(() => {
        sendAssistantInput("Hey, welcome back!");
      });
    } else {
      disconnect();
    }
  };

  const handlePause = () => {
    if (isPaused) {
      sendResumeAssistantMessage();
      setIsPaused(false);
    } else {
      sendPauseAssistantMessage();
      setIsPaused(true);
    }
  };

  const handleMuteMic = () => {
    if (isMicMuted) {
      unmute();
      setIsMicMuted(false);
    } else {
      mute();
      setIsMicMuted(true);
    }
  };

  const handleMuteAudio = () => {
    if (isAudioMuted) {
      unmuteAudio();
      setIsAudioMuted(false);
    } else {
      muteAudio();
      setIsAudioMuted(true);
    }
  };

  const isDisabled = status.value === "disconnected";

  const handleChangeCharacter = () => {
    sendUserInput("Oh magical kite, take me to a new character");
  };

  return (
    <div className="controls-container">
      <div className="currently-speaking">Current Speaker:</div>
      <div className="currently-speaking-character">{currentCharacter}</div>
      <div className="waveform-container">
        <Waveform message={lastVoiceMessage} />
      </div>
      <div className="button-container">
        <button
          className="control-button connected-button pointer-events-auto"
          onClick={handleConnectChatGroup}
          style={{ backgroundColor: color }}
        >
          {status.value === "connected"
            ? "End conversation"
            : "Start conversation"}
        </button>
        <button
          onClick={handleMuteMic}
          className="control-button mute-button pointer-events-auto"
          style={{ backgroundColor: color }}
          disabled={isDisabled}
        >
          {isMicMuted ? (
            <>
              <MicOffIcon className="icon" />
              Unmute my mic
            </>
          ) : (
            <>
              <MicIcon className="icon" />
              Mute my mic
            </>
          )}
        </button>
        <button
          onClick={handlePause}
          className="control-button pause-button pointer-events-auto"
          style={{ backgroundColor: color }}
          disabled={isDisabled}
        >
          {isPaused ? (
            <>
              <PlayArrowIcon className="icon" /> Resume character
            </>
          ) : (
            <>
              <PauseIcon className="icon" />
              Pause character
            </>
          )}
        </button>
        <button
          onClick={handleMuteAudio}
          className="control-button mute-button pointer-events-auto"
          style={{ backgroundColor: color }}
          disabled={isDisabled}
        >
          {isAudioMuted ? (
            <>
              <VolumeMuteIcon className="icon" />
              Unmute character
            </>
          ) : (
            <>
              <VolumeUpIcon className="icon" />
              Mute character
            </>
          )}
        </button>
        <button
          onClick={handleChangeCharacter}
          className="control-button change-character-button pointer-events-auto"
          style={{ backgroundColor: color }}
          disabled={isDisabled}
        >
          <>
            <AutoAwesomeIcon className="icon" /> Change color theme
          </>
        </button>
      </div>
    </div>
  );
};

export default Controls;
