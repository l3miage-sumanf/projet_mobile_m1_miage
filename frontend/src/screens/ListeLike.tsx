import { Button, View } from "react-native";
import React, { PropsWithChildren } from "react";

const ListeLike = ({navigation}: PropsWithChildren<any>): JSX.Element => {
  return (
    <View>
      <Button title="Vers Accueil" onPress={() => navigation.navigate('Accueil')}/>
      <Button title="Vers Description" onPress={() => navigation.navigate('Description')}/>
      <Button title="Vers Profil" onPress={() => navigation.navigate('Profil')}/>
    </View>
  );
}

export default ListeLike;
