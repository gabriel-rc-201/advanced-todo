import React from "react";
import { useNavigate } from "react-router-dom";
import { Delete, Assignment, Edit } from "@mui/icons-material";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";

export const Task = ({ task, onDeleteClick }) => {
  const navigate = useNavigate();
  return (
    <ListItem className={task.isChecked ? "checked" : ""} disablePadding>
      <ListItemIcon>
        <Assignment sx={{ color: "yellow" }} />
      </ListItemIcon>
      <ListItemText primary={task.text} secondary={task.author} />
      <ListItemIcon>
        <ListItemButton
          edg="end"
          onClick={() => navigate("/EditTask", { state: { task } })}
        >
          <Edit />
        </ListItemButton>
        <ListItemButton edge="end" onClick={() => onDeleteClick(task)}>
          <Delete sx={{ color: "red" }} />
        </ListItemButton>
      </ListItemIcon>
    </ListItem>
  );
};
