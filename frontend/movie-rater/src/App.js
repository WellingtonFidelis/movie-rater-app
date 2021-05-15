import { useState, useEffect } from 'react';

import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null)

  const movieClicked = movie => {
    setSelectedMovie(movie);
  }

  const loadMovie = movie => {
    setSelectedMovie(movie);
  }

  const editClicked = movie => {
    setEditedMovie(movie);
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Token 97621ce2baeb11f722db66ad0ecf1ce78898361b',
        'Authorization': 'Token 8f902b9af361c445af29f69aa1683ac4fb44061a'
      },
    })
      .then(response => response.json())
      .then(response => setMovies(response))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie & Rater</h1>
      </header>
      <div className="layout">
        <MovieList movies={movies} movieClicked={movieClicked} editClicked={editClicked} />
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />
        <MovieForm movie={editedMovie} />
      </div>
    </div>
  );
}

export default App;
