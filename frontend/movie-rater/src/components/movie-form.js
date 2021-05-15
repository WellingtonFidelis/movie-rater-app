import React from 'react';

export default function MovieForm(props) {
  return (
    <h1>{props.movie && props.movie.title} edit</h1>
  );
};
