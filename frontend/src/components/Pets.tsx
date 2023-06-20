import React, { useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { petStyles, styles } from "../utils/styles";
import { Button } from "./Button";
import { Navigation, Pets as PetsProps } from "../types";
import { uri } from "../constants/imageUri";
import Avatar from "./Avatar";

interface PetProp {
  pet: PetsProps;
  navigation: Navigation;
}
interface PetsCMPProps {
  navigation: Navigation;
  pets: PetsProps[];
}
const CardPet: React.FC<PetProp> = ({ pet, navigation }) => {
  const [avatar, setAvatar] = useState<string>(pet.data);
  const datetime = dayjs(pet.birthday);
  return (
    <View style={petStyles.card}>
      <View style={petStyles.petNameContainer}>
        <Text style={petStyles.petName}>{pet.name}</Text>
      </View>
      <View style={petStyles.cardContainer}>
        <View style={petStyles.infoContainer}>
          <View style={petStyles.avatarContainer}>
            <Avatar
              pet={{ id: pet.id || 0, data: pet.data }}
              avatar={avatar}
              blockOpenCamera
              setAvatar={setAvatar}
            />
            <TouchableOpacity
              key={pet.id}
              style={petStyles.avatarEdit}
              onPress={() => navigation.push("EditPet", { id: pet.id }) }
            >
              {/*@ts-ignore*/}
              <MaterialCommunityIcons
                name="image-edit-outline"
                style={{padding: 5}}
                size={20}
                color="black"
              />
            </TouchableOpacity>
            <Text style={petStyles.petInfoCardBottom}>
              <Text style={petStyles.petInfo}>Sexo:</Text>
              <Text>{pet.sex || "--------"}</Text>
            </Text>
          </View>
          <View style={petStyles.petInfoContainer}>
            <Text style={petStyles.petInfoCard}>
              <Text style={petStyles.petInfo}>Espécie:</Text>
              <Text>{pet.species || "--------"}</Text>
            </Text>
            <Text style={petStyles.petInfoCard}>
              <Text style={petStyles.petInfo}>Raça:</Text>
              <Text>{pet.race || "--------"}</Text>
            </Text>
            <Text style={petStyles.petInfoCard}>
              <Text style={petStyles.petInfo}>Cor:</Text>
              <Text>{pet.color || "--------"}</Text>
            </Text>
            <Text style={petStyles.petInfoCard}>
              <Text style={petStyles.petInfo}>Nascimento:</Text>
              <Text>
                {datetime.format('DD/MM/YYYY') || " --/--/--"}
              </Text>
            </Text>
          </View>
        </View>
        <Button
          title="Guias e resultados"
          style={styles.greenButtonStart}
          icon="calendar-minus-o"
          onPress={() => {
            // Pass and merge params back to home screen
            navigation.push("Pet", { id: pet.id });
          }}
        />
        <View style={{ margin: 10 }} />
        <Button
          title="Controle de vacinas"
          style={styles.greenButtonStart}
          icon="calendar-minus-o"
          onPress={() => {
            // Pass and merge params back to home screen
            navigation.push("Vaccine", { id: pet.id });
          }}
        />
        <View style={{ margin: 10 }} />
        <Button
          title="Consultas e agendamentos"
          style={styles.greenButtonStart}
          icon="calendar-minus-o"
          onPress={() => {
            // Pass and merge params back to home screen
            navigation.push("Appointment", { id: pet.id });
          }}
        />
      </View>
    </View>
  );
};

const Pets: React.FC<PetsCMPProps> = ({ navigation, pets }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        {Array.from(new Set(pets.map((a) => a.id)))
          .map((id) => pets.find((a) => a.id === id))
          .map((pet) => {
            if (pet)
              return (
                <View key={`${pet.name}_${pet.id}`}>
                  <CardPet pet={pet} navigation={navigation} />
                </View>
              );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Pets;
