import React, { useState } from "react";
import { FontAwesome, Feather } from "@expo/vector-icons";

import { View, Text, Linking } from "react-native";
import { Navigation, Pets, PetsAppointmentsProps, PetsProps } from "../types";
import { petStyles, styles } from "../utils/styles";
import { Button } from "./Button";
import Topbar from "./Topbar";
import HistoryCMP from "./History";
import dayjs from "dayjs";

const onAskToCreateAppointment = async (petAppointment: PetsProps) => {
  const slugName = petAppointment.name
    .replace(/ /g, "%20")
    .replace(/[^\w-]+/g, "");

  const link = `https://api.whatsapp.com/send?phone=5512991339403&text=Ol%C3%A1%20queria%20marcar%20uma%20consulta%20para%20o%20${slugName}`;
  const isWhatsappInstalled = await Linking.canOpenURL(
    "https://api.whatsapp.com"
  );
  if (isWhatsappInstalled) {
    Linking.openURL(link);
  } else {
    alert("WhatsApp is not installed on your device.");
  }
};
const onAskToCancelAppointment = async (petAppointment: PetsProps) => {
  const slugName = petAppointment.name
    .replace(/ /g, "%20")
    .replace(/[^\w-]+/g, "");
  const appointmentDate = `${petAppointment.date}`
    .replace(/\/ /g, "-")
    .replace(/[^\w-]+/g, "");

  const link = `https://api.whatsapp.com/send?phone=5512991339403&text=Ol%C3%A1%20queria%20desmarcar%20a%20consulta%20do%20dia%20${appointmentDate}%20com%20o%20${slugName}`;
  const isWhatsappInstalled = await Linking.canOpenURL(
    "https://api.whatsapp.com"
  );
  if (isWhatsappInstalled) {
    Linking.openURL(link);
  } else {
    alert("WhatsApp is not installed on your device.");
  }
};

export const NextAppointmentCard = ({ pet }: { pet: PetsProps }) => {
  const datetime = dayjs(pet.date);
  const now = dayjs();
  let dateToShow;
  const dateDiff = {
    meses: datetime.diff(now, "month"),
    semanas: datetime.diff(now, "week"),
    dias: datetime.diff(now, "day"),
    horas: datetime.diff(now, "hour"),
    minutos: datetime.diff(now, "minute"),
  };
  const dictDate: any = {
    meses: "mês",
    semanas: "semana",
    dias: "dia",
    horas: "hora",
    minutos: "minuto",
  };
  // Convertendo o objeto em array para comparar os tempos e pegar o menor para ser exibido
  const dateSortBySmaller = Object.entries(dateDiff)
    .filter(([a, b]) => b !== 0)
    .sort(([a1, a2], [b1, b2]) => b2 - a2);
  dateToShow = dateSortBySmaller[dateSortBySmaller.length - 1];
  return (
    <View style={petStyles.appointmentCard}>
      <View style={petStyles.appointmentCardAppbar}>
        <Text style={petStyles.appointmentCardTitle}>{pet.name}</Text>
        <Text style={petStyles.appointmentCardTimeRemaning}>
          {`${dateToShow[1]} ${
            dateToShow[1] === 1 ? dictDate[`${dateToShow[0]}`] : dateToShow[0]
          }`}{" "}
          até a consulta
        </Text>
      </View>
      <View style={petStyles.appointmentCardAlert}>
        {/* @ts-ignore */}
        <Feather name="alert-circle" size={24} color="#FFBA00" />
        <Text style={{ marginTop: 2, paddingRight: 10 }}>
          Você possui uma consulta marcada!
        </Text>
      </View>
      <View style={petStyles.appointmentCardInformationsContainer}>
        <View style={petStyles.appointmentCardInformations}>
          <Text>Data: {datetime.format("DD/MM/YYYY")}</Text>
        </View>
        <View style={petStyles.appointmentCardInformations}>
          <Text>Horário: {datetime.format("HH:mm")}</Text>
        </View>
      </View>
    </View>
  );
};

const Appointment = ({
  route,
  petAppointments,
}: {
  route: Navigation;
  petAppointments?: PetsAppointmentsProps;
}) => {
  if (!petAppointments || !petAppointments.pet)
    return <Text> Carregando...</Text>;
  const { pet, appointments, nextAppointment, nextAppointments, history } =
    petAppointments;

  return (
    <>
      <Topbar pet={pet} />
      <View style={petStyles.appointmentContainer}>
        {nextAppointment ? (
          <NextAppointmentCard pet={nextAppointment} />
        ) : (
          <Text style={{ margin: 20, textAlign: "center" }}>
            Você ainda não tem nenhuma consulta agendada
          </Text>
        )}
        <Button
          onPress={() => onAskToCreateAppointment(nextAppointment)}
          title={"Agendar consulta"}
          style={styles.greenButton}
        />
        <View style={{ margin: 10 }} />
        {nextAppointment && (
          <Button
            onPress={() => onAskToCancelAppointment(nextAppointment)}
            title={"Desmarcar consulta"}
            style={styles.whiteButton}
            textStyle={styles.greenText}
          />
        )}
        {!!history.length && <HistoryCMP history={history} />}
      </View>
    </>
  );
};

export default Appointment;
