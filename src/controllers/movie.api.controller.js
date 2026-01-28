import movieService from "../services/movie.service.js";

export const getMovieApi = async (req, res) => {
    const keyword = req.query.q;

    const movies = [];
    if (keyword) {
        movies = await movieService.searchMovies(keyword);
    } else {
        movies = await movieService.getPopularMovies();
    }

    res.json({
        succes: true,
        data: movies
    });
};

export const getMovieDetailPage = async (req, res) => {
    try {
        const id = req.params.id;

        const movie = await movieService.getMovieDetail(id);

        res.render("movie-detail", { movie });
    } catch (err) {
        if (err.message === "MOVIE_NOT_FOUND") {
            return res.status(404).render("404", {
                message: "Movie not found "
            });
        }

        res.status(500).send("Server Error");
    }
};

export const getWatchMoviePage = async (req, res) => {
    try {
        const id = req.params.id;

        const movie = await movieService.getMovieDetail(id);

        res.render("watch", {movie});
    } catch (err) {
        res.status(404).render("404", {
            message: "Movie not found"
        });
    }
};
