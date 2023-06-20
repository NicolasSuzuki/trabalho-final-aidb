import { registerUser, amIAlive } from "../api/user";
import { User } from "../types";
import RegisterCMP from "../components/Register";

const Register = () => {
    const register = (user: User) => registerUser(user);
    return (
        <RegisterCMP onRegister={register} amIAlive={amIAlive} />
    )
}
export default Register;