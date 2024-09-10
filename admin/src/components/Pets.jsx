import { useEffect, useState, Fragment } from "react";

import { Button, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const SimpleDialog = (props) => {
  const { onClose, open, vaccines, pet, onAdd, onRemove, onUpdate } = props;
  const [vaccinesToAdd, setVaccinesToAdd] = useState(vaccines.filter(v => !pet.vaccines.find(pv => pv.vaccineId === v.id)));

  useEffect(() => {
    setVaccinesToAdd(vaccines.filter(v => !pet.vaccines.find(pv => pv.vaccineId === v.id)));
    console.log(pet, 'ATUALIZADO')
  }, [pet])

  const handleAction = ({ msg, vaccineId, petId, date }) => {
    if (msg === "remove") {
      onRemove({ vaccineId, petId });
    } else if (msg === "add") {
      onAdd({ vaccineId, petId });
    } else if (msg === "update") {
      if (date.toJSON()) onUpdate({ vaccineId, petId, date: date.toJSON() });
    } else onClose(msg);
  };

  return (
    <Dialog maxWidth="false" onClose={handleAction} open={open === pet.id}>
      <DialogTitle>Atribua uma vacina ao {pet.name}</DialogTitle>
      <DialogContent style={{ display: "flex", padding: 10, width: "80vw" }}>
        <div style={{ flex: 1.5 }}>
          {/* Espaço da esquerda: vacinas atribuídas ao pet */}
          <h3>Vacinas Atribuídas ao Pet</h3>
          <List sx={{ pt: 0 }}>
            {pet.vaccines.sort((a, b) => a.name - b.name).map((vaccine) => (
              <ListItem
                disableGutters
                key={`${vaccine.petId}_vaccine_of_pet_${vaccine.vaccineId}`}
              >
                <ListItemButton>
                  <ListItemText primary={vaccine.name} />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      inputFormat="DD/MM/YYYY hh:mm"
                      label="Quando foi vacinado?"
                      value={vaccine.vaccinatedAt}
                      onChange={(value) =>
                        handleAction({
                          msg: "update",
                          date: value,
                          vaccineId: vaccine.vaccineId,
                          petId: pet.id,
                        })
                      }
                      renderInput={(params) => (
                        <TextField
                          style={{ maxWidth: 280, marginRight: 15 }}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <ListItemAvatar
                    onClick={() =>
                      handleAction({
                        msg: "remove",
                        vaccineId: vaccine.vaccineId,
                        petId: pet.id,
                      })
                    }
                    key={vaccine.name}
                  >
                    <Avatar style={{ backgroundColor: "red" }}>
                      <RemoveIcon />
                    </Avatar>
                  </ListItemAvatar>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
        <div style={{ flex: 1 }}>
          {/* Espaço da direita: lista de vacinas */}
          <h3>Lista de Vacinas</h3>
          <List sx={{ pt: 0 }}>
            {vaccinesToAdd
              .map((vaccine) => (
                <ListItem disableGutters key={`${vaccine.id}_vaccines`}>
                  <ListItemButton
                    onClick={() =>
                      handleAction({
                        msg: "add",
                        vaccineId: vaccine.id,
                        petId: pet.id,
                      })
                    }
                    key={vaccine.name}
                  >
                    <ListItemText primary={vaccine.name} />
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: "green" }}>
                        <AddIcon />
                      </Avatar>
                    </ListItemAvatar>
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Pets = ({ onAdd, onRemove, onUpdate, pets, vaccines }) => {
  const [emailFilter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setFilter("");
  }, [pets]);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  console.log(pets)
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">Dono</TableCell>
              <TableCell align="right">Vacinas</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pets &&
              (emailFilter.length
                ? pets.filter((c) => c.email.includes(emailFilter))
                : pets
              ).map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.ownerName}</TableCell>
                  <TableCell align="right">
                    {row.vaccines &&
                      row.vaccines.map((p, i) => (
                        <Fragment key={`${p.id}_pet_vaccines`}>
                          {p.name}
                          {i === row.vaccines.length - 1 ? "" : ", "}
                        </Fragment>
                      ))}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      style={{
                        borderRadius: 5,
                        padding: "10px 25px",
                        border: "1px solid #80c197",
                        fontWeight: "bold",
                        textDecoration: "none",
                        backgroundColor: "white",
                        color: "#80c197"
                      }}
                      onClick={() => handleClickOpen(row.id)}
                    >
                      Editar vacina do pet
                    </Button>
                  </TableCell>
                  <SimpleDialog
                    key={row.id}
                    open={open}
                    vaccines={vaccines}
                    pet={row}
                    onClose={handleClose}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onUpdate={onUpdate}
                  />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Pets;
