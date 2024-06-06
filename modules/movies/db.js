const mongoose = require("mongoose");

const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

//schema setup
const MovieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    rating: String
});
const Movie = mongoose.model("Movie", MovieSchema); 

//mongoDb functions
async function connect() {
    await mongoose.connect(dbUrl);
}

async function getMovies() {
    await connect();
    return await Movie.find({});
}

async function initializeMovies() {
    await connect();
    const Movies = [
        {
            title: "Hangover 1",
            year: 2013,
            rating: A
        },
        {
            title: "My big fat greek wedding 3",
            year: 2023,
            rating: B
        }
    ];
    await Movie.insertMany(Movies);
}

async function updateTitle(oldTitle, newTitle) {
    await connect();
    await Movie.updateOne(
        {title: oldTitle},
        {title: newTitle}
    );
}
//delete movie based on rating
async function deleteMovie(rating) {
    await connect();
    await Movie.deleteMany({ rating: 'F' });
}

module.exports = {
    getMovies,
    initializeMovies,
    updateTitle,
    deleteMovie
}