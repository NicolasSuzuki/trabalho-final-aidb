import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./containers/Home";
import AppBar from "./containers/AppBar";
import Results from "./containers/Results";
import Clients from "./containers/Clients";
import Vaccines from "./containers/Vaccines";
import Appointments from "./containers/Appointments";
import RegisterPet from "./containers/RegisterPet";
import Pets from "./containers/Pets";
import { amIAlive } from "./api/user";
import { api } from "./api/api";

const App = () => {
  const [user, setUser] = useState();
  const [hasToken, setHasToken] = useState(false);
  useEffect(() => {
    amIAlive().then(setUser);
  }, []);
  useEffect(() => {
    setHasToken(!!api.defaults.headers.common["Authorization"]);
  }, [user]);

  if (hasToken && !!user?.name)
    return (
      <Router>
        <AppBar />
        <div style={{ marginTop: 70 }}>
          <div style={{ maxWidth: 1400, margin: 'auto' }}>
            <Routes>
              <Route element={<Home />} path="/" exact />
              <Route element={<Results />} path="/resultados" />
              <Route element={<Clients />} path="/clientes" />
              <Route element={<Vaccines />} path="/vacinas" />
              <Route element={<Pets />} path="/pets" />
              <Route element={<Appointments />} path="/consultas" />
              <Route element={<RegisterPet />} path="/cliente/pet" />
            </Routes>
          </div>
        </div>
      </Router>
    );
  return (
    <Router>
      <AppBar />
      <div style={{ marginTop: 70 }}>
        <Routes>
          <Route element={<Home />} path="/" exact />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
