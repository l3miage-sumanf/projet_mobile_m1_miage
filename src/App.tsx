import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
  return (
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
          sceneContainerStyle: {backgroundColor: '#000'}, // Déplacez cette ligne à l'intérieur de screenOptions
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
          component={ProfileScreen}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
