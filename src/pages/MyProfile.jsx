import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import Navigation from "../components/Navigation And Authentication/Navigation.jsx";
import Profile from '../components/Profile/Profile.jsx';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Carousel from "../components/Carousel/Carousel.jsx"

function MyProfile(props) {
  var selfId = props.selfId;
  var selfProfile = props.selfProfile;
  const types = ["Friends", "Favorite"]
  const dark = {"background": "radial-gradient(circle closest-side, transparent 10%, black), url(" + (Object.keys(selfProfile).length !== 0 ? (selfProfile.photos[0].photo_url) : null) + ")"};
  const light = {"background": "linear-gradient(rgba(255,255,255,.7), rgba(255,255,255,.7)), url(" + (Object.keys(selfProfile).length !== 0 ? (selfProfile.photos[0].photo_url) : null) + ")"};
  return(
    <div className="profile" style={props.mode ? dark : light}>
       {/* <div class="profile-nav"><Navigation /></div> */}
       <div class="profile-main">
        <Profile selfId={selfId} selfProfile={selfProfile} mode={props.mode}/>
        <div className="car-div">{types.map((t) => (
          <Carousel type={t} fav={selfProfile} fri={selfProfile}/>
        ))}</div>
       </div>
    </div>
  );
}

const AuthMyProfile = withAuthenticationRequired(MyProfile, {
  onRedirecting: () => (
    <div className="page-layout">
      loading...
    </div>
  ),
});

export default AuthMyProfile;