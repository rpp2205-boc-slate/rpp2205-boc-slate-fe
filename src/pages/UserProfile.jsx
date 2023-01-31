import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import Profile from '../components/Profile/Profile.jsx';
import {useParams} from 'react-router-dom';
import Navigation from "../components/Navigation And Authentication/Navigation.jsx";

export default function UserProfile(props) {
  let { userId } = useParams();
  return(
    <div>
    <Navigation />
    <Profile userId={userId}/>

    </div>
  );

}