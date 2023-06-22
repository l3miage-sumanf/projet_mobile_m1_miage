import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface UserInfoProps {
    disconnect: () => void;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}

const ProfileScreen = (props: UserInfoProps) => {
    const profilsrc = require('../assets/profil.png');

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={props.photoURL ? {uri: props.photoURL} : profilsrc}
                    style={styles.image}
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.displayName}>{props.displayName}</Text>
                <Text style={styles.email}>{props.email}</Text>
                <TouchableOpacity style={styles.button} onPress={props.disconnect}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
