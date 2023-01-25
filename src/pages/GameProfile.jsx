import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import Navigation from "../components/Navigation And Authentication/Navigation.jsx";
import Profile from '../components/Profile/Profile.jsx';


export default function GameProfile(props) {

  return(
    <div class="profile">
      <Navigation />
      <Profile gameId={'self'} />
    </div>
  );

}