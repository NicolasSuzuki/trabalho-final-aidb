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
      if (r.length > 0)
        setVaccines(r);
      getAllPets().then(setPets);
    });
  };

  const getVaccinePet = ({vac, petId}) => {
    return {
      vaccineId: vac.id,
      petId,
      vaccinatedAt: null,
      id: vac.id,
      name: vac.name
    }
  }
  const addPetVaccine = ({ vaccineId, petId }) => {
    setPets(pets.map((p) => (p.id === petId ? ({ ...p, vaccines: [...p.vaccines, getVaccinePet({vac:vaccines.find((v) => v.id === vaccineId), petId})] }) : p)));
    addVaccineToPet({ vaccineId, petId }).then((r) => {
    }).catch((e) => {
      console.log(e)
      setPets(pets.map((p) => (p.id === petId ? ({ ...p, vaccines: p.vaccines.filter((v) => v.id !== vaccineId) }) : p)));
    });
  };
  const removePetVaccine = ({ vaccineId, petId }) => {
    removeVaccineToPet({ vaccineId, petId }).then((r) => {
      setPets(pets.map((p) => (p.id === petId ? ({ ...p, vaccines: p.vaccines.filter((v) => v.vaccineId === vaccineId) }) : p)));
    });
  };
  const updatePetVaccine = ({ vaccineId, petId, date }) => {
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
