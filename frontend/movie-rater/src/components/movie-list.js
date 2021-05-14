import React from 'react';

export default function MovieList(props) {

  const movieClicked = movie => event => {
    props.movieClicked(movie)
  }

  return (
    <div>
      {props.movies && props.movies.map((movie) => {
        return (
          <div key={movie.id}>
            <h2 onClick={movieClicked(movie)}>{movie.title}</h2>
          </div>
        );
      })}
    </div>
  );
}