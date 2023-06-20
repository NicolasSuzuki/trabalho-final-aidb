import { useEffect, useState } from "react";
import { getPet, updatePets } from "../api/pet";
import EditPetCMP from "../components/EditPet";
import { onSetForceUpdateTrue } from "../constants/forceUpdate";
import { Navigation, PetsProps } from "../types";
const EditPet = ({ navigation, route }: Navigation) => {
  const [pet, setPet] = useState<PetsProps>();

  useEffect(() => {
    getPet(route.params.id).then(([r]) => setPet(r));
  }, []);

  const onUpdate = ({ petId, image }: { petId: number; image: any }) => {
    onSetForceUpdateTrue();
    return updatePets({petId, image}).then((r) => {
      console.log(r)
      return navigation.navigate(
      'Pets', 
      { petId, image: r.data[0].data }
      )})
  };
  return <EditPetCMP onUpdate={onUpdate} pet={pet} />;
};

export default EditPet;
