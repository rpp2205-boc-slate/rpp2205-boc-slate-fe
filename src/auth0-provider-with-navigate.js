import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";
//require('dotenv').config();

export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  const domain ='dev-zuva2dgjg4ne0ell.us.auth0.com';
  const clientId = 'VoctfHB57z89Ce6kfKGVY0xBWd6r3nHu';
  const redirectUri = 'http://localhost:3000';

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};