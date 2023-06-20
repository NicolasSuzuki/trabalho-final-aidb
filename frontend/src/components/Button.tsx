import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { styles } from "../utils/styles";

export const Button = (props: {
  onPress: () => void;
  title: string;
  style?: any;
  disabled?: boolean;
  textStyle?: any;
  icon?: string;
}) => {
  const { onPress, disabled=false, icon = null, title = "Save", style = styles.greenButton, textStyle = styles.text} = props;
  return (
    <Pressable style={style} disabled={disabled} onPress={onPress}>
      {/*@ts-ignore*/}
      {icon && <FontAwesome style={{ paddingRight: 20 }} name={icon} size={24} color="white" />}
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
};
