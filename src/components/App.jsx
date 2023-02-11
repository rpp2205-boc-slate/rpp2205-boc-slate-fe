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
import AuthUserProfile from '../pages/UserProfile.jsx';
import AuthMyProfile from '../pages/MyProfile.jsx';
import Profile from './Profile/Profile.jsx';
import Chat from '../pages/Chat.jsx';
import FriendRequest from '../pages/FriendRequest.jsx';
import { createBrowserHistory } from "history";
import { Auth0Provider } from '@auth0/auth0-react';
import { Auth0ProviderWithNavigate } from "../auth0-provider-with-navigate";
import { useAuth0 } from "@auth0/auth0-react";
import Navigation from './Navigation And Authentication/Navigation.jsx';
//import ProfileButton from './Profile/profile-button.jsx';
import {ChatButton} from './Navigation And Authentication/chat-button.jsx';
import { AuthenticationGuard } from "../authentication-guard.js";
//import logo from '../../dist/gamercity_logo.png';
import logo from './Carousel/Testing/4.png';
import "./logo.css";



export const appHistory = createBrowserHistory();
export default function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState('667'); //667 is for tesing purpose only. userid will be passed after the login which sends a post request to server and return back an id for the current user.
  const [userProfile, setUserProfile] = useState({});
  const { isLoading } = useAuth0();
  const [chatOpen, setChatOpen] = useState(false);
  const [mode, setMode] = useState(false);

  // console.log('user info', userProfile)

  useEffect(() => {
    if (isAuthenticated && (!user || (Object.keys(user).length !== 0))) {
      axios.post('/user/addinfo', user)
        .then(response => {
          // console.log('app data login', response.data)
          setUserProfile(response.data);
          setUserId(response.data.user_id);
        })
        .catch(err => {
          console.error(err);
        })
    }
  }, [user, isAuthenticated]);


  if (isLoading) {
    return (
      <div className="page-layout">
        loading...
      </div>
    );
  }

  return(
    <div id="app">
        <Navigation setIsAuthenticated={setIsAuthenticated} setUser={setUser} testUser={user} setChatOpen={setChatOpen} chatOpen={chatOpen} switchMode={setMode}/>
        <Routes history={appHistory}>
          <Route path='/' element={<Home types={['Popular', "Top Rated", "New"]} mode={mode}/>} />
            <Route path='/gameprofile/:slug' element={<GameProfile types={['Games', 'DLC']} selfId={userId} selfProfile={userProfile} isAuthenticated={isAuthenticated}/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/results/:params' element={<SearchResult/>} />
            <Route path='/results/' element={<SearchResult/>} />
            <Route path='/userlist' element={<UserList />} />
            <Route path='/userprofile/:userId' element={<AuthUserProfile selfId={userId} selfProfile={userProfile}/>} />
            <Route path='/myprofile' element={<AuthMyProfile selfId={userId} selfProfile={userProfile}/>} />
            {/* <Route path='/chat' element={<AuthenticationGuard component={Chat} />} /> */}
        </Routes>

        {/* <Navigation setIsAuthenticated={setIsAuthenticated} setUser={setUser} testUser={user} setChatOpen={setChatOpen} chatOpen={chatOpen} />
        <img src={logo} alt="Logo" className="logo"/> */}

        {/* <ProfileButton isAuthenticated={isAuthenticated}/> */}
        {/* <ChatButton setChatOpen={setChatOpen} chatOpen={chatOpen}/> */}

        {chatOpen && (<div className="chat">
          <FriendRequest chatOpen={chatOpen} userId={userId} user={userProfile} dark={mode} />
          <Chat isAuthenticated={isAuthenticated} chatOpen={chatOpen} userId={userId} user={userProfile} dark={mode} />
        </div>)}

    </div>
  );
}