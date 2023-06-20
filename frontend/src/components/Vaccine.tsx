import { View, Text, Button } from "react-native";
import { PetsVaccine } from "../types";
import { petStyles } from "../utils/styles";
import Topbar from "./Topbar";
import dayjs from "dayjs";

const Vaccine = ({
  allVaccine,
}: {
  allVaccine: PetsVaccine[];
}) => {
  if (!allVaccine) return <Text> Carregando...</Text>;
  if (!allVaccine.length)
    return <Text> Nenhuma consulta foi agendada </Text>;

  return (
    <>
      <Topbar pet={allVaccine[0]} local="vaccine" />
      {allVaccine.map((pet) => (
        <Text style={petStyles.appointmentContainer}>
          {pet.vaccineName} - {pet.vaccinatedAt ? `Vacinado em: ${dayjs(pet.vaccinatedAt).format('DD/MM/YYYY')}` : "Ainda não vacinado"}
        </Text>
      ))}
    </>
  );
};

export default Vaccine;
