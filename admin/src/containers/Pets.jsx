import { useEffect } from "react";
import { useState } from "react";
import {
  addVaccineToPet,
  removeVaccineToPet,
  updateVaccineToPet,
  getAllPets,
  getAllVaccines,
} from "../api/pet";
import PetsCMP from "../components/Pets";

const Clients = () => {
  const [pets, setPets] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const getAllData = () => {
    return getAllVaccines().then((r) => {
      console.log(r)
      if(r.length > 0)
        setVaccines(r);
      getAllPets().then(setPets);
    });
  };

  const addPetVaccine = ({ vaccineId, petId }) => {
    addVaccineToPet({ vaccineId, petId }).then((r) => {
      getAllData();
    });
  };
  const removePetVaccine = ({ vaccineId, petId }) => {
    removeVaccineToPet({ vaccineId, petId }).then((r) => {
      getAllData();
    });
  };
  const updatePetVaccine = ({ vaccineId, petId, date }) => {
    console.log(vaccineId, petId, date)
    updateVaccineToPet({ vaccineId, petId, date }).then((r) => {
      getAllData();
    });
  };
  useEffect(() => {
    getAllData();
    // eslint-disable-next-line
  }, []);
  return (
    <PetsCMP
      pets={pets}
      vaccines={vaccines}
      onAdd={addPetVaccine}
      onRemove={removePetVaccine}
      onUpdate={updatePetVaccine}
    />
  );
};

export default Clients;
