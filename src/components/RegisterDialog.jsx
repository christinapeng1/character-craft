import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { createUserEmailAndPassword } from "../firebase/auth";
import LoginDialog from "./LoginDialog";
import theme from "./AuthPopupTheme"; // Import your custom theme

const RegisterDialog = ({ open, onClose, onOpenLogin }) => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }
      setIsRegistering(true);
      try {
        await createUserEmailAndPassword(email, password);
        onClose();
        window.location.reload();
      } catch (err) {
        setErrorMessage(err.message);
        setIsRegistering(false);
      }
    }
  };

  const handleLoginDialogOpen = () => {
    onClose();
    onOpenLogin();
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose}>
        {userLoggedIn && <Navigate to="/" replace={true} />}
        <DialogTitle>Create a new account</DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isRegistering}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isRegistering}
            />
            {errorMessage && (
              <p className="text-red-600 font-bold">{errorMessage}</p>
            )}
              <Button
                type="submit"
                disabled={isRegistering}
                variant="contained"
                color="primary"
              >
                {isRegistering ? "Signing Up..." : "Sign Up"}
              </Button>
          </form>
          <div className="text-sm text-center mt-2">
            Already have an account?{" "}
            <Button onClick={handleLoginDialogOpen} color="secondary" variant="note">
              Log In
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default RegisterDialog;
