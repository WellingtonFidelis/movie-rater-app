import { useState, useEffect } from 'react';

import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import './App.css';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token] = useCookies(['mr-token']);

  /*
  const movieClicked = movie => {
    setSelectedMovie(movie);
  }
  */
  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  }

  const editClicked = movie => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  }

  const updatedMovie = movie => {
    const newMovies = movies.map(mov => {
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    });

    setMovies(newMovies);
  }

  const newMovie = () => {
    setEditedMovie({ title: '', description: '' });
    setSelectedMovie(null);
  }

  const movieCreated = movie => {
    const newMovies = [...movies, movie];
    setMovies(newMovies);
  }

  const removeClicked = movie => {
    const newMovies = movies.filter(mov => mov.id !== movie.id);
    setMovies(newMovies);
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mr-token']}`,
      },
    })
      .then(response => response.json())
      .then(response => setMovies(response))
      .catch(error => console.log(error));
  }, [token]);

  useEffect(() => { 
    if (!token['mr-token']) window.location.href = '/'
  }, [token]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faFilm} />
          <span>Movie & Rater</span>          
        </h1>
      </header>
      <div className="layout">
        <div>
          <MovieList
            movies={movies}
            movieClicked={loadMovie}
            editClicked={editClicked}
            removeClicked={removeClicked}
          />
          <button onClick={newMovie}>New movie</button>
        </div>
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />
        {
          editedMovie ? (
            <MovieForm movie={editedMovie} updatedMovie={updatedMovie} movieCreated={movieCreated} />
          ) : null
        }
      </div>
    </div>
  );
}

export default App;
