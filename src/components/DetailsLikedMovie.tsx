import React from 'react';
import {Dimensions, ImageBackground, Text, TouchableOpacity, View,} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Movie} from '../types/types';
import {styles, stylesDetailsMovie} from "../styles";

interface DetailsLikedMovieProps {
    movie: Movie;
    onClose: () => void;
    deleteMovieToLiked: (movie: Movie) => void
}

const windowHeight = Dimensions.get('window').height;
const imageBaseUri = 'https://image.tmdb.org/t/p/original';

const DetailsLikedMovie: React.FC<DetailsLikedMovieProps> = ({ movie, onClose, deleteMovieToLiked }: DetailsLikedMovieProps) => {

    return (
        <View style={stylesDetailsMovie.container}>
            <ImageBackground
                source={{ uri: `${imageBaseUri}${movie.backdrop_path}` }}
                style={[stylesDetailsMovie.imageBackground, { height: windowHeight * 0.4 }]}
            >
                <TouchableOpacity style={stylesDetailsMovie.closeButton} onPress={onClose}>
                    <Ionicons name="close-circle-outline" size={36} color="white" />
                </TouchableOpacity>
            </ImageBackground>
            <View style={stylesDetailsMovie.contentContainer}>
                <TouchableOpacity style={stylesDetailsMovie.addButton} onPress={() => deleteMovieToLiked(movie)}>
                    <Text style={stylesDetailsMovie.addButtonText}>Unlike</Text>
                </TouchableOpacity>
                <View style={stylesDetailsMovie.detailsContainer}>
                    <Text style={stylesDetailsMovie.detailsBeforeDescription}>
                        <Text style={stylesDetailsMovie.recommended}>
                            Recommended {(movie.vote_average * 10).toFixed(0)}%
                        </Text>{'   •   '}
                        <Text style={stylesDetailsMovie.originalLanguage}>
                            {movie.release_date.split('-')[0]}
                        </Text>{'   •   '}
                        <Text style={stylesDetailsMovie.originalLanguage}>
                            {movie.original_language.toUpperCase()}
                        </Text>
                    </Text>
                    <Text style={stylesDetailsMovie.title}>{movie.original_title}</Text>
                    <Text style={styles.text}>{movie.overview}</Text>
                </View>
                <Text style={stylesDetailsMovie.suggestionsHeading}>Suggestions</Text>
            </View>
        </View>
    );
};

export default DetailsLikedMovie;
