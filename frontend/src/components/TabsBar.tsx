import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../containers/Home";
import Pets from "../containers/Pets";

const Tab = createBottomTabNavigator();

export const TabsBar = ({}) => {
  return (
    <NavigationContainer>
      {/* @ts-ignore */}
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Pets" component={Pets} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
