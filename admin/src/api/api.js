import axios from "axios";
export const api = axios.create({
    baseURL: "http://localhost:8080"
})
//192.168.15.16