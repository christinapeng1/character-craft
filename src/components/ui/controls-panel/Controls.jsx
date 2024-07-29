import React from "react";
import { useLocation } from "react-router-dom";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Waveform from "./Waveform";
import "./Controls.css";

const Controls = ({
  color,
  currentChatLabel,
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
  handleRenameClick,
  isRenamingChat,
  handleRenameInputChange,
  handleRenameKeyDown,
}) => {
  const location = useLocation();
  const isNewChat = location.pathname === "/chat/new";

  return (
    <div className="controls-container">
      <div className="active-chat-name-container">
        {isRenamingChat ? (
          <input
            type="text"
            value={currentChatLabel}
            onChange={handleRenameInputChange}
            onKeyDown={handleRenameKeyDown}
            maxLength={15}
            autoFocus
          />
        ) : (
          <>
            <div className="active-chat-name">{currentChatLabel}</div>
            {!isNewChat && (
              <EditNoteIcon
                className="edit-note-icon"
                onClick={handleRenameClick}
              />
            )}
          </>
        )}
      </div>
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
