import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL} >
    <App />
  </Router>
    ,document.getElementById('root')
);

serviceWorker.register();
