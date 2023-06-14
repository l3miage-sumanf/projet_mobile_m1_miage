import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import LikedMoviesScreen from './screens/LikedMoviesScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#000',
  },
};

const App = (): JSX.Element => {
  const [userInfo, setuserInfo] = useState<FirebaseAuthTypes.User | null>(null);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '242257695385-hflvc8n2j7vq1g48vm0rva6s2j94ul69.apps.googleusercontent.com',
    });
  }, []);

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

  return userInfo !== null ? (
    <>
      <NavigationContainer theme={navigationTheme}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'ios-home' : 'ios-home-outline';
              } else if (route.name === 'Profile') {
                iconName = focused
                  ? 'person-circle-sharp'
                  : 'person-circle-outline';
              } else if (route.name === 'Liked') {
                iconName = focused ? 'heart' : 'heart-outline';
              }

              return (
                <Ionicons name={iconName ?? ''} size={size} color={'white'} />
              );
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: '#000',
              borderTopColor: '#000',
            },
            sceneContainerStyle: {backgroundColor: '#000'},
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
          })}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Liked"
            component={LikedMoviesScreen}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Profile"
            options={{headerShown: false}}
            children={() => (
              <ProfileScreen
                displayName={userInfo?.displayName}
                email={userInfo?.email}
                photoURL={userInfo?.photoURL}
                disconnect={() =>
                  googleSignOut().then(() => {
                    setuserInfo(null);
                  })
                }
              />
            )}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  ) : (
    <>
      <View style={stylesApp.container}>
        <GoogleSigninButton
          style={stylesApp.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={() =>
            googleSignIn()
              .then(res => {
                setuserInfo(res.user);
              })
              .catch(error => console.log(error))
          }
        />
      </View>
    </>
  );
};

const stylesApp = StyleSheet.create({
  container: {
    height: '100%',
  },
  googleButton: {
    width: 312,
    height: 48,
    alignSelf: 'center',
    marginTop: '60%',
  },
});

export default App;
