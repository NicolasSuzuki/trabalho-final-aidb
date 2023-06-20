import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "./src/containers/Home";
import Register from "./src/containers/Register";
import PetRegister from "./src/containers/PetRegister";
import Pets from "./src/containers/Pets";
import AppBar from "./src/components/Appbar";
import { useEffect, useState } from "react";
import { loginUser } from "./src/api/user";
import { Login as LoginProps, User } from "./src/types";
import { api } from "./src/api/api";
import Login from "./src/components/Login";
import Appointments from "./src/containers/Appointments";
import History from "./src/containers/History";
import Pet from "./src/containers/Pet";
import Appointment from "./src/containers/PetAppointments";
import Vaccine from "./src/containers/Vaccine";
import EditPet from "./src/containers/EditPet";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const PetStack = createNativeStackNavigator();

const Icon = (props: any) => {
  return (
    <>
      {/* @ts-ignore */}
      <MaterialCommunityIcons {...props} />
    </>
  );
};
const HistoryStackScreen = () => {
  return (
    <>
      {/* @ts-ignore */}
      <HomeStack.Navigator
        key="appointments-tab"
        initialRouteName="History"
        screenOptions={{
          header: (props) => <AppBar {...props} />,
        }}
      >
        <HomeStack.Screen name="History" component={History} />
        <HomeStack.Screen name="Pets/:id" component={Pets} />
        <HomeStack.Screen name="Register" component={Register} />
        <HomeStack.Screen name="PetRegister" component={PetRegister} />
      </HomeStack.Navigator>
    </>
  );
};

const AppointmentsStackScreen = () => {
  return (
    <>
      {/* @ts-ignore */}
      <HomeStack.Navigator
        key="appointments-tab"
        initialRouteName="Appointments"
        screenOptions={{
          header: (props) => <AppBar {...props} />,
        }}
      >
        <HomeStack.Screen name="Appointments" component={Appointments} />
        <HomeStack.Screen name="Appointment" component={Appointment} />
        <HomeStack.Screen name="Appointment/:id" component={Appointment} />
        <HomeStack.Screen name="Vaccine" component={Vaccine} />
        <HomeStack.Screen name="Vaccine/:id" component={Vaccine} />
        <HomeStack.Screen name="Register" component={Register} />
        <HomeStack.Screen name="PetRegister" component={PetRegister} />
      </HomeStack.Navigator>
    </>
  );
};

const PetStackScreen = () => {
  return (
    <>
      {/* @ts-ignore */}
      <PetStack.Navigator
        key="pets-tab"
        initialRouteName="Pets"
        screenOptions={{
          header: (props) => <AppBar {...props} />,
        }}
      >
        <PetStack.Screen name="Pets" component={Pets} />
        <PetStack.Screen name="Pet" component={Pet} />
        <PetStack.Screen name="Pet/:id" component={Pet} />
        <PetStack.Screen name="EditPet" component={EditPet} />
        <PetStack.Screen name="EditPet/:id" component={EditPet} />
        <HomeStack.Screen name="Appointment" component={Appointment} />
        <HomeStack.Screen name="Appointment/:id" component={Appointment} />
        <HomeStack.Screen name="Vaccine" component={Vaccine} />
        <HomeStack.Screen name="Vaccine/:id" component={Vaccine} />
        <PetStack.Screen name="Register" component={Register} />
        <PetStack.Screen name="PetRegister" component={PetRegister} />
      </PetStack.Navigator>
    </>
  );
};

const { Navigator, Screen } = Tab;

export default function Main() {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    token: null,
  });

  const onLogin = ({ email, password }: LoginProps) => {
    return loginUser({ email, password }).then((resp) => {
      console.log(resp)
      resp.token ? setUser(resp) : null;
    })};

  useEffect(() => {
    setLogged(!!api.defaults.headers.common["Authorization"]);
  }, [user]);

  if (logged)
    return (
      <NavigationContainer>
        {/* @ts-ignore */}
        <Navigator key="nav" initialRouteName="Pets" screenOptions={{
          header: () => <></>,
        }}>
          <Screen
            name="MainPets"
            options={{
              tabBarLabel: "Início",
              tabBarIcon: ({ color }) => (
                <Icon name="home" color={color} size={26} />
              ),
            }}
            component={PetStackScreen}
          />
          <Screen
            name="Appointments"
            options={{
              tabBarLabel: "Consultas",
              tabBarIcon: ({ color }) => (
                <Icon name="calendar-minus" color={color} size={26} />
              ),
            }}
            component={AppointmentsStackScreen}
          />
          <Screen
            name="Settings"
            options={{
              tabBarLabel: "Histórico",
              tabBarIcon: ({ color }) => (
                <Icon name="history" color={color} size={26} />
              ),
            }}
            component={HistoryStackScreen}
          />
        </Navigator>
      </NavigationContainer>
    );
  return (
    <NavigationContainer>
      {/* @ts-ignore */}
      <HomeStack.Navigator
        key="nav"
        initialRouteName="Login"
        screenOptions={{
          header: () => <></>,
        }}
      >
        <HomeStack.Screen
          name="Login"
          component={(props) => <Login onLogin={onLogin} navigation={props} />}
        />
        <HomeStack.Screen name="Pets" component={PetStackScreen} />
        <HomeStack.Screen
          name="Appointments"
          component={AppointmentsStackScreen}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}
