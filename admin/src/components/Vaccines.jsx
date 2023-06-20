import { useEffect, useState } from "react";

import { Button, TextField, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const defaultVaccine = { name: "", doses: "" };

const Vaccines = ({ onRegister, vaccines }) => {
  const [emailFilter, setFilter] = useState("");
  const [vaccine, setVaccine] = useState(defaultVaccine);
  useEffect(() => {
    setVaccine(defaultVaccine);
    setFilter("");
  }, [vaccines]);
  return (
    <div>
      <>
        <div>
          <Typography>Crie uma vacina</Typography>
        </div>
        <TextField
          placeholder="Nome da vacina"
          value={vaccine.name}
          onChange={(e) =>
            setVaccine({ ...vaccine, name: e.target.value || "" })
          }
        />
        <FormControl sx={{ minWidth: 80 }} style={{ marginLeft: 10 }}>
          <InputLabel id="dose-select">Número de Doses</InputLabel>
          <Select
            labelId="dose-select"
            style={{ width: 200 }}
            id="dose-select-id"
            value={!!vaccine && vaccine.doses}
            placeholder="Selecione a quantidade de doses"
            onChange={(e) => setVaccine({ ...vaccine, doses: e.target.value })}
            label="Selecione a quantidade de doses"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={() => {
            onRegister(vaccine).then((r) => setVaccine(defaultVaccine));
          }}
        >
          Criar
        </Button>
      </>
      <TableContainer style={{ maxWidth: 650 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">Precisa da vacina</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vaccines &&
              (emailFilter.length
                ? vaccines.filter((c) => c.email.includes(emailFilter))
                : vaccines
              ).map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">
                    {row.vaccineId
                      ? vaccines.find(({ id }) => row.vaccineId === id).name
                      : "--------"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Vaccines;
