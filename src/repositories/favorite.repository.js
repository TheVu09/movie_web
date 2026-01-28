import { db } from "../config/db.js";

const addFavorite = async (userId, movie) => {
    const sql = `INSERT INTO favorites (user_id, movie_id, movie_title, movie_poster) VALUES (?,?,?,?)`;

    await db.query(sql, [
        userId,
        movie.id,
        movie.title,
        movie.poster
    ]);
};

const getFavorites = async (userId) => {
    const sql = `
        SELECT * FROM favorites
        WHERE user_id = ?
        ORDER BY created_at DESC
        `;

    const [rows] = await db.query(sql, [userId]);
    return rows;
}

export default {
    addFavorite,
    getFavorites
}