import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function MovieDetails(props) {
  let { movie } = props;
  const [highlighted, setHighlighted] = useState(-1);

  const highlightRate = high => event => {
    setHighlighted(high);
  }

  const rateClicked = rate => event => {
    fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/rate_movie/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Token 97621ce2baeb11f722db66ad0ecf1ce78898361b',
        'Authorization': 'Token 8f902b9af361c445af29f69aa1683ac4fb44061a'
      },
      body: JSON.stringify({
        stars: rate + 1,
      }),
    })
      .then(() => getDetails())
      .catch(error => console.log(error));
  }

  const getDetails = () => {
    fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Token 97621ce2baeb11f722db66ad0ecf1ce78898361b',
        'Authorization': 'Token 8f902b9af361c445af29f69aa1683ac4fb44061a'
      }
    })
      .then(response => response.json())
      .then(response => props.updateMovie(response))
      .catch(error => console.log(error));
  }

  return (
    <React.Fragment>
      {movie ? (
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          <FontAwesomeIcon icon={faStar} className={movie.avg_rating > 0 ? 'orange' : ''} />
          <FontAwesomeIcon icon={faStar} className={movie.avg_rating > 1 ? 'orange' : ''} />
          <FontAwesomeIcon icon={faStar} className={movie.avg_rating > 2 ? 'orange' : ''} />
          <FontAwesomeIcon icon={faStar} className={movie.avg_rating > 3 ? 'orange' : ''} />
          <FontAwesomeIcon icon={faStar} className={movie.avg_rating > 4 ? 'orange' : ''} />
          ({movie.no_of_ratings})
          <div className="rate-container">
            <h2>Rate it</h2>
            {
              [...Array(5)].map((element, index) => {
                return <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className={highlighted > index - 1 ? 'purple' : ''}
                  onMouseEnter={highlightRate(index)}
                  onMouseLeave={highlightRate(-1)}
                  onClick={rateClicked(index)}
                />
              })
            }
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}