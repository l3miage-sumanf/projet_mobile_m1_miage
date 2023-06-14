import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Modal,
} from 'react-native';
import { Movie } from '../types/types';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {styles} from "../styles";
import DetailsLikedMovie from "../components/DetailsLikedMovie";

const LikedMoviesScreen = () => {
    const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
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
                            console.log("----------------------");
                            for(let i = 0; i < movieList.length; i++){
                                console.log(movieList[i].original_title)
                            }
                            console.log("-----------------------");
                            setLikedMovies(movieList);
                        }
                    });
            } catch (error) {
                console.error('Error fetching liked movies:', error);
            }
        }
    };

    const renderMovieItem = ({ item }: { item: Movie }) => (
        <TouchableOpacity style={styles.movieItemCard} onPress={() => openMovieDetails(item)}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.posterImageCard} />
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
                    console.log('Movie removed from liked list');
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
            {likedMovies.length > 0 ? (
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
                    <DetailsLikedMovie movie={selectedMovie} onClose={closeMovieDetails} deleteMovieToLiked={deleteToLikedMovie} />
                </View>
            </Modal>
        </View>

    );
};

export default LikedMoviesScreen;
