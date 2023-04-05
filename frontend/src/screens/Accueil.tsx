import React, { PropsWithChildren } from "react";
import { Button, View } from "react-native";

const Accueil = ({navigation}: PropsWithChildren<any>): JSX.Element => {
  return (
    <View>
      <Button title="Vers Profil" onPress={() => navigation.navigate('Profil')}/>
      <Button title="Vers ListeLike" onPress={() => navigation.navigate('ListeLike')}/>
      <Button title="Vers Description" onPress={() => navigation.navigate('Description')}/>
    </View>
  );
}

export default Accueil;
