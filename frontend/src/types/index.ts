import { ReactNode } from "react";

export interface User {
  name: string;
  email: string;
  token: string | null;
  password: string;
}

export interface Login {
  password: string;
  email: string;
}

export type Pets = {
  species: string;
  sex: string;
  birthday: string;
  color: string;
  examData: any;
  examId: number | null | undefined;
  examDate: Date | any;
  id?: number;
  name: string;
  race: string;
  data: any;
  image: any;
};

export interface PetsProps {
  date: Date | null;
  id?: number;
  name: string;
  race: string;
  image: string;
  data: Date | null | string;
}

export interface PetsAppointmentsProps {
  pet: Pets;
  appointments: PetsProps[];
  nextAppointments: PetsProps[];
  history: PetsProps[];
  nextAppointment: PetsProps;
}
export type PetsVaccine = any
//To Fix navigation props type
export type Navigation = any;
export type UserDefault = any;
