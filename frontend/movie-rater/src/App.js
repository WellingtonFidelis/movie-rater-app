import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 97621ce2baeb11f722db66ad0ecf1ce78898361b'
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
        <div>
          {movies.map((movie) => {
            return (
              <h2 key={movie.id}>{movie.title}</h2>
            );
          })}
        </div>
        <div>Movie details</div>
      </div>
    </div>
  );
}

export default App;
