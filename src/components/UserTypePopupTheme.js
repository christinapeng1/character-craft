import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: purple[200], // Primary color
    },
  },
  typography: {
    fontFamily: "Quicksand", // Global font family
    fontSize: 20, // Global font size
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#F8F1D4",
          padding: "20px",
          textAlign: "center",
          borderRadius: "10px",
          boxShadow: "4px 4px 0 rgba(0, 0, 0, 0.3)",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          "& h6": {
            color: "red",
            fontSize: "24px",
          },
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "0",
          "& img": {
            width: "100%",
            maxWidth: "400px",
            height: "200%",
            margin: "0 auto",
            display: "block",
            padding: "10px",
          },
          "& p": {
            fontSize: "20px",
            fontWeight: "500",
            color: "black",
            marginTop: "20px",
            fontFamily: "Quicksand",
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "16px",
          color: "#fff",
          backgroundColor: purple[300],
          margin: "0 10px",
          padding: "10px 20px",
          borderRadius: "10px",
          textTransform: "none",
          boxShadow: "4px 4px 0 rgba(0, 0, 0, 0.3)",
          "&:hover": {
            backgroundColor: purple[500],
            boxShadow: "1px 1px 0 rgba(0, 0, 0, 0.3)",
          },
        },
      },
    },
  },
});

export default theme;
