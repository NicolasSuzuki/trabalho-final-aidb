import { useState } from "react";
import dayjs from "dayjs";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";

const FormFields = ({ appointment, setAppointment, users, pets }) => (
  <>
    <Box sx={{ minWidth: 230, marginTop: 3, maxWidth: 300 }}>
      <FormControl>
        <InputLabel id="user-select">Selecione um cliente</InputLabel>
        <Select
          labelId="user-select"
          style={{ width: 200 }}
          id="user-select"
          value={!!users && users.length && appointment.userId}
          placeholder="Selecione o cliente"
          onChange={(e) =>
            {console.log(e);setAppointment({ ...appointment, userId: e.target.value })}
          }
        >
          {!!users?.length &&
            users.map((u) => <MenuItem onClick={() => console.log(u)} value={u.id}>{u.name}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ minWidth: 220, marginTop: 3, maxWidth: 200 }}>
      <FormControl>
        <InputLabel id="user-select">Selecione o Pet</InputLabel>
        <Select
          labelId="pet-select"
          id="pet-select"
          style={{ width: 200 }}
          value={!!pets && pets.length && appointment.petId}
          placeholder="Selecione o pet do cliente"
          onChange={(e) =>
            setAppointment({ ...appointment, petId: e.target.value })
          }
        >
          {!!pets?.length && appointment.userId ? (
            pets
              .filter((p) => p.userId === appointment.userId)
              .map((p) => <MenuItem value={p.id}>{p.name}</MenuItem>)
          ) : (
            <MenuItem value={null}>Selecione um cliente primeiro</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ minWidth: 220, marginTop: 3, maxWidth: 200 }}>
      <TextField
        label="Descrição"
        variant="outlined"
        value={appointment.description}
        onChange={(e) =>
          setAppointment({ ...appointment, description: e.target.value })
        }
      />
    </Box>
    <Box sx={{ minWidth: 220, marginTop: 3, marginLeft: 3, maxWidth: 200 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          value={appointment.date}
          inputFormat="DD/MM/YYYY hh:mm"
          onChange={(value) => setAppointment({ ...appointment, date: value })}
          renderInput={(params) => (
            <TextField style={{ width: "100%" }} {...params} />
          )}
        />
      </LocalizationProvider>
    </Box>
  </>
);
const EditAppointment = ({
  users,
  setAppointment,
  appointment,
  pets,
  onUpdate,
  setEditing,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <FormFields
        appointment={appointment}
        setAppointment={setAppointment}
        users={users}
        pets={pets}
      />
      <Box sx={{ minWidth: 220, marginTop: 3.5, maxWidth: 200 }}>
        <Button
          variant="contained"
          style={{
            borderRadius: 5,
            padding: "10px 25px",
            marginLeft: 10,
            backgroundColor: "#80c197",
            fontWeight: "bold",
          }}
          onClick={() => {
            onUpdate({
              id: appointment.id,
              userId: appointment.userId,
              petId: appointment.petId,
              description: appointment.description,
              date: appointment.date,
            });
            setEditing(false);
            setAppointment({
              userId: null,
              petId: null,
              date: dayjs().toJSON(),
              description: "",
            });
            //setFilter();
          }}
        >
          Editar
        </Button>
      </Box>
    </div>
  );
};
const CreateAppointment = ({
  users,
  setAppointment,
  appointment,
  pets,
  onRegister,
  setCreating,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <FormFields
        appointment={appointment}
        setAppointment={setAppointment}
        users={users}
        pets={pets}
      />
      <Box sx={{ minWidth: 220, marginTop: 3.5, maxWidth: 200 }}>
        <Button
          variant="contained"
          style={{
            borderRadius: 5,
            padding: "10px 25px",
            marginLeft: 10,
            backgroundColor: "#80c197",
            fontWeight: "bold",
          }}
          onClick={() => {
            onRegister(appointment);
            setCreating(false);
            setAppointment({
              userId: null,
              petId: null,
              date: dayjs().toJSON(),
              description: "",
            });
            //setFilter();
          }}
        >
          Criar
        </Button>
      </Box>
    </div>
  );
};
const TableRows = ({ row, users, setEditing, onDelete, setAppointment }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow
        key={row.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell align="right">{row.pet.name}</TableCell>
        <TableCell align="right">
          {dayjs(row.date).format("DD/MM/YYYY")}
        </TableCell>
        <TableCell align="right">{row.description}</TableCell>
        {!row.deletedAt ? (
          <TableCell align="right">
            <Button
              style={{
                borderRadius: 5,
                padding: "10px 25px",
                marginLeft: 10,
                fontWeight: "bold",
              }}
              variant="outlined"
              color="success"
              onClick={() => {
                setAppointment({
                  ...row,
                  userId: row.pet.userId,
                  user: { ...users.find((u) => u.id === row.pet.userId) },
                });
                setEditing(true);
              }}
            >
              Editar
            </Button>
            <Button
              style={{
                borderRadius: 5,
                padding: "10px 25px",
                marginLeft: 10,
                fontWeight: "bold",
              }}
              variant="outlined"
              color="error"
              onClick={() => setOpen(row.id)}
            >
              Cancelar Consulta
            </Button>
          </TableCell>
        ) : (
          <TableCell align="right">Consulta cancelada</TableCell>
        )}
      </TableRow>
      <Dialog
        open={open === row.id}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Tem certeza que deseja cancelar a consulta?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você está prestes a cancelar a consulta de um pet agendada. Antes de
            prosseguir, é importante considerar as possíveis consequências e
            garantir que o cancelamento seja necessário. Confirme sua decisão
            abaixo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              borderRadius: 5,
              padding: "10px 25px",
              marginLeft: 10,
              fontWeight: "bold",
            }}
            variant="outlined"
            color="success"
            onClick={() => setOpen(false)}
          >
            Não quero cancelar
          </Button>
          <Button
            variant="contained"
            style={{
              borderRadius: 5,
              padding: "10px 25px",
              fontWeight: "bold",
            }}
            color="error"
            onClick={() => onDelete(row.id)}
            autoFocus
          >
            Cancelar consulta
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
const Appointment = ({
  onRegister,
  onDelete,
  onUpdate,
  appointments,
  users,
  pets,
}) => {
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [emailFilter, setFilter] = useState();
  const [appointment, setAppointment] = useState({
    userId: null,
    petId: null,
    date: dayjs().toJSON(),
    description: "",
  });

  if (creating)
    return (
      <CreateAppointment
        users={users}
        setAppointment={setAppointment}
        appointment={appointment}
        pets={pets}
        onRegister={onRegister}
        setCreating={setCreating}
      />
    );
  if (editing)
    return (
      <EditAppointment
        users={users}
        setAppointment={setAppointment}
        appointment={appointment}
        pets={pets}
        onUpdate={onUpdate}
        setEditing={setEditing}
      />
    );
  return (
    <div>
      {/* <Typography>Busque por email</Typography>
      <TextField onChange={(e) => setFilter(e.target.value)}></TextField> */}
      <div style={{ display: "flex" }}>
        <Button
          variant="contained"
          style={{
            borderRadius: 5,
            padding: "10px 25px",
            margin: "15px 0 15px auto",
            backgroundColor: "#80c197",
            fontWeight: "bold",
          }}
          onClick={() => setCreating(true)}
        >
          Criar consulta para cliente
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Pet</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Descrição</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!appointments.length &&
              (emailFilter
                ? appointments.filter((e) => e.user.email === emailFilter)
                : appointments
              )
                .sort(
                  (a, b) =>
                    (b.deletedAt === null) - (a.deletedAt === null) ||
                    +(b.deletedAt > a.deletedAt) ||
                    -(b.deletedAt < a.deletedAt)
                )
                .map((row) => (
                  <TableRows
                    key={row.id}
                    row={row}
                    users={users}
                    onDelete={onDelete}
                    setEditing={setEditing}
                    setAppointment={setAppointment}
                  />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Appointment;
