import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from '@mui/material/Button';


export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
        //if you were to deploy your React application to production, you need to add the production logout URL to the "Allowed Logout URLs" list and ensure that Auth0 redirects your users to that production URL and not localhost.
      },
    });
  };

  return (
    // <Button sx={{ color: 'white'}} variant="text" className="button__logout" onClick={handleLogout}>
    //   Log Out
    // </Button>
    <div className="button__logout" onClick={handleLogout}>Log Out</div>
  );
};