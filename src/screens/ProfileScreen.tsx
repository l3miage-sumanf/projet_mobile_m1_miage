import * as React from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';

interface UserInfoProps {
  disconnect: () => void;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

const ProfileScreen = (props: UserInfoProps): JSX.Element => {
  const profilsrc = './src/assets/profil.png';
  return (
    <View style={stylesProfil.container}>
      <View>
        <Image
          source={{uri: props.photoURL ? props.photoURL : profilsrc}}
          style={stylesProfil.image}
        />
      </View>
      <View style={stylesProfil.containerInfo}>
        <Text style={stylesProfil.textName}>{props.displayName}</Text>
        <Text style={stylesProfil.text}>{props.email}</Text>
        <Button title="Déconnexion" onPress={props.disconnect} />
      </View>
    </View>
  );
};

const stylesProfil = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  containerInfo: {
    marginTop: '4%',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    marginTop: '40%',
  },
  text: {
    color: '#fff',
  },
  textName: {
    color: '#fff',
    fontSize: 20,
  },
});

export default ProfileScreen;
