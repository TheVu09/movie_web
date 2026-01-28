import userRepo from "../repositories/user.repository.js";
import bcrypt from "bcrypt";

const registerUser = async (username, password) => {
    const existing = await userRepo.findUserByUserName(username);

    if (existing) {
        throw new Error("USER ALREADY EXISTS");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await userRepo.createUser(username, hashedPassword);

    return {
        id: userId,
        username
    };
};

const loginUser = async (username, password) => {
    const user = await userRepo.findUserByUserName(username);

    if (!user) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error("INVALID_CREDENTIALS");
    }

    return {
        id: user.id,
        username: user.username
    };
};

export default {
    registerUser,
    loginUser
}

