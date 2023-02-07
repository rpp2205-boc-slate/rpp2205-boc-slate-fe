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
import { createBrowserHistory } from "history";
import { Auth0Provider } from '@auth0/auth0-react';
import { Auth0ProviderWithNavigate } from "../auth0-provider-with-navigate";
import { useAuth0 } from "@auth0/auth0-react";
import Navigation from './Navigation And Authentication/Navigation.jsx';
//import ProfileButton from './Profile/profile-button.jsx';
import {ChatButton} from './Navigation And Authentication/chat-button.jsx';
import { AuthenticationGuard } from "../authentication-guard.js";



export const appHistory = createBrowserHistory();
export default function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState('667'); //667 is for tesing purpose only. userid will be passed after the login which sends a post request to server and return back an id for the current user.
  const [userProfile, setUserProfile] = useState({});
  const { isLoading } = useAuth0();
  console.log(userProfile, '33')
  useEffect(() => {
    if (isAuthenticated && (!user || (Object.keys(user).length !== 0))) {
      axios.post('/user/addinfo', user)
        .then(response => {
          setUserProfile(response.data);
          setUserId(response.data.user_id);
        })
        .catch(err => {
          console.error(err);
        })
    }
  }, [user, isAuthenticated]);
  const [chatOpen, setChatOpen] = useState(false);

  // const handleChatClick = (bool) => {
  //   console.log('clicked', bool);
  //   setChatOpen(bool);
  // }

  if (isLoading) {
    return (
      <div className="page-layout">
        loading...
      </div>
    );
  }
  const defaultData= {
    "fav_games": [
      {
          "game_id": "halo"
      },
      {
        "game_id": "victoria-2-heart-of-darkness"
      }
  ]
  }

  return(
    <>
        <Routes history={appHistory}>
          <Route path='/' element={<Home types={['Pop', 'Fri', 'Fav', 'Not']} data={defaultData}/>} />
            <Route path='/gameprofile/:slug' element={<GameProfile types={['Gam']} selfId={userId} selfProfile={userProfile}/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/results/:params' element={<SearchResult/>} />
            <Route path='/userlist' element={<UserList />} />
            <Route path='/userprofile/:userId' element={<AuthUserProfile selfId={userId} selfProfile={userProfile}/>} />
            <Route path='/myprofile' element={<AuthMyProfile selfId={userId} selfProfile={userProfile}/>} />
            {/* <Route path='/chat' element={<AuthenticationGuard component={Chat} />} /> */}
        </Routes>
        <Navigation setIsAuthenticated={setIsAuthenticated} setUser={setUser} testUser={user} setChatOpen={setChatOpen} chatOpen={chatOpen} />
        {/* <ProfileButton isAuthenticated={isAuthenticated}/> */}
        {/* <ChatButton setChatOpen={setChatOpen} chatOpen={chatOpen}/> */}
        <div className="chat">
          <Chat isAuthenticated={isAuthenticated} chatOpen={chatOpen}/>
        </div>
    </>
  );
}