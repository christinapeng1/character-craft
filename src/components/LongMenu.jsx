import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ITEM_HEIGHT = 48;

export default function LongMenu({ chatGroupId, onRename }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isRenameOpen, setIsRenameOpen] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRenameClick = () => {
    setIsRenameOpen(true);
    handleClose();
  };

  const handleRenameSubmit = () => {
    onRename(chatGroupId, newName);
    setIsRenameOpen(false);
    setNewName("");
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={handleRenameClick}>Rename</MenuItem>
      </Menu>
      {isRenameOpen && (
        <div className="rename-modal">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new chat group name"
          />
          <button onClick={handleRenameSubmit}>Submit</button>
          <button onClick={() => setIsRenameOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
