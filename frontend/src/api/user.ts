import { api } from "./api";
import { User } from "../types";

export const registerUser = async (user: User) => {
    console.log("Cheguei");
    api.post("/register", user).then((resp: any) => {
        console.log(resp);
    })
    .catch((err: any) => {
        console.error(err)
    })
}

export const amIAlive = () => {
    api.get("/").then(console.log).catch(console.log);
}