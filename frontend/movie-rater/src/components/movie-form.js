import React, { useState, useEffect } from 'react';
import { apiMovieRater } from '../services/api-movie-rater';

export default function MovieForm(props) {

  let { movie } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const updateClicked = () => {
    apiMovieRater.updatedMovie(movie.id, { title, description })
      .then(response => props.updatedMovie(response))
      .catch(error => console.log(error));
  }

  const createClicked = () => {
    apiMovieRater.createMovie({ title, description })
      .then(response => props.movieCreated(response))
      .catch(error => console.log(error));
  }

  useEffect(() => {
    setTitle(movie.title);
    setDescription(movie.description);
  }, [movie])

  return (
    <React.Fragment>
      {
        movie ? (
          <fieldset>
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
                <button onClick={updateClicked} >Update</button>
              ) : (
                <button onClick={createClicked} >Create</button>
              )
            }
          </fieldset>
        ) : null
      }
    </React.Fragment>
  );
};
