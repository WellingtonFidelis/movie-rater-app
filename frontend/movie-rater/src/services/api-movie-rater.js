// ubuntu note token
// const TOKEN = "97621ce2baeb11f722db66ad0ecf1ce78898361b";
// WSL token
// const TOKEN = "8f902b9af361c445af29f69aa1683ac4fb44061a";
// windows token
const TOKEN = "e29386be51ab221eaeee59a73b7d70a80428907d";

class apiMovieRater {

  static updatedMovie(movie_id, body) {
    return fetch(`http://127.0.0.1:8000/api/movies/${movie_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${TOKEN}`,
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json());
  }

  static createMovie(body) {
    return fetch(`http://127.0.0.1:8000/api/movies/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${TOKEN}`,
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json());
  }

  static deleteMovie(movie_id) {
    return fetch(`http://127.0.0.1:8000/api/movies/${movie_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${TOKEN}`,
      },
    });
  }
}

export { apiMovieRater };