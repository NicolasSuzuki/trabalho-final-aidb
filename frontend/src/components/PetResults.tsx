import { Navigation, Pets as PetsProps } from "../types";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { styles } from "../utils/styles";
import { Button } from "./Button";
import { uri } from "../constants/imageUri";

interface PetProp {
  pet: PetsProps;
  navigation: Navigation;
}
interface PetsCMPProps {
  route: Navigation;
  navigation: Navigation;
  petResults: any;
}
// const CardPet: React.FC<PetProp> = ({ pet, navigation }) => {
//   return (
//     <View style={petStyles.card}>
//       <View style={petStyles.petNameContainer}>
//         <Text style={petStyles.petName}>{pet.name}</Text>
//       </View>
//       <View style={petStyles.infoContainer}>
//         <View style={petStyles.avatarContainer}>
//           <ImageBackground
//             source={{
//               uri: `${uri}${pet.data}`,
//             }}
//             style={petStyles.avatar}
//           />
//           <Text style={petStyles.petInfoCard}>
//             <Text style={petStyles.petInfo}>Espécie:</Text>
//             {pet.race}
//           </Text>
//         </View>
//         <View style={petStyles.petInfoContainer}>
//           <Text style={petStyles.petInfoCard}>
//             <Text style={petStyles.petInfo}>Espécie:</Text>
//             {pet.race}
//           </Text>
//           <Text style={petStyles.petInfoCard}>
//             <Text style={petStyles.petInfo}>Espécie:</Text>
//             {pet.race}
//           </Text>
//           <Text style={petStyles.petInfoCard}>
//             <Text style={petStyles.petInfo}>Espécie:</Text>
//             {pet.race}
//           </Text>
//           <Text style={petStyles.petInfoCard}>
//             <Text style={petStyles.petInfo}>Espécie:</Text>
//             {pet.race}
//           </Text>
//         </View>
//       </View>
//       <Button
//         title="Ver exames"
//         onPress={() => {
//           // Pass and merge params back to home screen
//           navigation.push({
//             name: `Pet`,
//             params: { id: pet.id },
//           });
//         }}
//       />
//     </View>
//   );
// };

const Pet: React.FC<PetsCMPProps> = ({ navigation, route, petResults }) => {
  if (petResults.length <= 0) {
    return <Text>Carregando...</Text>;
  }
  const url = (examData: string) => `${uri}${examData}`
  const handleError = (e:any) => { console.log(e.nativeEvent.error); };
  return (
    <View>
      {petResults.map((petResult: any) => (
      <View key={petResult.examId}>
        <Text>{petResult.name}</Text>
        <Text>{petResult.race}</Text>
        <View>
          <ImageBackground
            key={`${petResult.examId}_${petResult.examData}`}
            onError={handleError}
            source={{
              uri: url(petResult.examData)
            }}
            style={{ zIndex: 999, width: 189, height: 267 }}
          />
        </View>
      </View>
      ))}
    </View>
  );
};

const petStyles = StyleSheet.create({
  avatarContainer: {
    flex: 0.45,
  },
  avatar: {
    overflow: "hidden",
    position: "relative",
    borderRadius: 75,
    marginBottom: 14,
    width: 150,
    height: 150,
  },
  card: {
    margin: 20,
  },
  petNameContainer: {
    backgroundColor: "#80C197",
    padding: 10,
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    marginBottom: 16,
    width: "100%",
  },
  petInfo: {
    fontWeight: "bold",
    marginBottom: 10,
    width: "100%",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  petInfoContainer: {
    flex: 0.5,
  },
  petInfoCard: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: "#d9d9d9",
  },
  petName: {
    fontWeight: "600",
    fontSize: 20,
    color: "#ffffff",
  },
  innerText: {
    color: "red",
  },
});

export default Pet;
