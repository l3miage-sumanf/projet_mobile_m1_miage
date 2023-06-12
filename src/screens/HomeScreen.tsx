import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Modal, TextInput } from 'react-native';
import DetailsMovie from '../components/DetailsMovie';

interface Movie {
    id: number;
    original_title: string;
    original_language: string;
    vote_average: number;
    backdrop_path: string;
    overview: string;
    release_date: string;
    poster_path: string;
    suggestions: {id: string, backdrop_path: string}[];
}

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
        suggestions: [],
    });
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showHeading, setShowHeading] = useState(true);

    useEffect((): void => {
        fetchMovies();
    }, [searchQuery]);

    const fetchMovies = async (): Promise<void> => {
        const apiKey : string = '08aa34e80ab8bf1c650d6d8874ea29f7';
        let url: string = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;

        if (searchQuery) {
            url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;
            setShowHeading(false);
        } else {
            setShowHeading(true);
        }

        const response: Response = await fetch(url);
        const data = await response.json();
        setMovies(data.results);
    };

    const renderMovieItem = ({ item }: { item: Movie }) => (
        <TouchableOpacity style={stylesHome.movieItem} onPress={() => openMovieDetails(item)}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={stylesHome.posterImage} />
        </TouchableOpacity>
    );

    const openMovieDetails = (movie: Movie): void => {
        setSelectedMovie(movie);
        setIsDetailsOpen(true);
    };

    const closeMovieDetails = (): void => {
        setIsDetailsOpen(false);
    };

    const handleSearch = (text: string): void => {
        setSearchQuery(text);
        setShowHeading(false);
    };

    const addToList = (): void => {
        //TODO ADD TO LIST WHEN I LIKED MOVIE
        console.log('Add dans la list');
    }

    return (
        <View style={stylesHome.container}>
            <TextInput
                style={stylesHome.searchBar}
                placeholder="Search for a movie..."
                placeholderTextColor="white"
                value={searchQuery}
                onChangeText={handleSearch}
            />
            {showHeading && <Text style={stylesHome.heading}>Trending movies</Text>}
            <FlatList
                data={movies}
                renderItem={renderMovieItem}
                keyExtractor={(item: Movie) => item.id.toString()}
                numColumns={2}
                decelerationRate="fast"
            />
            <Modal visible={isDetailsOpen} animationType="slide">
                <View style={stylesHome.modalContainer}>
                    <DetailsMovie movie={selectedMovie} onClose={closeMovieDetails} onAddToList={addToList}/>
                </View>
            </Modal>
        </View>
    );
};

const stylesHome = StyleSheet.create({
    container:{
        flex: 1,
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#D81F26',
        marginBottom: 10,
    },
    searchBar: {
        height: 40,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 10,
        color: 'white',
    },
    movieItem: {
        width: '50%',
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    posterImage: {
        width: '80%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 5
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
