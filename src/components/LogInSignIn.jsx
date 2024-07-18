import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { signOut } from "../firebase/auth";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";
import "./Components.css";
import Tooltip from "@mui/material/Tooltip";

const LogInSignIn = () => {
  const { userLoggedIn } = useAuth();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

  const handleRegisterDialogOpen = () => {
    setRegisterDialogOpen(true);
  };

  const handleRegisterDialogClose = () => {
    setRegisterDialogOpen(false);
  };

  const handleLoginDialogOpen = () => {
    setLoginDialogOpen(true);
  };

  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);
  };

  return (
    <nav className="auth-wrapper">
      {userLoggedIn ? (
        <button
          className="logout-button"
          onClick={() => {
            signOut().then(() => {
              window.location.reload();
            });
          }}
        >
          Log out
        </button>
      ) : (
        <div>
          <button className="signup-button" onClick={handleRegisterDialogOpen}>
            Sign up
          </button>
          <Tooltip title="Log in to save characters into memory" placement="right">
            <button className="login-button" onClick={handleLoginDialogOpen}>
              Log in
            </button>
          </Tooltip>
        </div>
      )}
      <RegisterDialog
        open={registerDialogOpen}
        onClose={handleRegisterDialogClose}
        onOpenLogin={handleLoginDialogOpen}
      />
      <LoginDialog
        open={loginDialogOpen}
        onClose={handleLoginDialogClose}
        onOpenRegister={handleRegisterDialogOpen}
      />
    </nav>
  );
};

export default LogInSignIn;
