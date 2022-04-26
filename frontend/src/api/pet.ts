import { api } from "./api";
import { Pets } from "../types";

export const registerPets = async (pet: Pets) => {
  console.log(pet)
  await api.post("/pet/register", pet)
    .then((resp: any) => {
      console.log(resp);
    })
    .catch((err: any) => {
      console.error(err);
    });
}