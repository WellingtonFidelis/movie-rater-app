import React, { useState, useContext, useEffect } from 'react'

import { apiMovieRater } from '../services/api-movie-rater';
import { TokenContext } from '../index';

export default function Auth() {

  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const {token, setToken} = useContext(TokenContext);

  const LoginClicked = () => {
    apiMovieRater.loginUser({
      username: userName,
      password: userPassword,
    })
      .then(response => setToken(response.token))
      .catch(error => console.log(error));
  }

  useEffect(() => {
    console.log(token);
    if (token) {
      window.location.href = '/movies';
    }
  }, [token])

  return (
    <div>
      <fieldset>
        <label htmlFor="inputUserName">User name</label>
        <input
          type="text"
          placeholder="Name"
          name="inputUserName"
          id="inputUserName"
          value={userName}
          onChange={event => setUserName(event.target.value)}
        />
        <label htmlFor="inputUserPassword">Password</label>
        <input
          type="password"
          placeholder="Description"
          name="inputUserPassword"
          id="inputUserPassword"
          value={userPassword}
          onChange={event => setUserPassword(event.target.value)}
        />
        <button onClick={LoginClicked} >Login</button>
      </fieldset>
    </div>
  )
}
