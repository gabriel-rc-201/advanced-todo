import { Box, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Meteor } from "meteor/meteor";

export const EdtiTask = () => {
  const {
    state: { task },
  } = useLocation();

  const navigate = useNavigate();

  const [canEdit, setCanEdit] = useState(false);

  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  // const [status, setStatus] = useState(task.status);
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
      author: task.author,
      status: task.status,
    });
    navigate(-1);
  };

  return (
    <Box component="form" className="login-form" onSubmit={submit}>
      <Button onClick={() => setCanEdit(!canEdit)} variant="contained">
        Editar
      </Button>

      <Typography gutterBottom variant="h1" align="center" fontSize={30}>
        Editar Tarefa: {task.name}
      </Typography>
      <Box>
        <TextField
          disabled={canEdit ? false : true}
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
          disabled={canEdit ? false : true}
          label="task description"
          variant="outlined"
          type="text"
          name="description"
          defaultValue={task.description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>

      <Typography gutterBottom align="center">
        {`${date}`}
      </Typography>
      <Box>
        <TextField
          disabled={canEdit ? false : true}
          label="task date"
          type="datetime-local"
          name="date"
          onChange={(e) => setDate(e.target.value)}
          sx={{ width: 230 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>

      {/* <FormControl sx={{ maxWidth: 230, minWidth: 230 }}>
        <InputLabel id="task status">task status</InputLabel>
        <Select
          disabled={canEdit ? true : false}
          labelId="task status"
          label="task status"
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="cadastrada">cadastrada</MenuItem>
          <MenuItem value="em andamento">em andamento</MenuItem>
          <MenuItem value="comcluida">comcluída</MenuItem>
        </Select>
      </FormControl> */}

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
        <Button
          disabled={canEdit ? false : true}
          type="submit"
          variant="contained"
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
