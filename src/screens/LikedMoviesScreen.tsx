import React, {useEffect, useState} from 'react';
import {FlatList, Image, Modal, Text, TouchableOpacity, View,} from 'react-native';
import {Movie} from '../types/types';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {styles} from "../styles";
import DetailsMovie from "../components/DetailsMovie";

const LikedMoviesScreen = () => {
    const [likedMovies, setLikedMovies] = useState<Movie[]|null>([]);
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
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetchLikedMovies();
    }, []);

    const fetchLikedMovies = async () => {
        const user = auth().currentUser;
        if (user) {
            const userId = user.uid;
            try {
                await database()
                    .ref(`/likedMovies/${userId}`)
                    .on('value', (snapshot) => {
                        const movies = snapshot.val();
                        if (movies) {
                            const movieList: Movie[] = Object.values(movies);
                            setLikedMovies(movieList);
                        }else{
                            setLikedMovies(null);
                        }
                    });
            } catch (error) {
                console.error('Error fetching liked movies:', error);
            }
        }
    };

    const renderMovieItem = ({item}: { item: Movie }) => (
        <TouchableOpacity style={styles.movieItemCard} onPress={() => openMovieDetails(item)}>
            <Image source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}} style={styles.posterImageCard}/>
        </TouchableOpacity>
    );

    const openMovieDetails = (movie: Movie) => {
        setSelectedMovie(movie);
        setIsDetailsOpen(true);
    };

    const closeMovieDetails = () => {
        setIsDetailsOpen(false);
    };

    const deleteToLikedMovie = (movie: Movie) => {
        const user = auth().currentUser;
        if (user) {
            const userId = user.uid;
            database()
                .ref(`/likedMovies/${userId}/${movie.id}`)
                .remove()
                .then(() => {
                    setShowPopup(true);
                    setTimeout(() => {
                        setShowPopup(false);
                    }, 2000);
                })
                .catch((error) => {
                    console.error('Error removing movie from liked list:', error);
                });
        }
        closeMovieDetails();
    };

    return (
        <View style={styles.containerCard}>
            {showPopup && (
                <View style={styles.popupContainer}>
                    <Text style={styles.popupText}>Film removed from the list !</Text>
                </View>
            )}
            <Text style={styles.headingCard}>My favorite movies</Text>
            {likedMovies ? (
                <FlatList
                    data={likedMovies}
                    renderItem={renderMovieItem}
                    keyExtractor={(item: Movie) => item.id.toString()}
                    numColumns={2}
                    decelerationRate="fast"
                    initialNumToRender={10}
                />
            ) : (
                <Text style={styles.emptyTextCard}>No liked movies yet.</Text>
            )}
            <Modal visible={isDetailsOpen} animationType="slide">
                <View style={styles.baseContainer}>
                    <DetailsMovie movie={selectedMovie} onClose={closeMovieDetails}
                                  addOrDeleteMovieToLiked={deleteToLikedMovie} isLikedScreen={true}/>
                </View>
            </Modal>
        </View>

    );
};

export default LikedMoviesScreen;
