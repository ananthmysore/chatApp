import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './serviceWorker';
import history from './history';

ReactDOM.render(
  <BrowserRouter history={history}>
      <App />
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();