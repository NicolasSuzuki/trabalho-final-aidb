import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
  } from "react-native";
  import { useState } from "react";
  import { Pets } from "../types";
  
  interface RegisterProps {
    onRegister: (pet: Pets) => void;
  }
  
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      textAlign: "center",
    },
    title: {
      textAlign: "center",
    },
    input: {
      width: 200,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  
  const Register: React.FC<RegisterProps> = ({ onRegister }) => {
    const [pet, setPet] = useState<Pets>({ name: "", race: "", userId: 0 });
    return (
      <SafeAreaView>
        <Text style={styles.container}>
          <Text style={styles.title}>Cadastro de Pet</Text>
        </Text>
        <TextInput
          placeholder="Nome"
          style={styles.input}
          value={pet.name}
          onChangeText={(value) => setPet({ ...pet, name: value || "" })}
        />
        <TextInput
          placeholder="Raça"
          style={styles.input}
          value={pet.race}
          onChangeText={(value) => setPet({ ...pet, race: value || "" })}
        />
        <TextInput
          placeholder="User Id"
          keyboardType="numeric"
          style={styles.input}
          value={`${pet.userId}`}
          onChangeText={(value) => setPet({ ...pet, userId: parseInt(value, 10) || 0 })}
        />
        <Button
          onPress={() => onRegister(pet)}
          title="Cadastrar Pet"
          color="#841584"
        />
      </SafeAreaView>
    );
  };
  
  export default Register;