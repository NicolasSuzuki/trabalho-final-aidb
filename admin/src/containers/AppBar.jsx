import AppBarCMP from "../components/AppBar";
import { loginUser, logoutUser } from "../api/user"

const AppBar = () => {
  return <AppBarCMP onLogin={loginUser} onLogout={logoutUser} />;
};

export default AppBar;