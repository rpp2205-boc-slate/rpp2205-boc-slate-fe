import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Navbar } from 'react-bootstrap';
import Search from '../Search/SearchBar.jsx';
import { LoginButton } from './login-button.jsx';
import { LogoutButton } from './logout-button.jsx';
import { SignupButton } from './signup-button.jsx';
import { useState, useEffect } from "react";
import ChatApp from '../../pages/Chat.jsx';
import axios from 'axios';


function Navigation(props) {
  var { isAuthenticated, user } = useAuth0();
  console.log(user, 'userinfo');
  console.log(isAuthenticated)

  useEffect(() => {
    if (props.setIsAuthenticated) {
      props.setIsAuthenticated(isAuthenticated);
      axios.post('/users',{user})
      .then(response => {
        console.log('posted!')
      })
      .catch(err => console.log(err));
    } 
  });
  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Brand href="/myprofile">Profile</Navbar.Brand>
          <Search />
          <Navbar.Brand href="/chat">Chat App</Navbar.Brand>
          <div className="nav-bar__buttons">
            {isAuthenticated === false && (
              <>
                <SignupButton  className="signUpButton"/>
                <LoginButton  className="signUpButton"/>
              </>
            )}
            {isAuthenticated && (
              <>
                <LogoutButton />
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