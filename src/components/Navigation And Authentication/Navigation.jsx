import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Navbar } from 'react-bootstrap';
import Search from '../Search/SearchBar.jsx';
import { LoginButton } from './login-button.jsx';
import { LogoutButton } from './logout-button.jsx';
import { SignupButton } from './signup-button.jsx';
import { ChatButton } from './chat-button.jsx';
import { useState, useEffect } from "react";


function Navigation(props) {
  console.log("useAuth0 obj", useAuth0());
  var { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (props.setIsAuthenticated) {
      props.setIsAuthenticated(isAuthenticated);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 }

    if (props.setUser) {
      props.setUser(user);
    }
  });
  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          {isAuthenticated ? <Navbar.Brand href="/myprofile">Profile</Navbar.Brand> : null}
          <Search />
          <div className="nav-bar__buttons">
            {isAuthenticated === false && (
              <>
                <Navbar.Brand><SignupButton /></Navbar.Brand>
                <Navbar.Brand><LoginButton /></Navbar.Brand>
              </>
            )}
            {isAuthenticated && (
              <>
                <Navbar.Brand><LogoutButton /></Navbar.Brand>
                <Navbar.Brand><ChatButton setChatOpen={props.setChatOpen} chatOpen={props.chatOpen} /></Navbar.Brand>
              </>
            )}
          </div>
          {/* <Navbar.Brand href="/login">Sign In</Navbar.Brand>
          <Navbar.Brand href="/signup">Sign Up</Navbar.Brand> */}
      </Container>
    </Navbar>
    </>

  );

}

export default Navigation;