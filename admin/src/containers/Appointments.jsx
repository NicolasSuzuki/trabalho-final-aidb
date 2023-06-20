import { useEffect } from "react";
import { useState } from "react";
import { getAllAppointments } from "../api/pet";
import {
  registerAppointment,
  updateAppointment,
  deleteAppointment,
} from "../api/user";
import AppointmentsCMP from "../components/Appointments";

const Appointments = () => {
  const [clients, setClients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const register = async (appointment) => {
    const resp = await registerAppointment(appointment);
    return setAppointments(
      appointments.concat({
        pet: { ...pets.find((p) => p.id === resp.data.petId) },
        ...resp.data,
      })
    );
  };
  useEffect(() => {
    getAllAppointments().then((r) => {
      const { users, pets: allPets, appointments: allAppointments } = r;
      setClients(users);
      setAppointments(
        allAppointments.map((ex) => ({
          ...ex,
          pet: allPets.find((p) => p.id === ex.petId),
          user: users.find((u) => u.id === ex.userId),
        }))
      );
      setPets(allPets);
    });
  }, []);
  const onUpdate = (updateProps) => {
    return updateAppointment(updateProps).then(() =>
      setAppointments(
        appointments.map((a) =>
          a.id === updateProps.id
            ? {
                ...a,
                description: updateProps.description,
                date: updateProps.date,
              }
            : a
        )
      )
    );
  };
  const onDelete = (id) => {
    return deleteAppointment({ id }).then(() =>
      setAppointments(appointments.filter((e) => e.id !== id))
    );
  };
  return (
    <AppointmentsCMP
      onRegister={register}
      onDelete={onDelete}
      onUpdate={onUpdate}
      users={clients}
      appointments={appointments}
      pets={pets}
    />
  );
};

export default Appointments;
