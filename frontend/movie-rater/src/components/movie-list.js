import React, { useEffect, useState } from 'react';

export default function MovieList(props) {

  return (
    <div>
      {props.movies && props.movies.map((movie) => {
        return (
          <h2 key={movie.id}>{movie.title}</h2>
        );
      })}
    </div>
  );
}