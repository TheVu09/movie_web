import axios from "axios";
import { env } from "../config/env.js";

const getPopularMovies = async (page = 1) => {
    const url = `${env.tmdbBaseUrl}/movie/popular`;

    const response = await axios.get(url, {
        params: {
            api_key: env.tmdbApiKey,
            language: "en-US",
            page
        }
    });

    return response.data;
};

const searchMovies = async (keyword) => {
    const url = `${env.tmdbBaseUrl}/search/movie`;

    const response = await axios.get(url, {
        params: {
            api_key: env.tmdbApiKey,
            query: keyword,
            language: "en-US"
        }
    });

    return response.data.results;
}

const getMovieDetail = async (id) => {
    try {
        const url = `${env.tmdbBaseUrl}/movie/${id}`;

        const response = await axios.get(url, {
            params: {
                api_key: env.tmdbApiKey,
                language: "en-US"
            }
        });

        return response.data;
    } catch (error) {
        return null;
    }
}

const getMovieCast = async (id) => {
    const url = `${env.tmdbBaseUrl}/movie/${id}/credits`;

    const response = await axios.get(url, {
        params: {
            api_key: env.tmdbApiKey
        }
    });

    return response.data.cast;
}

const getMovieTrailers = async(id) => {
    try {
        const url = `${env.tmdbBaseUrl}/movie/${id}/videos`;

        const response = await axios.get(url, {
            params: {
                api_key: env.tmdbApiKey,
                language: "en-US"
            }
        });

        return response.data.results;
    } catch (error) {
        return [];
    }
};

const getMovieProviders = async (id) => {
    try {
        const url = `${env.tmdbBaseUrl}/movie/${id}/watch/providers`;

        const response = await axios.get(url, {
            params: {
                api_key: env.tmdbApiKey
            }
        });

        return response.data.results;
    } catch (err) {
        return {};
    }
};

export default {
    getPopularMovies,
    searchMovies,
    getMovieDetail,
    getMovieCast,
    getMovieTrailers,
    getMovieProviders
};