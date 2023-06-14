import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Movie } from '../types/types';
import {styles} from "../styles";

interface DetailsLikedMovieProps {
    movie: Movie;
    onClose: () => void;
    deleteMovieToLiked: (movie: Movie) => void
}

const windowHeight = Dimensions.get('window').height;
const imageBaseUri = 'https://image.tmdb.org/t/p/original';

const DetailsLikedMovie: React.FC<DetailsLikedMovieProps> = ({ movie, onClose, deleteMovieToLiked }: DetailsLikedMovieProps) => {

    return (
        <View style={stylesDetailsLikedMovie.container}>
            <ImageBackground
                source={{ uri: `${imageBaseUri}${movie.backdrop_path}` }}
                style={[stylesDetailsLikedMovie.imageBackground, { height: windowHeight * 0.4 }]}
            >
                <TouchableOpacity style={stylesDetailsLikedMovie.closeButton} onPress={onClose}>
                    <Ionicons name="close-circle-outline" size={36} color="white" />
                </TouchableOpacity>
            </ImageBackground>
            <View style={stylesDetailsLikedMovie.contentContainer}>
                <TouchableOpacity style={stylesDetailsLikedMovie.addButton} onPress={() => deleteMovieToLiked(movie)}>
                    <Text style={stylesDetailsLikedMovie.addButtonText}>Delete from list</Text>
                </TouchableOpacity>
                <View style={stylesDetailsLikedMovie.detailsContainer}>
                    <Text style={stylesDetailsLikedMovie.detailsBeforeDescription}>
                        <Text style={stylesDetailsLikedMovie.recommended}>
                            Recommended {(movie.vote_average * 10).toFixed(0)}%
                        </Text>{'   •   '}
                        <Text style={stylesDetailsLikedMovie.originalLanguage}>
                            {movie.release_date.split('-')[0]}
                        </Text>{'   •   '}
                        <Text style={stylesDetailsLikedMovie.originalLanguage}>
                            {movie.original_language.toUpperCase()}
                        </Text>
                    </Text>
                    <Text style={stylesDetailsLikedMovie.title}>{movie.original_title}</Text>
                    <Text style={styles.text}>{movie.overview}</Text>
                </View>
                <Text style={stylesDetailsLikedMovie.suggestionsHeading}>Suggestions</Text>
            </View>
        </View>
    );
};

const stylesDetailsLikedMovie = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    imageBackground: {
        resizeMode: 'cover',
        justifyContent: 'flex-end',
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: 'black',
        flex: 1,
    },
    addButton: {
        alignSelf: 'center',
        top: -20,
        backgroundColor: '#e50914',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 26,
        paddingRight: 50,
        paddingLeft: 50,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    recommended: {
        color: '#30d158',
        fontSize: 14,
        fontWeight: 'bold',
    },
    originalLanguage: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    detailsContainer: {
        marginBottom: 10,
    },
    detailsBeforeDescription: {
        color: 'white',
        marginBottom: 8,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    suggestionsHeading: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default DetailsLikedMovie;
