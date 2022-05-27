import { Box, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Meteor } from "meteor/meteor";

export const EdtiTask = () => {
  const {
    state: { task },
  } = useLocation();

  const navigate = useNavigate();

  const [cantEdit, setCanEdit] = useState(true);

  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [date, setDate] = useState(new Date(task.date));

  const editTask = ({ _id, name, description, author, status, date }) =>
    Meteor.call("tasks.edit", { _id, name, description, author, status, date });

  const submit = (e) => {
    e.preventDefault();
    editTask({
      _id: task._id,
      name,
      description,
      date: new Date(date),
    });
    navigate(-1);
  };

  return (
    <Box component="form" className="login-form" onSubmit={submit}>
      <Button onClick={() => setCanEdit(!cantEdit)} variant="contained">
        Editar
      </Button>

      <Typography gutterBottom variant="h1" align="center" fontSize={30}>
        Editar Tarefa: {task.name}
      </Typography>
      <Box>
        <TextField
          disabled={cantEdit}
          label="task name"
          variant="outlined"
          type="text"
          name="name"
          defaultValue={task.name}
          onChange={(e) => setName(e.target.value)}
        />
      </Box>
      <Box>
        <TextField
          disabled={cantEdit}
          label="task description"
          variant="outlined"
          type="text"
          name="description"
          defaultValue={task.description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>

      <Box>
        <TextField
          disabled={cantEdit}
          label="task date"
          type="date"
          name="date"
          defaultValue={task.date.toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
          sx={{ width: 230 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>

      <Box
        sx={{ display: "grid", gap: 4, gridTemplateColumns: "repeat(2, 1fr)" }}
      >
        <Button
          sx={{ bgcolor: "red" }}
          color="error"
          variant="contained"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button disabled={cantEdit} type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  );
};
