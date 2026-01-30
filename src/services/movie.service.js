import movieRepo from "../repositories/movie.repository.js";

const getPopularMovies = async (page) => {
    const data = await movieRepo.getPopularMovies(page);

    return {
        movies: data.results.map((m) => ({
            id: m.id,
            title: m.title,
            rating: m.vote_average,
            poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`
        })),

        page: data.page,
        totalPages: data.total_pages
    };
};

const searchMovies = async (keyword) => {
    const movies = await movieRepo.searchMovies(keyword);

    return movies.map((m) => ({
        id: m.id,
        title: m.title,
        releaseDate: m.release_date,
        rating: m.vote_average,
        poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`
    }));
};

const getMovieDetail = async (id) => {
    const movie = await movieRepo.getMovieDetail(id);

    if (!movie) {
        throw new Error("MOVIE NOT FOUND!");
    }

    const trailerUrl = await getMovieTrailer(id);
    const providers = await getMovieProviders(id);

    return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        trailerUrl,
        providers
    };
}

const getMovieCast = async (id) => {
    const cast = await movieRepo.getMovieCast(id);

    return cast.slice(0, 5).map((actor) => ({
        name: actor.name,
        character: actor.character,
        photo: actor.profile_path
            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
            : null
    }));
};

const getMovieTrailer = async (id) => {
    const videos = await movieRepo.getMovieTrailers(id);

    let trailer = videos.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
    );

    if (!trailer) {
        trailer = videos.find((v) => v.site === "YouTube");
    }

    if (!trailer) {
        return null;
    }

    return `https://www.youtube.com/embed/${trailer.key}`;
}

const getMovieProviders = async (id) => {
    const results = await movieRepo.getMovieProviders(id);

    const countryData = results.VN || results.US;

    if (!countryData) return null;

    return {
        link: countryData.link,
        flatrate: countryData.flatrate || [],
        rent: countryData.rent || [],
        buy: countryData.buy || []
    };
};

export default {
    getPopularMovies,
    searchMovies,
    getMovieDetail,
    getMovieCast,
    getMovieTrailer,
    getMovieProviders
};