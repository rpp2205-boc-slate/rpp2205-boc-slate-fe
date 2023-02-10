import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import {BrowserRouter} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";
import ThemeContextWrapper from './themeContextWrapper.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeContextWrapper>
     <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
  </ThemeContextWrapper>
 
);