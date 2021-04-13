import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Cam from "../screens/Cam";

const Stack = createStackNavigator();

export const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Cam" component={Cam} />
    </Stack.Navigator>
  );
};
