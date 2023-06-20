import { useEffect, useState } from "react";
import { api } from "../api/api";
import { amIAlive } from "../api/user";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";

const Home = ({ onLogin }) => {
  const [user, setUser] = useState();
  const [hasToken, setHasToken] = useState(false);
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  useEffect(() => {
      amIAlive().then(setUser)
  }, [])
  useEffect(() => {
      setHasToken(!!api.defaults.headers.common['Authorization'])
  }, [user])

  if (hasToken && !!user?.name) return (
  <div> Bem-vindo(a) {user.name} </div>
  );
  return (
    <Paper style={{ width: 300, padding: 20, margin: "auto" }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            style={{
              textAlign: "center",
              width: "100%",
              margin: "auto",
              fontSize: 20,
            }}
          >
            Login
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            style={{ width: "100%", margin: "10px 0px" }}
            label="Usuario"
            variant="filled"
            onChange={(e) => setLogin(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            style={{ width: "100%" }}
            label="Senha"
            variant="filled"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            style={{ width: "100%", margin: "10px 0px", padding: 10 }}
            onClick={() => onLogin({ email: login, password }).then(setUser)}
          >
            Entrar
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Home;
