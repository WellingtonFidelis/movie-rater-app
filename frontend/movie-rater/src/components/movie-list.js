import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function MovieList(props) {

  const movieClicked = movie => event => {
    props.movieClicked(movie)
  }

  const editClicked = movie => {
    props.editClicked(movie);
  }

  return (
    <div>
      {props.movies && props.movies.map((movie) => {
        return (
          <div key={movie.id} className="movie-item">
            <h2 onClick={movieClicked(movie)}>{movie.title}</h2>
            <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(movie)} />
            <FontAwesomeIcon icon={faTrash}/>
          </div>
        );
      })}
    </div>
  );
}