import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Navbar } from 'react-bootstrap';
import Search from '../Search/SearchBar.jsx';
import { LoginButton } from './login-button.jsx';
import { LogoutButton } from './logout-button.jsx';
import { SignupButton } from './signup-button.jsx';
import { ChatButton } from './chat-button.jsx';
import { useState, useEffect } from "react";
import axios from 'axios';


function Navigation(props) {
  var { isAuthenticated, user } = useAuth0();
  useEffect(() => {
    if (props.setIsAuthenticated) {
      props.setIsAuthenticated(isAuthenticated);

      axios.post('/users', {user})
      .then(response => {
        console.log('posted')
      })
      .catch(err => console.log(err));
    }
    };

    if (props.setUser) {
      props.setUser(user);
    }
  });
  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Brand href="/myprofile">Profile</Navbar.Brand>
          <Search />
          <div className="nav-bar__buttons">
            {isAuthenticated === false && (
              <>
                <SignupButton />
                <LoginButton />
              </>
            )}
            {isAuthenticated && (
              <>
                <LogoutButton />
                <ChatButton />
              </>
            )}
          </div>
          
      </Container>
    </Navbar>
    </>

  );

}

export default Navigation;