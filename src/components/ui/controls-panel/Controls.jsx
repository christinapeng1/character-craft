import React, { useState } from "react";
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

const Controls = ({color, currentCharacter}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const {
    sendPauseAssistantMessage,
    sendResumeAssistantMessage,
    sendUserInput,
    mute,
    unmute,
    muteAudio,
    unmuteAudio,
    lastVoiceMessage,
    connect,
    disconnect,
    status
  } = useVoice();

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

  const handleConnect = () => {
    if (status.value === "connected") {
      disconnect();
      return;
    } else {
      try {
        connect().then(() => {
          sendUserInput("CONTINUE: please continue.");
        })
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleChangeCharacter = () => {
    sendUserInput("Oh magical kite, take me to a new character");
  }

  return (
    <div className="controls-container">
      <div className="currently-speaking">Current Speaker:</div>
      <div className="currently-speaking-character">{currentCharacter}</div>
      <div className="waveform-container">
        <Waveform message={lastVoiceMessage} />
      </div>
      <div className="button-container">
        <button
          onClick={handleMuteMic}
          className="control-button mute-button pointer-events-auto"
          style={{ backgroundColor: color }}
        >
          {isMicMuted ? (
            <>
              <MicOffIcon />
              Unmute my mic
            </>
          ) : (
            <>
              <MicIcon />
              Mute my mic
            </>
          )}
        </button>
        <button
          onClick={handlePause}
          className="control-button pause-button pointer-events-auto"
          style={{ backgroundColor: color }}
        >
          {isPaused ? (
            <>
              <PlayArrowIcon /> Resume character
            </>
          ) : (
            <>
              <PauseIcon />
              Pause character
            </>
          )}
        </button>
        <button
          onClick={handleMuteAudio}
          className="control-button mute-button pointer-events-auto"
          style={{ backgroundColor: color }}
        >
          {isAudioMuted ? (
            <>
              <VolumeMuteIcon />
              Unmute character
            </>
          ) : (
            <>
              <VolumeUpIcon />
              Mute character
            </>
          )}
        </button>
        <button
          onClick={handleChangeCharacter}
          className="control-button change-character-button pointer-events-auto"
          style={{ backgroundColor: color }}
        >
          <>
            <AutoAwesomeIcon /> Change character
          </>
        </button>
        <button
          className="control-button connected-button pointer-events-auto"
          onClick={() => handleConnect()}
          style={{ backgroundColor: color }}
        >
          {status.value === "connected"
            ? "End conversation"
            : "Start conversation"}
        </button>
      </div>
    </div>
  );
};

export default Controls;
