import { useEffect } from "react";
import { useState } from "react";
import { registerResult, getAllUsers, updateResult, deleteResult } from "../api/user";
import ResultsCMP from "../components/Results";

const Results = () => {
  const [clients, setClients] = useState([]);
  const [results, setResults] = useState([]);
  const [pets, setPets] = useState([]);
  const register = (result) => {
    setResults(
      results.concat({
        ...result,
        date: result.date,
        pet: pets.find((p) => p.id === result.petId),
        user: clients.find((u) => u.id === result.userId),
        id: "",
      })
    );
    return registerResult(result);
  };
  useEffect(() => {
    getAllUsers().then((r) => {
      const { users, pets: allPets, results: allResults } = r;
      setClients(users);
      setResults(
        allResults.map((ex) => ({
          ...ex,
          pet: allPets.find((p) => p.id === ex.petId),
          user: users.find((u) => u.id === ex.userId),
        }))
      );
      setPets(allPets);
    });
  }, []);
  const onDelete = (id) => {
    return deleteResult({ id }).then(() => setResults(results.filter(e => e.id !== id)));
  }
  return (
    <ResultsCMP
      onRegister={register}
      onDelete={onDelete}
      onUpdate={updateResult}
      users={clients}
      results={results}
      pets={pets}
    />
  );
};

export default Results;
