import { Button, View } from "react-native";
import React, { PropsWithChildren } from "react";

const Profil = ({navigation}: PropsWithChildren<any>): JSX.Element => {
  return (
    <View>
      <Button title="Vers Accueil" onPress={() => navigation.navigate('Accueil')}/>
      <Button title="Vers ListeLike" onPress={() => navigation.navigate('ListeLike')}/>
      <Button title="Vers Description" onPress={() => navigation.navigate('Description')}/>
    </View>
  );
}

export default Profil;
