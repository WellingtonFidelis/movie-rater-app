// ubuntu note token
// const TOKEN = "97621ce2baeb11f722db66ad0ecf1ce78898361b";
// WSL token
// const TOKEN = "8f902b9af361c445af29f69aa1683ac4fb44061a";
// windows token
// const TOKEN = "e29386be51ab221eaeee59a73b7d70a80428907d";

const base_url = process.env.REACT_APP_MACHINE_IP

class apiMovieRater {
  static loginUser(body) {
    return fetch(`http://${base_url}:8000/auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json());
  }

  static registerUser(body) {
    return fetch(`http://${base_url}:8000/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json());
  }

  static getMovies(token) {
    return fetch(`http://${base_url}:8000/api/movies/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    })
      .then(response => response.json());
  }

  static updatedMovie(movie_id, body, token) {
    return fetch(`http://${base_url}:8000/api/movies/${movie_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json());
  }

  static createMovie(body, token) {
    return fetch(`http://${base_url}:8000/api/movies/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json());
  }

  static deleteMovie(movie_id, token) {
    return fetch(`http://${base_url}:8000/api/movies/${movie_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
  }
}

export { apiMovieRater };