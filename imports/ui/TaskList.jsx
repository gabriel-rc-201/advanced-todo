import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, List, Typography } from "@mui/material";
import { ExitToApp, Logout } from "@mui/icons-material";

import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { TasksCollection } from "../db/TasksCollection";
import { Task } from "./Tasks";

const deleteTask = ({ _id }) => Meteor.call("tasks.remove", _id);

export const TaskList = () => {
  const user = useTracker(() => Meteor.user());

  const userFilter = user ? { userId: user._id } : {};

  const { tasks, isLoading } = useTracker(() => {
    if (!Meteor.user()) {
      return { tasks: [] };
    }

    const handler = Meteor.subscribe("tasks");

    if (!handler.ready()) return { tasks: [], isLoading: true };

    const tasks = TasksCollection.find(userFilter, {
      sort: { createdAt: 1 },
    }).fetch();

    return { tasks };
  });

  const navigate = useNavigate();

  const logout = () => {
    Meteor.logout();
    navigate("/");
  };

  return (
    <Box className="main">
      <Box className="user" onClick={logout}>
        <Typography>{user.username || user.profile.name}</Typography>
        <ExitToApp sx={{ color: "red" }} />
        <Logout sx={{ color: "red" }} />
      </Box>

      {isLoading && <Box className="loading">loading...</Box>}

      <List className="tasks" sx={{ bgcolor: "background.paper" }}>
        {tasks.map((task) => (
          <Task key={task._id} task={task} onDeleteClick={deleteTask} />
        ))}
      </List>
    </Box>
  );
};
