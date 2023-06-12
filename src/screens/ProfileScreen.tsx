import * as React from 'react';
import {Button, Text, View} from 'react-native';
import {styles} from '../styles';

interface UserInfoProps {
  disconnect: () => void;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

const ProfileScreen = (props: UserInfoProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.displayName}</Text>
      <Text style={styles.text}>{props.email}</Text>
      <Button title="Déconnexion" onPress={props.disconnect} />
    </View>
  );
};

export default ProfileScreen;
