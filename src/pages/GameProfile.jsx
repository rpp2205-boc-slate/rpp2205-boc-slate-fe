import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import Navigation from "../components/Navigation And Authentication/Navigation.jsx";
import Profile from '../components/Profile/Profile.jsx';
import {useParams} from 'react-router-dom';


export default function GameProfile(props) {
  console.log(props.isAuthenticated, 'gameprofile is auth')
  var selfId = props.selfId;
  var selfProfile = props.selfProfile;
  let { slug } = useParams();
  return(
    <div className="profile">
      <Navigation />
      <Profile slug={slug} selfId={selfId} selfProfile={selfProfile} isAuthenticated={props.isAuthenticated}/>
    </div>
  );

}