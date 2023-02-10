import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Navbar } from 'react-bootstrap';
import Search from '../Search/SearchBar.jsx';
import { LoginButton } from './login-button.jsx';
import { LogoutButton } from './logout-button.jsx';
import { SignupButton } from './signup-button.jsx';
import { ChatButton } from './chat-button.jsx';
import { useState, useEffect } from "react";
import { ThemeContext, themes } from '../../themeContext.jsx';
import { NavLink } from 'react-router-dom';
import mainlogo from './gamerCity.png';
//import './navBar.css';





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
    <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
      <Container>
        <ThemeContext.Consumer>
          {({changeTheme}) => (
             <button  color="link" onClick={() => {props.setDark(!props.dark);
            changeTheme(dark ? themes.light : themes.dark);
             }}>
                <i className={props.dark ? 'fas fa-sun' : 'fas fa-moon'}></i>
                <span className="d-lg-none d-md-block">Switch mode</span>
             </button>
          )}
        </ThemeContext.Consumer>
      
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
  // return (
  //   <nav className="navbar">
  //     <div className="container">
  //       <div className="logo">
  //         <img src={mainlogo} />
  //       </div>
  //       <div className="nav-elements">
  //         <ul>
  //           <li>
  //             <NavLink to="/">Home</NavLink>
  //           </li>
  //           <li>
  //           {isAuthenticated ? <NavLink to="/myprofile">Profile</NavLink> : null}
  //           </li>
  //           <li>
  //             <Search />
  //           </li>
  //         </ul>
  //         </div>
  //         <div className="nav-bar__buttons">
  //           {isAuthenticated === false && (
  //             <>
  //               <NavLink><SignupButton /></NavLink>
  //                <NavLink><LoginButton /></NavLink>
  //              </>
  //            )}
  //           {isAuthenticated && (
  //              <>
  //              <ChatButton setChatOpen={props.setChatOpen} chatOpen={props.chatOpen} />
  //                <NavLink><LogoutButton /></NavLink>
  //              </>
  //            )}
  //          </div>
  //     </div>
  //   </nav>
  // );
  // return (
  //   <div className="topnav">
  //     <a  href="/">Home</a>
  //     {isAuthenticated ? <a href="/myprofile">Profile</a> : null}
  //     <a><Search /></a>
  //     <div className="navbarbuttons">
  //          {isAuthenticated === false && (
  //              <>
  //                <SignupButton />
  //                <LoginButton />
  //               </>
  //             )}
  //            {isAuthenticated && (
  //               <>
  //               <ChatButton setChatOpen={props.setChatOpen} chatOpen={props.chatOpen} />
  //                 <LogoutButton />
  //               </>
  //             )}
  //           </div>

  //   </div>
  // )

  
}

export default Navigation;