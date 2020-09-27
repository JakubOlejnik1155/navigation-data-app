import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import {LoginProvider} from "./js/ContextLoginApi";

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL} >
      <LoginProvider>
        <App />
      </LoginProvider>
  </Router>
    ,document.getElementById('root')
);

serviceWorker.register();
