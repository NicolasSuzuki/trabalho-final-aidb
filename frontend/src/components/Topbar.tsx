import { View, Text } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Pets } from "../types";
import { petStyles } from "../utils/styles";

const Topbar = ({ pet, local }: { pet?: Pets; local?: string }) => {
  return (
    <View
      style={
        pet
          ? petStyles.appointmentTitleContainer
          : petStyles.appointmentTitleContainerBlue
      }
    >
      <View>
        {local !== "vaccine" ? (
          <>
            {/* @ts-ignore */}
            <FontAwesome
              style={{ paddingHorizontal: 20, paddingVertical: 18 }}
              name={"calendar-minus-o"}
              size={24}
              color="white"
            />
          </>
        ) : (
          <FontAwesome5
            style={{ paddingHorizontal: 20, paddingVertical: 18 }}
            name="syringe"
            size={24}
            color="white"
          />
        )}
      </View>
      <View>
        <Text
          style={
            pet ? petStyles.appointmentTitle : petStyles.appointmentTitleOnly
          }
        >
          {local !== "vaccine"
            ? pet
              ? "Consultas e agendamentos"
              : "Consulta gerais"
            : "Controle de vacinas"}
        </Text>
        {pet && <Text style={petStyles.appointmentSubtitle}>{pet.name}</Text>}
      </View>
    </View>
  );
};
export default Topbar;
