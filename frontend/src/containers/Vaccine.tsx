import { useEffect, useState } from "react";
import { getPet, getPetVaccines } from "../api/pet";
import VaccineCMP from "../components/Vaccine";
import { Navigation, PetsAppointmentsProps, PetsProps } from "../types";

const Vaccine = ({ navigation, route }: Navigation) => {
  const [pet, setPet] = useState<any>();
  useEffect(() => {
    getPetVaccines(route.params.id).then((r) => {
      console.log({r})
      if(!r || r.length < 1)
        return getPet(route.params.id).then(setPet)
      return setPet(r);
    });
  }, []);
  return <VaccineCMP allVaccine={pet} />;
};

export default Vaccine;
