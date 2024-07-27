import React from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Waveform from "./Waveform";
import "./Controls.css";

const Controls = ({
  color,
  currentCharacter,
  handleConnectChatGroup,
  lastVoiceMessage,
  isPaused,
  handleMuteAudio,
  handleMuteMic,
  handleChangeColor,
  status,
  isDisabled,
  isMicMuted,
  isAudioMuted,
}) => {
  return (
    <div className="controls-container">
      <div className="currently-speaking">Current Chat:</div>
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
          {status.value === "disconnected" ? (
            <>
              <PlayArrowIcon className="icon" /> Start chat
            </>
          ) : isPaused ? (
            <>
              <PlayArrowIcon className="icon" /> Resume chat
            </>
          ) : (
            <>
              <PauseIcon className="icon" /> Pause chat
            </>
          )}
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
          onClick={handleMuteAudio}
          className="control-button mute-button pointer-events-auto"
          style={{ backgroundColor: color }}
          disabled={isDisabled}
        >
          {isAudioMuted ? (
            <>
              <VolumeMuteIcon className="icon" />
              Unmute AI
            </>
          ) : (
            <>
              <VolumeUpIcon className="icon" />
              Mute AI
            </>
          )}
        </button>
        <button
          onClick={handleChangeColor}
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
