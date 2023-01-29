import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import GameProfile from '../pages/GameProfile.jsx';
import Login from '../pages/Login.jsx';
import SignUp from '../pages/SignUp.jsx';
import SearchResult from '../pages/SearchResult.jsx';
import UserList from '../pages/UserList.jsx';
import UserProfile from '../pages/UserProfile.jsx';
import MyProfile from '../pages/MyProfile.jsx';
import Chat from '../pages/Chat.jsx';
import { createBrowserHistory } from "history";
import { Auth0Provider } from '@auth0/auth0-react';
import { Auth0ProviderWithNavigate } from "../auth0-provider-with-navigate";
import { useAuth0 } from "@auth0/auth0-react";
import Navigation from './Navigation And Authentication/Navigation.jsx';
import ProfileButton from './Profile/profile-button.jsx';
import { AuthenticationGuard } from "../authentication-guard.js";
// import { LoginButton } from './Navigation And Authentication/login-button.jsx';
// import { LogoutButton } from './Navigation And Authentication/logout-button.jsx';
// import { SignupButton } from './Navigation And Authentication/signup-button.jsx';


export const appHistory = createBrowserHistory();
export default function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  console.log('app', isAuthenticated, setIsAuthenticated);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState('667'); //667 is for tesing purpose only. userid will be passed after the login which sends a post request to server and return back an id for the current user.
  const { isLoading } = useAuth0();
  useEffect(() => {
    //axios.post() post a new user if not existing to the db, return the user id in response, then pass the user id to state, then pass it to
  })
  const [chatOpen, setChatOpen] = useState(null);
  const handleToggle = () => {
    console.log('handle toggle', chatOpen)
    setChatOpen((bool) => !bool);
  };
  if (isLoading) {
    return (
      <div className="page-layout">
        loading...
      </div>
    );
  }
  return(
    <>
        <Routes history={appHistory}>
          <Route path='/' element={<Home />} />
            <Route path='/gameprofile/:slug' element={<GameProfile/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/results:params' element={<SearchResult />} />
            <Route path='/userlist' element={<UserList />} />
            <Route path='/userprofile/:userId' element={<AuthenticationGuard component={UserProfile} />} />
            <Route path='/myprofile' element={<AuthenticationGuard component={MyProfile} />} />
            <Route path='/chat' element={<AuthenticationGuard component={Chat} />} />
        </Routes>
        <Navigation setIsAuthenticated={setIsAuthenticated} setUser={setUser} testUser={user} onClick={handleToggle} setChatOpen={setChatOpen}/>
        <ProfileButton isAuthenticated={isAuthenticated}/>
        <div class="hidden" style={{display: 'none'}}>
          <MyProfile userId={userId}/>
        </div>
        <Chat isAuthenticated={isAuthenticated} chatOpen={chatOpen}/>
    </>
  );

}