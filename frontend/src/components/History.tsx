import React from "react";
import { View, Text } from "react-native";
import { PetsProps } from "../types";
import { petStyles } from "../utils/styles";
import dayjs from "dayjs";

export const CardsHistory = ({ history }: { history: PetsProps[] }) => {
  return (
    <>
      {history.map((pet) => (
        <React.Fragment key={pet.id}>
          <View style={petStyles.historyTypeText}>
            <Text style={{ marginTop: 2, paddingRight: 10 }}>
              Consulta de rotina
            </Text>
          </View>
          <View style={petStyles.appointmentCardInformationsContainer}>
            <View style={petStyles.appointmentCardInformations}>
              <Text>Data: {dayjs(pet.date).format("DD/MM/YYYY")}</Text>
            </View>
            <View style={petStyles.appointmentCardInformations}>
              <Text>Horário: {dayjs(pet.date).format("HH:mm")}</Text>
            </View>
          </View>
        </React.Fragment>
      ))}
    </>
  );
};

const History = ({ history }: { history: PetsProps[] }) => {
  console.log(history);
  return (
    <View style={petStyles.appointmentCard}>
      <View style={petStyles.appointmentCardAppbar}>
        <Text style={petStyles.appointmentCardTitle}>Histórico</Text>
      </View>
      <CardsHistory history={history} />
    </View>
  );
};

export default History;
