import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    Image,
    Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Movie } from '../types/types';

interface DetailsMovieProps {
    movie: Movie;
    onClose: () => void;
    onAddToList: () => void;
}

const windowHeight: number = Dimensions.get('window').height;

const DetailsMovie: React.FC<DetailsMovieProps> = ({
                                                       movie,
                                                       onClose,
                                                       onAddToList,
                                                   }: DetailsMovieProps) => {
    const renderSuggestionItem = ( item : Movie ) => (
        <TouchableOpacity style={stylesDetailsMovie.suggestionItem}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/original${item.backdrop_path}` }}
                style={stylesDetailsMovie.suggestionImage}
            />
        </TouchableOpacity>
    );

    return (
        <View style={stylesDetailsMovie.container}>
            <ImageBackground
                source={{ uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}` }}
                style={[stylesDetailsMovie.imageBackground, { height: windowHeight * 0.4 }]}
            >
                <TouchableOpacity style={stylesDetailsMovie.closeButton} onPress={onClose}>
                    <Ionicons name="close-circle-outline" size={36} color="white" />
                </TouchableOpacity>
            </ImageBackground>
            <View style={stylesDetailsMovie.contentContainer}>
                <TouchableOpacity style={stylesDetailsMovie.addButton} onPress={onAddToList}>
                    <Text style={stylesDetailsMovie.addButtonText}>Add to list</Text>
                </TouchableOpacity>
                <View style={stylesDetailsMovie.detailsContainer}>
                    <Text style={stylesDetailsMovie.detailsBeforeDescription}>
                        <Text style={stylesDetailsMovie.recommended}>
                            Recommended {(movie.vote_average * 10).toFixed(0)}%
                        </Text>{'   •   '}
                        <Text style={stylesDetailsMovie.originalLanguage}>
                            {movie.release_date.split("-")[0]}
                        </Text>{'   •   '}
                        <Text style={stylesDetailsMovie.originalLanguage}>
                            {movie.original_language.toUpperCase()}
                        </Text>
                    </Text>
                    <Text style={stylesDetailsMovie.title}>{movie.original_title}</Text>
                    <Text style={stylesDetailsMovie.description}>{movie.overview}</Text>
                </View>
                <Text style={stylesDetailsMovie.suggestionsHeading}>Suggestions</Text>
            </View>
        </View>
    );
};

const stylesDetailsMovie = StyleSheet.create({
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
        marginBottom: 10
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
    description: {
        color: 'white',
        fontSize: 14,
    },
    suggestionsHeading: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    suggestionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    suggestionItem: {
        width: '48%',
        aspectRatio: 16 / 9,
        marginBottom: 16,
    },
    suggestionImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 8,
    },
});

export default DetailsMovie;
