import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Navbar } from 'react-bootstrap';
import Search from '../Search/SearchBar.jsx';
import { LoginButton } from './login-button.jsx';
import { LogoutButton } from './logout-button.jsx';
import { SignupButton } from './signup-button.jsx';
import { ChatButton } from './chat-button.jsx';
import { useState, useEffect } from "react";

import mainlogo from '../Carousel/Testing/2.png';
import { height } from '@mui/system';
import './navBar.css';





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
    <Navbar style={{ background: '#1b2838' }} variant="dark" expand="lg" fixed="top">
      <Container>
        <img src={mainlogo} style={{height: 80}}/>

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
                <Navbar.Brand><ChatButton setChatOpen={props.setChatOpen} chatOpen={props.chatOpen} /></Navbar.Brand>
                <Navbar.Brand><LogoutButton /></Navbar.Brand>
              </>
            )}
          </div>
      </Container>
    </Navbar>
    </>

  );




}

export default Navigation;