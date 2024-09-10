import { Button, TextField, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const defaultUser = { name: "", email: "", password: "", token: null };
const Clients = ({ onRegister, clients }) => {
  const [creating, setCreating] = useState(false);
  const [emailFilter, setFilter] = useState("");
  const [user, setUser] = useState(defaultUser);
  useEffect(() => {
    setCreating(false);
    setUser(defaultUser);
    setFilter("");
  }, [clients]);
  if (creating)
    return (
      <div>
        <Typography>Criando cliente</Typography>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <TextField
            style={{ marginRight: 10, width: 250 }}
            placeholder="Nome"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value || "" })}
          />
          <TextField
            style={{ marginRight: 10, width: 250 }}
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value || "" })}
          />
          <TextField
            style={{ marginRight: 10, width: 250 }}
            placeholder="Senha"
            value={user.password}
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value || "" })}
          />
          <Button
            style={{
              borderRadius: 5,
              padding: "10px 25px",
              margin: "0 0 0 20px",
              backgroundColor: "#80c197",
              fontWeight: "bold",
              color: "white",
            }}
            onClick={() => {
              onRegister(user);
            }}
          >
            Criar
          </Button>
        </div>
      </div>
    );
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography>Busque por email</Typography>
      <TextField style={{ width: 300 }} onChange={(e) => setFilter(e.target.value)}></TextField>
      <Button
        variant="contained"
        style={{
          borderRadius: 5,
          padding: "10px 25px",
          margin: "15px 0 15px auto",
          backgroundColor: "#80c197",
          fontWeight: "bold",
        }}
        onClick={() => setCreating(true)}>
        Criar usuário para cliente
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Pets</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients &&
              (emailFilter.length
                ? clients.filter((c) => c.email.includes(emailFilter))
                : clients
              ).map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">
                    {row.pets &&
                      row.pets.map((p, i) => (
                        <>
                          {p.name}
                          {i === row.pets.length - 1 ? "" : ", "}
                        </>
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
                      }}
                      onClick={() => console.log(row.id)}>
                      <Link
                        style={{ textDecoration: "none", color: "#80c197" }}
                        to={`/cliente/pet?clientId=${row.id}`}>
                        Adicionar pet
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Clients;
