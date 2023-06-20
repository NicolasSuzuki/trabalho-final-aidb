import { api } from "./api";
import * as FileSystem from "expo-file-system";
import { uri } from "../constants/imageUri";

interface PetsProps {
  petId: number,
  image: any
}
//Registro de pets
export const registerPet = async (random: any) => 
  console.log(random)
export const updatePets = async (pet: PetsProps) => {
  const task = FileSystem.createUploadTask(
    `${uri}/image/register`,
    pet.image,
    {
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: "photo",
    },
    (data: any) => {
      console.log({ data });
    }
  );
  console.log("TESTE")
  return task.uploadAsync().then((x: { body: string } | undefined) => {
    console.log("TESTE", x?.body)
    if (x?.body)
      return api
        .put("/pet/update", { petId: pet.petId , imageId: parseInt(x.body) })
        .then((resp: any) => {
          console.log("resp")
          return resp;
        })
        .catch((err: any) => {
          console.error(err);
        });
  });
};

//Pegar pets
export const getMyPets = () => {
  return api.get('/pets').then(r => {
    return r.data
  }).catch(console.log)
}

//Pegar pet por Id
export const getPet = (id: number|string) => {
  return api.get(`/pet/${id}`).then(r => {
    return r.data
  }).catch(console.log)
}

//Pegar exam pet
export const getPetExams = (id: number|string) => {
  return api.get(`/pet/exams/`+id).then(r => {
    return r.data
  }).catch(console.log)
}

//Pegar consulta pet
export const getPetAppointments = (id: number|string) => {
  return api.get(`/pet/consultas/`+id).then(r => {
    return r.data
  }).catch(console.log)
}

//Pegar todas consultas pet
export const getPetsAppointments = () => {
  return api.get('/consultas').then(r => {
    console.log(r.data)
    return r.data
  }).catch(console.log)
}

//Pegar vacina pet
export const getPetVaccines = (id: number|string) => {
  return api.get(`/pet/vacinas/`+id).then(r => {
    return r.data
  }).catch(console.log)
}