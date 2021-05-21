import React, { useState, useEffect } from 'react'

import { apiMovieRater } from '../services/api-movie-rater';
//import { TokenContext } from '../index';
import { useCookies } from 'react-cookie';

export default function Auth() {

  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [token, setToken] = useCookies(['mr-token']);
  const [isLoginView, setIsLoginView] = useState(true);

  const LoginClicked = () => {
    apiMovieRater.loginUser({
      username: userName,
      password: userPassword,
    })
      .then(response => setToken('mr-token', response.token))
      .catch(error => console.log(error));
  }

  const registerClicked = () => {
    apiMovieRater.registerUser({
      username: userName,
      password: userPassword,
    })
      .then(() => LoginClicked())
      .catch(error => console.log(error));
  }

  const isDisabled = userName.length === 0 || userPassword.length === 0;

  useEffect(() => {
    // console.log(token);
    if (token['mr-token']) { window.location.href = '/movies'; }
  }, [token])

  return (
    <div className="App">
      <header className="App-header">
        {
          isLoginView ? (
            <h1>Login</h1>
          ) : (
            <h1>Register</h1>
          )
        }
      </header>
      <fieldset className="login-container">
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
          placeholder="Password"
          name="inputUserPassword"
          id="inputUserPassword"
          value={userPassword}
          onChange={event => setUserPassword(event.target.value)}
        />
        {
          isLoginView ? (
            <button onClick={LoginClicked} disabled={isDisabled}>Login</button>
          ) : (
            <button onClick={registerClicked} disabled={isDisabled} >Register</button>
          )
        }
        {
          isLoginView ? (
            <p onClick={() => setIsLoginView(false)}>You don't have an account? Register here!</p>
          ) : (
            <p onClick={() => setIsLoginView(true)}>You already have login? Login here!</p>
          )
        }
      </fieldset>
    </div>
  )
}
