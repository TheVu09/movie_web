import { db } from "../config/db.js";

const findUserByUserName = async (username) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
    );

    return rows[0];
}

const createUser = async (username, password) => {
    const [result] = await db.query(
        "INSERT INTO users (username, password) VALUES (?,?)",
        [username, password]
    );

    return result.insertId;
}

export default {
    findUserByUserName,
    createUser
}