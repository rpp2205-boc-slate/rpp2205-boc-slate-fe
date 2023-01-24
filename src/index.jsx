import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import {BrowserRouter} from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider>
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>

);