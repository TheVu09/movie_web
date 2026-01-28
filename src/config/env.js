import dotenv from "dotenv";

dotenv.config();

export const env = {
    port: process.env.PORT || 3000,
    tmdbApiKey: process.env.TMDB_API_KEY,
    tmdbBaseUrl: process.env.TMDB_BASE_URL
};
