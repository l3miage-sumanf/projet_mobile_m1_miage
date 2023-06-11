import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const DetailsMovie = () => (
  <View>
    <Text style={styles.texte}>DETAIL DU FILM</Text>
  </View>
);

const styles = StyleSheet.create({
  texte: {
    color: 'blue',
  },
});

export default DetailsMovie;
