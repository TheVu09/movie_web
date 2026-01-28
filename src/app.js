import express from "express";
import webRoutes from "./routes/web.route.js";
import apiRoutes from "./routes/api.route.js";
import favoriteRoutes from "./routes/favorite.route.js"
import authRoute from "./routes/auth.route.js";
import { requestLogger } from "./middlewares/logger.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import session from "express-session";

const app = express();

//view engine
app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//session
app.use(
    session({
        secret: process.env.SESSION_SECRET || "movie_secret_key",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }
    })
);

//middleware to pass username to all views
app.use((req, res, next) => {
    res.locals.username = req.session.username || null;
    next();
});

//middleware
app.use(requestLogger);

//route
app.use("/", webRoutes);
app.use("/api", apiRoutes);
app.use(authRoute);
app.use(favoriteRoutes);

//404 error
app.use((req, res) => {
    res.status(404).render("404", {
        message: "Route not found "
    });
});

//errorhandler
app.use(errorHandler);

export default app;