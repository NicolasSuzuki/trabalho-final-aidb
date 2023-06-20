import * as React from "react";
import { Appbar } from "react-native-paper";
import { Image } from "react-native";
import { Navigation } from "../types";
import { styles } from "../utils/styles";

const { Header, BackAction, Content, Action } = Appbar;
const AppBar = ({ navigation, back }: Navigation) => {
  return (
    <>
      {/* @ts-ignore */}
      <Header>
        {navigation.canGoBack() ? <BackAction onPress={navigation.goBack} /> : null}
        <Image source={require("../../assets/logo_green2x.png")} style={styles.logoAppbar} />
        {/* @ts-ignore */}
        <Content />
        <Action icon="bell" onPress={() => {}} />
        <Action icon="menu" onPress={() => {}} />
      </Header>
    </>
  );
};

export default AppBar;
