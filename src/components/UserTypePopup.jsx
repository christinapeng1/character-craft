import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import girlReadingJournal from "../assets/girl_reading_journal.webp";
import theme from "./UserTypePopupTheme"; // Import your custom theme

const UserTypePopup = ({ onUserTypeSelected }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (userType) => {
    setOpen(false);
    onUserTypeSelected(userType);
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={() => {}}>
        <DialogTitle>I wonder where the lost kites go...</DialogTitle>
        <DialogContent>
          <img
            src={girlReadingJournal}
            alt="girl reading journal"
            className="popup-image"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("new")} color="primary">
            New User
          </Button>
          <Button onClick={() => handleClose("returning")} color="primary">
            Returning User
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default UserTypePopup;
