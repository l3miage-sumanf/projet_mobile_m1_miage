import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import LikedMoviesScreen from './screens/LikedMoviesScreen';
import ProfileScreen from './screens/ProfileScreen';
import {Pressable, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

// const Tab = createBottomTabNavigator();
//
// const navigationTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     background: '#000',
//   },
// };

const App = (): JSX.Element => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '242257695385-hflvc8n2j7vq1g48vm0rva6s2j94ul69.apps.googleusercontent.com',
    });
  });

  const googleSignIn = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  const googleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      // Google Account disconnected from your app.
      // Perform clean-up actions, such as deleting data associated with the disconnected account.
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Pressable
        onPress={() =>
          googleSignIn()
            .then(res => {
              console.log(res);
              setUserData(res.user);
            })
            .catch(error => console.log(error))
        }>
        <Text>Connexion avec Google</Text>
      </Pressable>
      <Text>{userData}</Text>
      <Pressable
        onPress={() =>
          googleSignOut().then(res => {
            console.log('Déconecté');
          })
        }>
        <Text>Déconnexion</Text>
      </Pressable>
    </View>
    // <NavigationContainer theme={navigationTheme}>
    //   <Tab.Navigator
    //     screenOptions={({route}) => ({
    //       tabBarIcon: ({focused, size}) => {
    //         let iconName;
    //
    //         if (route.name === 'Home') {
    //           iconName = focused ? 'ios-home' : 'ios-home-outline';
    //         } else if (route.name === 'Profile') {
    //           iconName = focused
    //             ? 'person-circle-sharp'
    //             : 'person-circle-outline';
    //         } else if (route.name === 'Liked') {
    //           iconName = focused ? 'heart' : 'heart-outline';
    //         }
    //
    //         return (
    //           <Ionicons name={iconName ?? ''} size={size} color={'white'} />
    //         );
    //       },
    //       tabBarActiveTintColor: 'white',
    //       tabBarInactiveTintColor: 'gray',
    //       tabBarStyle: {
    //         backgroundColor: '#000',
    //         borderTopColor: '#000',
    //       },
    //       sceneContainerStyle: {backgroundColor: '#000'},
    //       headerStyle: {
    //         backgroundColor: '#000',
    //       },
    //       headerTintColor: '#fff',
    //     })}>
    //     <Tab.Screen
    //       name="Home"
    //       component={HomeScreen}
    //       options={{headerShown: false}}
    //     />
    //     <Tab.Screen
    //       name="Liked"
    //       component={LikedMoviesScreen}
    //       options={{headerShown: false}}
    //     />
    //     <Tab.Screen
    //       name="Profile"
    //       component={ProfileScreen}
    //       options={{headerShown: false}}
    //     />
    //   </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default App;
