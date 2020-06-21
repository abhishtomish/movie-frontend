import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './components/Login';
import { CookiesProvider } from 'react-cookie'


const routing = (
  <Router>
    <CookiesProvider>
      <Route exact path="/" component={Login} />
      <Route exact path="/movies" component={App} />
    </CookiesProvider>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
