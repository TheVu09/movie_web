import movieService from "../services/movie.service.js";

export const getMoviePage = async (req, res) => {
    const page = Number(req.query.page) || 1;

    const data = await movieService.getPopularMovies(page);


    res.render("movies", {
        movies: data.movies,
        page: data.page,
        totalPages: data.totalPages,
        keyword: ""
    });
};

export const getMovieDetailPage = async (req, res) => {
    try {
        const id = req.params.id;

        const movie = await movieService.getMovieDetail(id);
        const cast = await movieService.getMovieCast(id);

        res.render("movie-detail", { movie, cast });
    } catch (err) {
        if (err.message === "MOVIE_NOT_FOUND") {
            return res.status(404).render("404", {
                message: "Movie not found 🎬"
            });
        }

        res.status(500).send("Server Error");
    }
};

export const getWatchMoviePage = async (req, res) => {
    try {
        const id = req.params.id;

        const movie = await movieService.getMovieDetail(id);

        res.render("watch", { movie });
    } catch (err) {
        res.status(404).render("404", {
            message: "Movie not found"
        });
    }
};

