import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";

import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { NavigationDrawer } from "./NavigationDrawer";

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const navigate = useNavigate();

  return (
    <Box className="login-form">
      <Box className="user">
        <NavigationDrawer />
      </Box>
      <Typography variant="h1" align="center" fontSize={40}>
        Olá {user.username}!!! Bem vindo ao To Do's List
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 4,
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        <Box
          sx={{
            width: 150,
            height: 150,
            backgroundColor: "primary.main",
            textAlign: "center",
          }}
        >
          <Typography>total de tarefas cadastradas</Typography>
        </Box>
        <Box
          sx={{
            width: 150,
            height: 150,
            backgroundColor: "primary.main",
            textAlign: "center",
          }}
        >
          <Typography>total de tarefas concluídas</Typography>
        </Box>
        <Box
          sx={{
            width: 150,
            height: 150,
            backgroundColor: "primary.main",
            textAlign: "center",
          }}
        >
          <Typography>total de tarefas a serem conculuídas</Typography>
        </Box>
        <Box
          component="button"
          sx={{
            width: 150,
            height: 150,
            backgroundColor: "primary.main",
            textAlign: "center",
          }}
          onClick={() => navigate("/Tasks")}
        >
          <Typography>To Do's List</Typography>
        </Box>
      </Box>
    </Box>
  );
};
