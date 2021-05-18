import React from 'react';

export default function MovieForm(props) {

  let { movie } = props;

  return (
    <React.Fragment>
      {
        movie ? (
          <h1>{movie && movie.title} edit</h1>
        ) : null
      }
    </React.Fragment>
  );
};
