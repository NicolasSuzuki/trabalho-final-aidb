import HomeCMP from "../components/Home";
import { loginUser } from "../api/user"

const Home = () => {
  return <HomeCMP onLogin={loginUser} />;
};

export default Home;
