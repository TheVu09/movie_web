import favoriteService from "../services/favorite.service.js";
import movieService from "../services/movie.service.js";


export const addToFavorite = async (req, res) => {
    const userId = req.session.userId;
    const movieId = req.params.id;

    const movie = await movieService.getMovieDetail(movieId);

    await favoriteService.addFavorite(userId, movie);

    res.redirect("/favorites");
};

export const getFavoritesPage = async (req, res) => {
    const userId = req.session.userId;
    const favorites = await favoriteService.getFavorites(userId);

    res.render("favorites", { favorites });
};