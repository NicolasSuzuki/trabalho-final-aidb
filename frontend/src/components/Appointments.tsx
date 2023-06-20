import { View, Text, Button } from "react-native";
import { PetsAppointmentsProps } from "../types";
import { petStyles } from "../utils/styles";
import Topbar from "./Topbar";
import { NextAppointmentCard } from "./PetAppointments";

const Appointments = ({
  allAppointments,
}: {
  allAppointments: PetsAppointmentsProps[];
}) => {
  console.log(allAppointments);
  if (!allAppointments) return <Text> Carregando...</Text>;
  if (!allAppointments.length)
    return <Text> Nenhuma consulta foi agendada </Text>;

  return (
    <>
      <Topbar />
      {allAppointments.filter(pet => pet.nextAppointment).map((pet) => (
        <View style={petStyles.appointmentContainer}>
          {pet.nextAppointment && (
            <NextAppointmentCard pet={pet.nextAppointment} />
          )}
        </View>
      ))}
    </>
  );
};

export default Appointments;
