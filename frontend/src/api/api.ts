import axios from "axios";
import { uri } from "../constants/imageUri";
export const api = axios.create({
    baseURL: uri
})