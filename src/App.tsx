import * as React from 'react';
import {useEffect, useState} from 'react';
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
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
import LinearGradient from 'react-native-linear-gradient';
import {Movie} from "./types/types";
import database from "@react-native-firebase/database";

const Tab = createBottomTabNavigator();

const navigationTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#000',
    },
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const App = (): JSX.Element => {
    const scaleAnimation = useState(new Animated.Value(1))[0];

    const [likedMovies, setLikedMovies] = useState<Movie[]>([]);

    const [userInfo, setuserInfo] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                '242257695385-hflvc8n2j7vq1g48vm0rva6s2j94ul69.apps.googleusercontent.com',
        });
        const user = auth().currentUser;
        if (user) {
            const userRef = database().ref(`users/${user.uid}`);
            userRef.on('value', (snapshot) => {
                const likedMovies = snapshot.val()?.likedMovies || [];
                setLikedMovies(likedMovies);
            });
        }
    }, []);


    const googleSignIn = async () => {
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        const {idToken} = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
    };

    const googleSignOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await auth().signOut();
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
                        options={{ headerShown: false }}
                        children={() => <LikedMoviesScreen />}
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
                <Animated.View style={[stylesApp.textContainer, { transform: [{ scale: scaleAnimation }] }]}>
                    <Text style={stylesApp.logo}>Welcome to <Text style={{color: 'red'}}>LikeFlix</Text></Text>
                    <Text style={stylesApp.slogan}>List your favorite movies in one click</Text>
                </Animated.View>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    textContainer: {
        alignItems: 'center',
    },
    logo: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 0.09 * Math.min(Dimensions.get('window').width, Dimensions.get('window').height),
        fontWeight: '700',
        color: '#f3f3f3',
    },
    slogan: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 0.04 * Math.min(Dimensions.get('window').width, Dimensions.get('window').height),
        fontWeight: '700',
        color: '#f3f3f3',
    },
    googleButton: {
        width:'60%',
        alignSelf: 'center',
        marginTop: '60%',

    }
});
export default App;
