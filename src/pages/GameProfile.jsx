import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import Navigation from "../components/Navigation And Authentication/Navigation.jsx";
import Profile from '../components/Profile/Profile.jsx';
import {useParams} from 'react-router-dom';
import Carousel from '../components/Carousel/Carousel.jsx'

const testgame = 'the-witcher-3-wild-hunt-blood-and-wine'

export default function GameProfile(props) {
  var selfId = props.selfId;
  var selfProfile = props.selfProfile;
  let { slug } = useParams();
  return(
    <div className="profile">
      <Navigation />
      <Profile slug={slug} selfId={selfId} selfProfile={selfProfile}/>
      {props['types']?.map((t) => (
        <Carousel type={t} fav={testgame}  />
      ))}
    </div>
  );

}