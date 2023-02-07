import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import Navigation from "../components/Navigation And Authentication/Navigation.jsx";
import Profile from '../components/Profile/Profile.jsx';
import {useParams} from 'react-router-dom';
import Carousel from '../components/Carousel/Carousel.jsx'

const testgame = '887'

export default function GameProfile(props) {
  console.log(props.isAuthenticated, 'gameprofile is auth')
  var selfId = props.selfId;
  var selfProfile = props.selfProfile;
  let { slug } = useParams();
  return(
    <div className="profile">{console.log(props, " props")}
      <Navigation />
      <Profile slug={slug} selfId={selfId} selfProfile={selfProfile} isAuthenticated={props.isAuthenticated}/>
      {props['types']?.map((t) => (

        <Carousel type={t} fav={testgame}  />
      ))}
    </div>
  );

}