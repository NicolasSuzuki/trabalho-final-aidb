import React, { useState } from "react";
import { Text, View, SafeAreaView, TextInput, Image } from "react-native";
import { styles } from "../utils/styles";
import { Login as LoginProps, Navigation, User } from "../types";
import { Button } from "./Button";

interface Props {
  onLogin: (info: LoginProps) => void;
  navigation: Navigation;
}

const Login = ({ onLogin, navigation }: Props) => {
  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [hideBottom, setHideBottom] = useState<boolean>(false);

  const handleLogin = () => {
    if (!!login && !!password)
    onLogin({ email: login, password });
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.backgroundLogin}>
        <Image
          source={require("../../assets/logo_white2x.png")}
          style={{ height: 44, width: 124 }}
        />
        <View style={styles.whiteLine} />
        <Text style={styles.welcomeText}>Bem-vindo(a) à petlife!</Text>
      </View>
      <View style={styles.cardLoginContainer}>
        <View style={styles.inputLoginContainer}>
          <Text style={styles.textLogin}>Seu e-mail cadastrado na Petlife</Text>
          <TextInput
            placeholder="Email"
            onFocus={() => setHideBottom(true)}
            onBlur={() => setHideBottom(false)}
            style={styles.inputLogin}
            textContentType="emailAddress"
            autoCapitalize='none'
            value={login}
            onChangeText={(value) => setLogin(value)}
          />
        </View>
        <View style={styles.inputLoginContainer}>
          <Text style={styles.textLogin}>Sua senha cadastrada na Petlife</Text>
          <TextInput
            placeholder="Senha"
            secureTextEntry
            onFocus={() => setHideBottom(true)}
            onBlur={() => setHideBottom(false)}
            style={styles.inputLogin}
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
        </View>
        <Button onPress={handleLogin} title="Entrar" />
      </View>
      {!hideBottom && (
        <View style={styles.bottomLogin}>
          <Text style={styles.simpleText}>Ainda não tem uma conta?</Text>
          <View style={{ margin: 10 }} />
          <Button
            title="Cadastre-se agora"
            onPress={() => navigation.navigate("Register")}
            style={styles.whiteButton}
            textStyle={styles.greenText}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Login