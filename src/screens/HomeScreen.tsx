import React, {useEffect, useState} from 'react';
import {FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DetailsMovie from '../components/DetailsMovie';
import {Movie} from '../types/types';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {styles} from "../styles";

const HomeScreen = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie>({
        id: 0,
        original_title: '',
        original_language: '',
        vote_average: 0,
        backdrop_path: '',
        overview: '',
        release_date: '',
        poster_path: '',
    });
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showHeading, setShowHeading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetchMovies();
    }, [searchQuery]);

    const fetchMovies = () => {
        const apiKey: string = '08aa34e80ab8bf1c650d6d8874ea29f7';
        const urlTrending: string = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
        const urlSearch: string = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`;
        let url: string = `${urlTrending}`;
        if (searchQuery.trim() !== '') {
            url = `${urlSearch}&query=${searchQuery}`;
            setShowHeading(false);
        } else {
            setShowHeading(true);
        }

        try {
            fetch(url).then((data) => {
                return data.json();
            }).then((data) => {
                if (JSON.stringify(data.results) !== JSON.stringify(movies)) {
                    setMovies(data.results);
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const renderMovieItem = ({item}: { item: Movie }) => (
        <TouchableOpacity style={styles.movieItemCard} onPress={() => openMovieDetails(item)}>
            <Image source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
                   style={styles.posterImageCard}/>
        </TouchableOpacity>
    );

    const openMovieDetails = (movie: Movie) => {
        setSelectedMovie(movie);
        setIsDetailsOpen(true);
    };

    const closeMovieDetails = () => {
        setIsDetailsOpen(false);
    };

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        setShowHeading(false);
    };

    const addMovieToLiked = (movie: Movie) => {
        const user = auth().currentUser;
        if (user) {
            const userId = user.uid;
            database()
                .ref(`/likedMovies/${userId}/${movie.id}`)
                .set(movie)
                .then(() => {
                    setShowPopup(true);
                    setTimeout(() => {
                        setShowPopup(false);
                    }, 2000);
                })
                .catch((error) => {
                    console.error('Error adding movie to liked list:', error);
                });
        }
        closeMovieDetails();
    };

    return (
        <View style={styles.containerCard}>
            {showPopup && (
                <View style={styles.popupContainer}>
                    <Text style={styles.popupText}>Movie added to the list !</Text>
                </View>
            )}
            <TextInput
                style={stylesHome.searchBar}
                placeholder="Search for a movie..."
                placeholderTextColor="white"
                value={searchQuery}
                onChangeText={handleSearch}
            />
            {showHeading && <Text style={styles.headingCard}>Trending movies</Text>}
            {movies?.length > 0 ? (
                <FlatList
                    data={movies}
                    renderItem={renderMovieItem}
                    keyExtractor={(item: Movie) => item.id.toString()}
                    numColumns={2}
                    decelerationRate="fast"
                    initialNumToRender={10}
                />
            ) : (
                <Text style={styles.emptyTextCard}>No movies yet.</Text>
            )}
            <Modal visible={isDetailsOpen} animationType="slide">
                <View style={styles.baseContainer}>
                    <DetailsMovie movie={selectedMovie} onClose={closeMovieDetails}
                                  addOrDeleteMovieToLiked={addMovieToLiked} isLikedScreen={false}/>
                </View>
            </Modal>
        </View>
    );
};

const stylesHome = StyleSheet.create({
    searchBar: {
        height: 40,
        borderWidth: 2,
        borderBottomColor: 'grey',
        paddingHorizontal: 16,
        marginBottom: 10,
        color: 'white'
    },
    likeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'transparent',
        padding: 8,
    },
});

export default HomeScreen;
