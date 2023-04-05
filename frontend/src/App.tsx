import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Accueil from "./screens/Accueil";
import Profil from "./screens/Profil";
import ListeLike from "./screens/ListeLike";
import Description from "./screens/Description";

const Stack = createNativeStackNavigator();
const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Accueil">
        <Stack.Screen name="Accueil" component={Accueil}/>
        <Stack.Screen name="Profil" component={Profil}/>
        <Stack.Screen name="ListeLike" component={ListeLike}/>
        <Stack.Screen name="DescriptionFilm" component={Description}/>
      </Stack.Navigator>
    </NavigationContainer>
    )
};

export default App;
