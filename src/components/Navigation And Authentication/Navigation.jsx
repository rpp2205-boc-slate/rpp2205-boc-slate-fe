import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Navbar } from 'react-bootstrap';
import Search from '../Search/SearchBar.jsx';
import { LoginButton } from './login-button.jsx';
import { LogoutButton } from './logout-button.jsx';
import { SignupButton } from './signup-button.jsx';
import { ChatButton } from './chat-button.jsx';
import { useState, useEffect } from "react";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';


import mainlogo from '../Carousel/Testing/2.png';
import { height } from '@mui/system';
import './navBar.css';





function Navigation(props) {
  var { isAuthenticated, user } = useAuth0();
  const [checked, setChecked] = useState(true);

  const switchBackgroundMode = (event) => {
    setChecked(event.target.checked);
    props.switchMode(v => !v)
  };


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
        <div id="logo-gc">
          <img src={mainlogo} style={{height: 80}}/>
          <a className="navbar-brand" onClick={()=> window.location.href ='/'}>GAMERCITY</a>
        </div>



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
            <FormControlLabel sx={{color: "white", marginLeft: "50px", marginRight: "-50px"}} control={<Switch color="default" checked={checked} onChange={switchBackgroundMode} />} label={!checked ? "Dark Mode" : "Light Mode"} />

          </div>
      </Container>
    </Navbar>
    </>

  );




}

export default Navigation;