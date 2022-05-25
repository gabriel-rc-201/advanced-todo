import React from "react";
import { Typography, Box } from "@mui/material";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";

export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <Box className="login-form">
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
          sx={{
            width: 150,
            height: 150,
            backgroundColor: "primary.main",
            textAlign: "center",
          }}
        >
          <Typography>
            <Link to="/Tasks">To Do's List</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
