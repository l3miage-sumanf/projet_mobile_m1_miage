import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {UserInfoProps} from '../types/types'

const ProfileScreen = (props: UserInfoProps) => {

    return (
        <View style={stylesProfile.container}>
            <View style={stylesProfile.imageContainer}>
                <Image
                    source={props.photoURL ? {uri: props.photoURL} : require('../assets/profil.png')}
                    style={stylesProfile.image}
                />
            </View>
            <View style={stylesProfile.infoContainer}>
                <Text style={stylesProfile.displayName}>{props.displayName}</Text>
                <Text style={stylesProfile.email}>{props.email}</Text>
                <TouchableOpacity style={stylesProfile.button} onPress={props.disconnect}>
                    <Text style={stylesProfile.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const stylesProfile = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
    },
    imageContainer: {
        marginTop: '40%',
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
    },
    infoContainer: {
        marginTop: '20%',
        alignItems: 'center',
    },
    displayName: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 10,
    },
    email: {
        color: 'gray',
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#e50914',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
