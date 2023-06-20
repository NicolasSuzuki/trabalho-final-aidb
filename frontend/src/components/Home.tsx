import * as React from 'react';
import { Text, Button, SafeAreaView, TextInput } from 'react-native';
import { styles } from '../utils/styles';

import { Navigation, User } from '../types'

const Home = ({ navigation, user }: Navigation) => {
    return (
        <SafeAreaView style={styles.container}>
          <Text>Olá, {user.name}!</Text>
          <SafeAreaView style={styles.container}>
            <Button
              title="Meus pets"
              onPress={() =>
                navigation.navigate('Pets')
              }
            />
          </SafeAreaView>
          <SafeAreaView style={styles.container}>
            <Button
              title="Cadastrar Pet"
              onPress={() =>
                navigation.navigate('PetRegister')
              }
            />
          </SafeAreaView>
        </SafeAreaView>
    )
}

export default Home;
