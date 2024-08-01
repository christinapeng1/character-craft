import React from "react";
import { Box, Typography, Dialog, DialogContent } from "@mui/material";
import characters from "../assets/img/characters.webp";

const About = ({ open, onClose }) => {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      sx={{ overflow: "hidden" }}
    >
      <DialogContent
        sx={{
          paddingTop: 4,
          backgroundColor: "#F8F1D4",
          jdisplay: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            marginBottom: 3,
            fontFamily: "Mountains of Christmas",
            fontWeight: "700",
          }}
        >
          Character Lab
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: 3,
          }}
        >
          <Box
            component="img"
            src={characters}
            alt="Creating characters"
            sx={{
              width: "50%",
              borderRadius: "10px",
            }}
          />
        </Box>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            width: "72%",
            margin: "0 auto",
            fontSize: "20px",
            fontWeight: "500",
            fontFamily: "Quicksand",
          }}
        >
          In a world full of stories, where kites freely flap,
          <br />
          There's a magical place called the Character Lab.
          <br />
          Where you start with a name, just a spark, just a seed,
          <br />
          And craft a new pal for the tales that you need.
          <br />
          <br />
          First, choose a name, something grand or quite plain,
          <br />
          A hero or villain, perhaps Jane or Duane.
          <br />
          Decide on their age, are they young, are they old?
          <br />
          Do they carry deep secrets, are they daring and bold?
          <br />
          <br />
          Now chat with your friend, get to know their own tale,
          <br />
          What do they fear, and what makes them pale?
          <br />
          Learn how they'd act in the scenes that you weave,
          <br />
          Their quirks and their dreams, the things they believe.
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default About;
