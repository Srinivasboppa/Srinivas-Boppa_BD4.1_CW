const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

// Connect to SQLite database
(async () => {
  db = await open({ filename: "./BD4.1_CW database.sqlite", driver: sqlite3.Database });
  if (db) console.log("Connected to the SQLite database.");
})();


// YOUR ENPOINTS GO HERE
async function fetchAllMovies(){
  let query = "SELECT * FROM movies";
  let response = await db.all(query,[]);
  return response;
}
app.get("/movies",async (req,res)=>{
  let movies = await fetchAllMovies();
  res.status(200).json(movies);
})
//2
async function fetchMoviesByGenre(genre){
  let query = "SELECT * FROM movies WHERE genre = ?"
  let response = await db.all(query,[genre]);
  return {movies: response};
}
app.get("/movies/genre/:genre",async (req,res)=>{
  let genre = req.params.genre;
  let results = await fetchMoviesByGenre(genre);
  res.status(200).json(results);
})
//3
async function fetchMovieById(id){
  let query = "SELECT * FROM movies WHERE id = ?"
  let response = await db.all(query,[id]);
  return {movies: response};
}
app.get("/movies/details/:id",async (req,res)=>{
  let id = req.params.id;
  let results = await fetchMovieById(id);
   res.status(200).json(results);
})
//4
async function fetchMovieByYear(year){
  let query = "SELECT * FROM movies WHERE release_year = ?"
  let response = await db.all(query,[year]);
  return {movies: response};
}
app.get("/movies/release_year/:year",async (req,res)=>{
  let year = req.params.year;
  let results = await fetchMovieByYear(year);
   res.status(200).json(results);
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});