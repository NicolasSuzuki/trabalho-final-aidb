import { Text } from "react-native";
import { CardsHistory as HistoryCMP } from "../components/History";
import { useEffect, useState } from "react";
import { getPetsAppointments } from "../api/pet";

const History = () => {
  const [appointments, setAppointments] = useState<any>({});
  useEffect(() => {
    getPetsAppointments().then(setAppointments);
  }, []);
  if (appointments.length)
    return (
      <>
        {appointments.map((pet: any) =>
          pet.history.length ? <HistoryCMP history={pet.history} /> : <></>
        )}
      </>
    );
  return <Text>Nenhuma historia foi registrada</Text>;
};

export default History;
