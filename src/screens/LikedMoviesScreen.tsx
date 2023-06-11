import * as React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../styles';

const LikedMoviesScreen = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Salut c'est la salle ou les films likés</Text>
    </View>
  );
};

export default LikedMoviesScreen;
