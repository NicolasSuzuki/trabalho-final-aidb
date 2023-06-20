import PetResults from "../components/PetResults";
import { getPetExams } from "../api/pet";
import { useEffect, useState } from "react";
import { Navigation, Pets as PetsProps } from "../types";

const Pets = ({ navigation, route }: Navigation) => {
    const [pet, setPet] = useState<PetsProps[]>([]);
    useEffect(() => {
        getPetExams(route.params.id).then(setPet)
    }, [])
    return (
        <PetResults navigation={navigation} route={route} petResults={pet}  />
    )
}
export default Pets;