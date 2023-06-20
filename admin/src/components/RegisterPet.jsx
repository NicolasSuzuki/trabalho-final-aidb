import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Grid, Paper } from "@mui/material";

const RegisterPet = ({ onRegister }) => {
  const [pet, setPet] = useState({
    name: "",
    race: "",
    species: "",
    color: "",
    sex: null,
    birthday: null,
  });
  const params = window.location.search.split("=");
  const userId = params[params.length - 1];
  return (
    <Paper style={{ padding: 20, margin: "90px 50px 0px" }}>
      <LocalizationProvider
        style={{ width: "100%" }}
        dateAdapter={AdapterDayjs}
      >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              style={{ width: "100%" }}
              placeholder="Nome"
              value={pet.name}
              onChange={(val) => setPet({ ...pet, name: val.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              style={{ width: "100%" }}
              placeholder="Espécie"
              value={pet.species}
              onChange={(val) => setPet({ ...pet, species: val.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              style={{ width: "100%" }}
              placeholder="Raça"
              value={pet.race}
              onChange={(val) => setPet({ ...pet, race: val.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              style={{ width: "100%" }}
              placeholder="Cor"
              value={pet.color}
              onChange={(val) => setPet({ ...pet, color: val.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel id="sex-select">Sexo do pet</InputLabel>
              <Select
                labelId="sex-select"
                style={{ width: "100%" }}
                id="sex-select"
                value={pet.sex}
                placeholder="Sexo do pet"
                onChange={(e) => setPet({ ...pet, sex: e.target.value })}
              >
                <MenuItem value={"M"}>Macho</MenuItem>
                <MenuItem value={"F"}>Fêmea</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              value={pet.birthday}
              inputFormat='DD/MM/YYYY'
              onChange={(value) => setPet({ ...pet, birthday: value })}
              renderInput={(params) => (
                <TextField style={{ width: "100%" }} {...params} />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "auto" }}
              onClick={() => {
                onRegister({ ...pet, userId }).then((r) => {
                  window.location.pathname = "/clientes";
                });
              }}
            >
              Criar
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Paper>
  );
};

export default RegisterPet;
