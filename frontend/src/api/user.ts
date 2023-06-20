import { api } from "./api";
import { User } from "../types";

export const registerUser = async (user: User) => {
  api
    .post("/register", user)
    .then((resp: any) => {
      console.log(resp);
    })
    .catch((err: any) => {
      console.error(err);
    });
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) =>
  api
    .post("/login", { email, password })
    .then((resp: any) => {
      api.defaults.headers.common["Authorization"] = resp.data.token;
      return resp.data;
    })
    .catch((err: any) => {
      console.error(err);
    });

export const amIAlive: () => Promise<void | User> = () =>
  api
    .get("/")
    .then((r: { data: User }) => r.data)
    .catch(console.log);
