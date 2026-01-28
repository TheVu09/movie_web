import authService from "../services/auth.service.js";

export const getRegisterPage = (req, res) => {
    res.render("register");
};

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await authService.registerUser(username, password);

        req.session.userId = user.id;
        req.session.username = user.username;

        res.redirect("/");
    } catch (err) {
        res.status(400).send(err.message);
    }
};

export const getLoginPage = (req, res) => {
    res.render("login");
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await authService.loginUser(username, password);

        req.session.userId = user.id;
        req.session.username = user.username;

        res.redirect("/");
    } catch (err) {
        res.status(400).send("Login failed");
    }
};

export const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};