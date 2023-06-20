import PetsCMP from "../components/Pets";
import { getMyPets } from "../api/pet";
import { useEffect, useState } from "react";
import { Navigation, Pets as PetsProps } from "../types";
import { forceUpdate, onSetForceUpdateFalse } from "../constants/forceUpdate";

const Pets = ({ navigation, route }: Navigation) => {
  const [pets, setPets] = useState<PetsProps[]>([]);
  const [refresh, setRefresh] = useState<Boolean>(false)
  const getPets = () => {
    return getMyPets().then(setPets);
  };

  useEffect(() => {
    setPets([]) // forçar refresh
    getPets();
    setRefresh(false)
  }, [route.params?.image, route.params?.petId]);
  return <PetsCMP navigation={navigation} pets={pets} />;
};
export default Pets;
