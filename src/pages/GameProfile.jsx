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
  var selfId = props.selfId;
  var selfProfile = props.selfProfile;
  let { slug } = useParams();
  const [gameProfile, setGameProfile] = useState(undefined);
  console.log(gameProfile, "game profile");
  return(
    <div className="profile">{console.log(props, " props")}
      <Navigation />
      <Profile slug={slug} selfId={selfId} selfProfile={selfProfile} isAuthenticated={props.isAuthenticated} setGameProfile={setGameProfile}/>
      {props['types']?.map((t) => (

        <Carousel type={t} fav={gameProfile}  />
      ))}
    </div>
  );

}