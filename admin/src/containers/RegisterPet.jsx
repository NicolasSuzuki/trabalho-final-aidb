import RegisterPetCMP from "../components/RegisterPet";
import { registerPet } from "../api/pet"

const RegisterPet = () => {
  return <RegisterPetCMP onRegister={registerPet} />;
};

export default RegisterPet;
