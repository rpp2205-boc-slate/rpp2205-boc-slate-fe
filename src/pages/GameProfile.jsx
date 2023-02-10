import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import Navigation from "../components/Navigation And Authentication/Navigation.jsx";
import Profile from '../components/Profile/Profile.jsx';
import {useParams} from 'react-router-dom';
import Carousel from '../components/Carousel/Carousel.jsx';
import GameNav from "../components/Profile/GameNav.jsx";
import Divider from '@mui/material/Divider';

const testgame = '887'

export default function GameProfile(props) {
  var selfId = props.selfId;
  var selfProfile = props.selfProfile;
  let { slug } = useParams();
  const [gameProfile, setGameProfile] = useState(undefined);
  console.log(gameProfile, "yeuye")
  return(
    <div className="profile" style={{"background": "linear-gradient(rgba(255,255,255,.7), rgba(255,255,255,.7)), url(" + (gameProfile ? (gameProfile.background_image_additional || gameProfile.background_image) : null) + ")"}}>
      {/* <div class="profile-nav"><Navigation /></div> */}
      <div class="profile-main">
        <GameNav gameProfile={gameProfile}/>
        <Profile slug={slug} selfId={selfId} selfProfile={selfProfile} isAuthenticated={props.isAuthenticated} setGameProfile={setGameProfile}/>
        <Divider style={{"textColor":"gray"}}/>
        <div className="car-div">{props['types']?.map((t) => (
        <Carousel type={t} fav={gameProfile}  />
        ))}</div>
        </div>
    </div>
  );

}