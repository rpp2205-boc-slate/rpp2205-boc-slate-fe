import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import Profile from '../components/Profile/Profile.jsx';
import {useParams} from 'react-router-dom';
import Navigation from "../components/Navigation And Authentication/Navigation.jsx";
import { withAuthenticationRequired } from "@auth0/auth0-react";

function UserProfile(props) {
  var selfId = props.selfId;
  var selfProfile = props.selfProfile;
  let { userId } = useParams();
  return(
    <div>
    <Navigation />
    <Profile userId={userId} selfId={selfId} selfProfile={selfProfile}/>
    </div>
  );
}

const AuthUserProfile = withAuthenticationRequired(UserProfile, {
  onRedirecting: () => (
    <div className="page-layout">
      loading...
    </div>
  ),
});

// console.log('aa', AuthenticationGuard(UserProfile), UserProfile);
export default AuthUserProfile;