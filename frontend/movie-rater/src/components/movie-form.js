import React, { useState } from 'react';

export default function MovieForm(props) {

  let { movie } = props;

  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);

  const updateClicked = () => {
    console.log('Update here');
  }

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
              <button
                onClick={updateClicked}
              >Update</button>
          </fieldset>
        ) : null
      }
    </React.Fragment>
  );
};
