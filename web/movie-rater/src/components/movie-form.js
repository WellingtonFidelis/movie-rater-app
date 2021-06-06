import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { apiMovieRater } from '../services/api-movie-rater';

export default function MovieForm(props) {

  let { movie } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [token] = useCookies(['mr-token']);

  const updateClicked = () => {
    apiMovieRater.updatedMovie(movie.id, { title, description }, token['mr-token'])
      .then(response => props.updatedMovie(response))
      .catch(error => console.log(error));
  }

  const createClicked = () => {
    apiMovieRater.createMovie({ title, description }, token['mr-token'])
      .then(response => props.movieCreated(response))
      .catch(error => console.log(error));
  }

  const isDisabled = title.length === 0 || description.length === 0;

  useEffect(() => {
    setTitle(movie.title);
    setDescription(movie.description);
  }, [movie])

  return (
    <React.Fragment>
      {
        movie ? (
          <fieldset className="form-container">
            <label htmlFor="inputTitle">Title</label>
            <input
              type="text"
              placeholder="Title"
              name="inputTitle"
              id="inputTitle"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
            <label htmlFor="inputDescription">Description</label>
            <textarea
              type="text"
              placeholder="Description"
              name="inputDescription"
              id="inputDescription"
              cols="50"
              rows="5"
              value={description}
              onChange={event => setDescription(event.target.value)}
            ></textarea>
            {
              movie.id ? (
                <button onClick={updateClicked} disabled={isDisabled}>Update</button>
              ) : (
                <button onClick={createClicked} disabled={isDisabled}>Create</button>
              )
            }
          </fieldset>
        ) : null
      }
    </React.Fragment>
  );
};
