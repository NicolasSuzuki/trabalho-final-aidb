import { useEffect } from "react";
import { useState } from "react";
import { registerUser, getAllUsers } from "../api/user";
import ClientsCMP from "../components/Clients";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const register = async (user) => {
    const resp = await registerUser(user);
    setClients(clients.concat(resp.data.user));
    return resp;
  };
  useEffect(() => {
    getAllUsers().then((r) => {
      const { users } = r;
      const u = users.map((us) => ({
        ...us,
        pets: r.pets.filter((p) => p.userId === us.id),
      }));
      setClients(u);
    });
  }, []);
  return <ClientsCMP onRegister={register} clients={clients} />;
};

export default Clients;
