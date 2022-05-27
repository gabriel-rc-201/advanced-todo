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
          <InputLabel id="sexo-label">Sexo</InputLabel>
          <Select
            defaultValue={user.profile.sexo}
            label="sexo"
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
    </Box>
  );
};
