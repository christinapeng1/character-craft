import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

// Create a custom theme
const loginTheme = createTheme({
  palette: {
    primary: {
      main: purple[200], // Primary color
    },
    secondary: {
      main: purple[500], // Secondary color for outlined buttons
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
          color: "black", // Set text color to black
          fontSize: "30px",
          "& h2": {
            // Ensure that the heading is targeted correctly
            color: "black", // Set heading color to black
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
            color: "#666",
            marginTop: "20px",
            fontFamily: "Quicksand",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          textTransform: "none",
        },
        contained: {
          fontSize: "16px",
          padding: "12px 16px",
          backgroundColor: purple[200],
          color: "#fff",
          width: "100%",
          "&:hover": {
            backgroundColor: purple[300],
          },
        },
        google: {
          fontSize: "16px",
          padding: "12px 16px",
          borderColor: purple[300],
          borderWidth: "1px",
          borderStyle: "solid",
          "&:hover": {
            backgroundColor: purple[200],
          },
        },
        note: {
          fontSize: "14px",
          padding: "8px 8px",
          textDecoration: "underline",
        },
        startIcon: {
          marginRight: "20px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "20px",
          "& label.Mui-focused": {
            color: purple[500],
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: purple[500],
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: purple[200],
            },
            "&:hover fieldset": {
              borderColor: purple[300],
            },
            "&.Mui-focused fieldset": {
              borderColor: purple[500],
            },
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Quicksand",
          color: "#666",
        },
      },
    },
  },
});

export default loginTheme;
