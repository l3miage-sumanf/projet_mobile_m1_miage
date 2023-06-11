import React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../styles';
const HomeScreen = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Salut c'est la salle ou l'accueil</Text>
    </View>
  );
};

export default HomeScreen;
