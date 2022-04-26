import { Pets } from "../types";
import RegisterCMP from "../components/PetRegister";
import { registerPets } from "../api/pet";

const Register = () => {
    const register = (pet: Pets) => registerPets(pet);
    return (
        <RegisterCMP onRegister={register}  />
    )
}
export default Register;