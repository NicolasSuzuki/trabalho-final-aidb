import { api } from "./api";

export const registerPet = async (pet) => {
  return api.post("/pet/register", { ...pet }).then((resp) => resp.data);
};

//Pegar all vaccines pet
export const getAllPets = () => {
  return api
    .get("/admin/pets")
    .then((r) => {
      return r.data;
    })
    .catch(console.log);
};

//Pegar all appointments pet
export const getAllAppointments = () => {
  return api
    .get("/admin/consultas")
    .then((r) => {
      return r.data;
    })
    .catch(console.log);
};

//Pegar all vaccines pet
export const getAllVaccines = () => {
  return api
    .get("/admin/vacinas")
    .then((r) => {
      return r.data;
    })
    .catch(console.log);
};

//criar vaccines
export const registerVaccine = async (vaccine) => {
  return api
    .post("/admin/vacina/create", { ...vaccine })
    .then((resp) => resp.data);
};

//criar vaccines
export const addVaccineToPet = async ({ vaccineId, petId }) => {
  return api
    .post("/pet/vacina/create", { vaccineId, petId })
    .then((resp) => resp.data);
};

export const removeVaccineToPet = async ({ vaccineId, petId }) => {
  return api
    .delete(`/pet/vacina/delete/${petId}/${vaccineId}`)
    .then((resp) => resp.data);
};

// Atualizar que o pet já foi vacinado
export const updateVaccineToPet = async ({ vaccineId, petId, date }) => {
  return api
    .put("/pet/vacina/update/", {
      vaccineId,
      petId,
      date,
    })
    .then((resp) => resp.data);
};
