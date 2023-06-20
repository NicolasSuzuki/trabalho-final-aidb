import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { useState } from "react";
import { User } from "../types";

interface RegisterProps {
  onRegister: (user: User) => void;
  amIAlive: () => void;
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

const Register: React.FC<RegisterProps> = ({ onRegister, amIAlive }) => {
  const [user, setUser] = useState<User>({ name: "", email: "", password: "", token: null });
  return (
    <SafeAreaView>
      <Text style={styles.container}>
        <Text style={styles.title}>Cadastro de Usuário</Text>
      </Text>
      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={user.name}
        onChangeText={(value) => setUser({ ...user, name: value || "" })}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={user.email}
        onChangeText={(value) => setUser({ ...user, email: value || "" })}
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        value={user.password}
        onChangeText={(value) => setUser({ ...user, password: value || "" })}
      />
      <Button
        onPress={() => onRegister(user)}
        title="Cadastrar"
        color="#841584"
      />
    </SafeAreaView>
  );
};

export default Register;
