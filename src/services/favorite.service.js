import favoriteRepo from "../repositories/favorite.repository.js";

const addFavorite = async (userId, movie) => {
    await favoriteRepo.addFavorite(userId, movie);
};

const getFavorites = async (userId) => {
    return await favoriteRepo.getFavorites(userId);
};

export default {
    addFavorite,
    getFavorites
}