import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, ImageBackground, Text, TouchableOpacity, View,} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Movie} from '../types/types';
import {styles, stylesDetailsMovie} from "../styles";

interface DetailsMovieProps {
    movie: Movie;
    onClose: () => void;
    addOrDeleteMovieToLiked: (movie: Movie) => void;
    isLikedScreen: boolean;
}

const windowHeight = Dimensions.get('window').height;
const imageBaseUri = 'https://image.tmdb.org/t/p/original';

const DetailsMovie: React.FC<DetailsMovieProps> = ({ movie, onClose, addOrDeleteMovieToLiked, isLikedScreen}: DetailsMovieProps) => {
    const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGFhMzRlODBhYjhiZjFjNjUwZDZkODg3NGVhMjlmNyIsInN1YiI6IjY0MjE5ZmQyMmRjOWRjMDBiZjU5OTNjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rt4jXlqBUiuKPbp9azdbohATA1y0WWgGQxRWQu01z6g'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/recommendations`, options)
            .then(response => response.json())
            .then(response => setRecommendedMovies(response.results))
            .catch(err => console.error(err));
    }, []);

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
                <TouchableOpacity style={stylesDetailsMovie.addButton} onPress={() => addOrDeleteMovieToLiked(movie)}>
                    <Text style={stylesDetailsMovie.addButtonText}>{isLikedScreen ? "Unlike" : "Like"}</Text>
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
                <FlatList
                    data={recommendedMovies}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity style={styles.movieItemCard} onPress={() => console.log(item)}>
                                <Image source={{uri: `${imageBaseUri}${item.poster_path}`}}
                                       style={styles.posterImageCard}/>
                            </TouchableOpacity>
                        );
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    />
            </View>
        </View>
    );
};

export default DetailsMovie;
