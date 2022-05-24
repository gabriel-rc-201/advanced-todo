import { Box, TextField, Button } from "@mui/material";
import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
    navigate("/App");
  };

  return (
    <Box component="form" onSubmit={submit} className="login-form">
      <div>
        <TextField
          label="username"
          variant="outlined"
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <TextField
          label="password"
          type="password"
          name="password"
          variant="outlined"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <Button type="submit" variant="contained">
          Log In
        </Button>
      </div>
    </Box>
  );
};
