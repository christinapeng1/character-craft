import React from "react";
import Slider from "react-slick";
import { Box, Typography, Dialog, DialogContent } from "@mui/material";
import slides from "./StorySlides";
import "slick-carousel/slick/slick.css";
import "./StorySlideshow.css";

const StorySlideshow = ({ open, onClose }) => {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
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
        <Slider>
          {slides.map((slide, index) => (
            <div key={slide.id ?? index}>
              <Box
                key={index}
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#F8F1D4",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={slide.image}
                  alt={`Slide ${index}`}
                  sx={{
                    width: "80%",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </Box>
              <Typography
                variant="subtitle1"
                align="center"
                sx={{
                  paddingTop: "20px",
                  width: "72%",
                  margin: "0 auto",
                  fontSize: "22px",
                  fontWeight: "500",
                  fontFamily: "Quicksand",
                }}
              >
                {slide.description}
              </Typography>
            </div>
          ))}
        </Slider>
      </DialogContent>
    </Dialog>
  );
};

export default StorySlideshow;
