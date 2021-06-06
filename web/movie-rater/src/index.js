import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import Auth from './components/auth';
import { CookiesProvider } from 'react-cookie';

// export const TokenContext = createContext(null);

function Router() {

  // const [token, setToken] = useState('');

  return (
    <React.StrictMode>
      {/* <TokenContext.Provider value={{ token, setToken }}> */}
      <CookiesProvider>
        <BrowserRouter>
          <Route exact path="/" component={Auth} />
          <Route exact path="/movies" component={App} />
        </BrowserRouter>
      </CookiesProvider>  
      {/* </TokenContext.Provider> */}
    </React.StrictMode>
  );
}

ReactDOM.render(
  <Router />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
