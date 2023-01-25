import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Search from '../Search/SearchBar.jsx';



function Navigation() {

  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Brand href="/myprofile">Profile</Navbar.Brand>
          <Search />
          <Navbar.Brand href="/login">Sign In</Navbar.Brand>
          <Navbar.Brand href="/signup">Sign Up</Navbar.Brand>
      </Container>
    </Navbar>
    </>

  );

}

export default Navigation;