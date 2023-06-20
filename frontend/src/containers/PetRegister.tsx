import { Navigation, Pets, PetsProps } from "../types";
import RegisterCMP from "../components/Avatar";
import { registerPet } from "../api/pet";
import { View, Text } from "react-native";

const Register = (navigation: Navigation) => {
    const register = (pet: PetsProps) => registerPet(pet);
    return (
        <View>
            <Text>Registro</Text>
        </View>
    )
}
export default Register;