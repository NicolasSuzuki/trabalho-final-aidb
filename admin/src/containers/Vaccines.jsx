import { useEffect } from "react";
import { useState } from "react";
import { getAllUsers } from "../api/user";
import { getAllVaccines, registerVaccine } from "../api/pet";
import VaccinesCMP from "../components/Vaccines";

const Vaccines = () => {
  const [clients, setClients] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const register = async (user) => {
    const resp = await registerVaccine(user);
    setVaccines(vaccines.concat(resp.data));
    return resp;
  };
  useEffect(() => {
    getAllVaccines().then(setVaccines)
    getAllUsers().then((r) => {
      const { users } = r;
      const u = users.map((us) => ({
        ...us,
        pets: r.pets.filter((p) => p.userId === us.id),
      }));
      setClients(u);
    });
  }, []);
  return <VaccinesCMP onRegister={register} vaccines={vaccines} clients={clients} />;
};

export default Vaccines;
