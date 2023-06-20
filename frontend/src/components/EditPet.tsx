import { useState } from "react";
import { View, Text } from "react-native";
import { onSetForceUpdateTrue } from "../constants/forceUpdate";
import { PetsProps } from "../types";
import { petStyles, styles } from "../utils/styles";

import Avatar from "./Avatar";
import { Button } from "./Button";

interface EditProps {
  onUpdate: (props: { petId: number; image: any }) => Promise<any>;
  pet?: PetsProps;
}
const EditPet = ({ onUpdate, pet }: EditProps) => {
  if (!pet) return <Text>Carregando...</Text>;
  const [avatar, setAvatar] = useState<string>(`${pet.data}`);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <View style={styles.paperContainer}>
      <View style={petStyles.petNameContainer}>
        <Text style={petStyles.petName}>{pet.name}</Text>
      </View>
      <Avatar
        pet={{ id: pet.id || 0, data: `${pet.data}` }}
        avatar={avatar}
        setAvatar={setAvatar}
      />
      <Button
        title={loading ? "Salvando..." : "Salvar"}
        disabled={loading}
        style={loading ? styles.greenButtonDisabled : styles.greenButton}
        onPress={() => {
          setLoading(true);
          onUpdate({ petId: parseInt(`${pet.id}`, 10), image: avatar }).then(
            (r) => {
              onSetForceUpdateTrue();
              if (r.data.id) setLoading(false);
            }
          );
        }}
      />
    </View>
  );
};

export default EditPet;
