import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PeopleIcon from "@mui/icons-material/People";
import ResultIcon from "@mui/icons-material/LibraryBooks";
import ConsultIcon from "@mui/icons-material/CalendarMonth";
import AccountIcon from '@mui/icons-material/AccountCircle';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import PetsIcon from '@mui/icons-material/Pets';
import { black } from '@mui/material/colors';

import { api } from "../api/api";
import { amIAlive } from "../api/user";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const AppBarCMP = ({ onLogin, onLogout }) => {
  const [user, setUser] = useState();
  const [hasToken, setHasToken] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  useEffect(() => {
    amIAlive().then(setUser);
  }, []);
  useEffect(() => {
    setHasToken(!!api.defaults.headers.common["Authorization"]);
  }, [user]);

  const routes = {
    Clientes: <PeopleIcon sx={{ color: "#2B375F" }}   style={{ margin: "0 10px" }}/>,
    Resultados: <ResultIcon sx={{ color: "#2B375F" }} style={{ margin: "0 10px" }}/>,
    Consultas: <ConsultIcon sx={{ color: "#2B375F" }} style={{ margin: "0 10px" }}/>,
    Vacinas: <VaccinesIcon sx={{ color: "#2B375F" }} style={{ margin: "0 10px" }}/>,
    Pets: <PetsIcon sx={{ color: "#2B375F" }} style={{ margin: "0 10px" }}/>,
  };

  if (hasToken && !!user?.name)
    return (
      <AppBar
        style={{ width: "100%", backgroundColor: "#80C197" }}
        position="fixed"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img src="logo_white2x.png" alt="Logotipo" style={{ width: 125 }}/>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => setAnchorElNav(e.currentTarget)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={() => setAnchorElNav(null)}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {Object.entries(routes).map(([page, cmp]) => (
                  <MenuItem key={page} onClick={() => setAnchorElNav(null)}>
                    <Link to={`/${page.toLowerCase()}`}>
                      {cmp}
                      {page}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img src="logo_white2x.png" alt="Logotipo" style={{ width: 125 }}/>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {Object.entries(routes).map(([page, cmp]) => (
                <Link
                  style={{
                    textDecoration: "none",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                  to={`/${page.toLowerCase()}`}
                >
                  <Button
                    key={page}
                    onClick={() => setAnchorElNav(null)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <div style={{ display: "flex" }}>
                      {cmp}
                      <Typography>{page}</Typography>
                    </div>
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={(e) => setAnchorElUser(e.currentTarget)}
                  sx={{ p: 0 }}
                >
                  <AccountIcon sx={{ color: "#000000" }} style={{width: 40, height: 40 }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      if (setting.toLowerCase() === "logout") onLogout();
                      setAnchorElUser(null);
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  return (
    <AppBar style={{ width: "100%" }} position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Miawor
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarCMP;
