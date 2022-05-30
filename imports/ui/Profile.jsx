import React, { useState } from "react";
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

  const [birthdate, setBirthdate] = useState(new Date(user.profile.birthdate));
  const [sexo, setSexo] = useState(user.profile.sexo);
  const [empresa, setEmpresa] = useState(user.profile.empresa);

  const updateProfile = ({ _id, birthdate, sexo, empresa }) =>
    Meteor.call("account.update", {
      _id,
      birthdate,
      sexo,
      empresa,
    });

  const submit = (e) => {
    e.preventDefault();

    updateProfile({
      _id: user._id,
      birthdate: new Date(birthdate),
      sexo,
      empresa,
    });

    navigate(-1);
  };

  return (
    <Box component="form" className="login-form" onSubmit={submit}>
      <Box>
        <TextField
          disabled
          defaultValue={user.username}
          label="username"
          variant="outlined"
          type="text"
          name="username"
        />
      </Box>
      <Box>
        <TextField
          disabled
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
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </Box>
      <Box>
        <FormControl sx={{ width: 230 }}>
          <InputLabel id="sexo-label">Sexo Biológico</InputLabel>
          <Select
            defaultValue={user.profile.sexo}
            label="sexo"
            variant="outlined"
            name="sexo"
            onChange={(e) => setSexo(e.target.value)}
          >
            <MenuItem value="M">Masculino</MenuItem>
            <MenuItem value="F">Feminino</MenuItem>
            <MenuItem value="X">LGBTQIA+</MenuItem>
            <MenuItem value="N">Não Informar</MenuItem>
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
          onChange={(e) => setEmpresa(e.target.value)}
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
