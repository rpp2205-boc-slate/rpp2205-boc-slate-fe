import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import Navigation from "../components/Navigation And Authentication/Navigation.jsx";
import Profile from '../components/Profile/Profile.jsx';
import { withAuthenticationRequired } from "@auth0/auth0-react";

function MyProfile(props) {
  var selfId = props.selfId;
  var selfProfile = props.selfProfile;
  return(
    <div className="profile">
      <Navigation />
      <Profile selfId={selfId} selfProfile={selfProfile}/>
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