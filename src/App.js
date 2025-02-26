import "./App.css";
import api from "./API/axiosConfig.js";
import { useState, useEffect } from "react";
import Layout from "./components/Layout.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/home/Home.js";
import Header from "./components/header/Header.js";
import Trailer from "./components/trailer/Trailer.js";
import Reviews from "./components/reviews/Reviews.js";

function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      console.log(response.data);
      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviews);
    } catch (error) {}
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <BrowserRouter basename="/movie-gold-v1">
      <div className="App">
        <Header></Header>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home movies={movies} />}></Route>
            <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
            <Route
              path="/Reviews/:movieId"
              element={
                <Reviews
                  getMovieData={getMovieData}
                  movie={movie}
                  reviews={reviews}
                  setReviews={setReviews}
                />
              }
            ></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
