import * as React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../styles';

const ProfileScreen = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Salut c'est la salle ou le profil</Text>
    </View>
  );
};

export default ProfileScreen;
