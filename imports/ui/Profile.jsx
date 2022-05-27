import React from "react";
import { useNavigate } from "react-router-dom";

import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";

export const Profile = () => {
  const navigate = useNavigate();
  const user = useTracker(() => Meteor.user());

  return (
    <Box componet="form" className="login-form">
      <Box>
        <TextField
          defaultValue={user.username}
          label="username"
          variant="outlined"
          type="text"
          name="username"
        />
      </Box>
      <Box>
        <TextField
          defaultValue={user.emails[0].address}
          label="email"
          variant="outlined"
          type="email"
          name="email"
        />
      </Box>
      <Box>
        <TextField
          sx={{ width: 230 }}
          defaultValue={user.profile.birthdate.toISOString().split("T")[0]}
          label="data de nascimento"
          variant="outlined"
          type="date"
          name="birthdate"
        />
      </Box>
      <Box>
        <FormControl sx={{ width: 230 }}>
          <InputLabel id="sexo-label">Sexo Biológico</InputLabel>
          <Select
            defaultValue={user.profile.sexo}
            label="sexo Biológico"
            variant="outlined"
            name="sexo"
          >
            <MenuItem value="M">Masculino</MenuItem>
            <MenuItem value="F">Feminino</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <TextField
          defaultValue={user.profile.empresa}
          label="empresa"
          variant="outlined"
          type="text"
          name="empresa"
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
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  );
};
