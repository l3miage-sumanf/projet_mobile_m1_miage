export interface Movie {
    id: number;
    original_title: string;
    original_language: string;
    vote_average: number;
    backdrop_path: string;
    overview: string;
    release_date: string;
    poster_path: string;
}

export interface DetailsMovieProps {
    movie: Movie;
    onClose: () => void;
    addOrDeleteMovieToLiked: (movie: Movie) => void;
    isLikedScreen: boolean;
}

export interface UserInfoProps {
    disconnect: () => void;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}
