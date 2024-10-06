module.exports = (res, error, message = "Internal server errror") => {
    console.error(message, error);
    res.status(500).json({ message });
}