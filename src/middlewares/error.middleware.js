export const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.message);

    res.status(500).render("404", {
        message: "Something went wrong "
    });
};
