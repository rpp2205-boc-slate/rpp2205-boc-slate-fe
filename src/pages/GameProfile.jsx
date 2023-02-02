import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import Navigation from "../components/Navigation And Authentication/Navigation.jsx";
import Profile from '../components/Profile/Profile.jsx';
import {useParams} from 'react-router-dom';


export default function GameProfile(props) {
  let { slug } = useParams();
  return(
    <div class="profile">
      <Navigation />
      <Profile slug={slug} />
    </div>
  );

}