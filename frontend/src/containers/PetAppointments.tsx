import { useEffect, useState } from "react";
import { getPet, getPetAppointments } from "../api/pet";
import AppointmentCMP from "../components/PetAppointments";
import { Navigation, PetsAppointmentsProps, PetsProps } from "../types";

const Appointment = ({ navigation, route }: Navigation) => {
  const [pet, setPet] = useState<PetsAppointmentsProps>();
  useEffect(() => {
    getPetAppointments(route.params.id).then((r) => {
      console.log({r})
      if(!r || r.length < 1)
        return getPet(route.params.id).then(setPet)
      return setPet(r);
    });
  }, []);
  return <AppointmentCMP route={route} petAppointments={pet} />;
};

export default Appointment;
