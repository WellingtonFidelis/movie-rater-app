import React from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {apiMovieRater} from '../services/api-movie-rater';
import { useCookies } from 'react-cookie';

export default function MovieList(props) {

  const [token] = useCookies(['mr-token']);

  const movieClicked = movie => event => {
    props.movieClicked(movie)
  }

  const editClicked = movie => {
    props.editClicked(movie);
  }

  const removeClicked = movie => {
    apiMovieRater.deleteMovie(movie.id, token['mr-token'])
      .then(()=> props.removeClicked(movie))
      .catch((error)=>{console.log(error)});
  }

  return (
    <div>
      {props.movies && props.movies.map((movie) => {
        return (
          <div key={movie.id} className="movie-item">
            <h2 onClick={movieClicked(movie)}>{movie.title}</h2>
            <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(movie)} />
            <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(movie)} />
          </div>
        );
      })}
    </div>
  );
}