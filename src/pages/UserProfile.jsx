import React from "react";
import { useState, useEffect } from "react";
// import { StreamChat } from 'stream-chat';
import axios from "axios";
import Profile from '../components/Profile/Profile.jsx';
import {useParams} from 'react-router-dom';
import Navigation from "../components/Navigation And Authentication/Navigation.jsx";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Carousel from '../components/Carousel/Carousel.jsx';

function UserProfile(props) {
  var selfId = props.selfId;
  var selfProfile = props.selfProfile;
  let { userId } = useParams();
  const [userProfile, setUserProfile] = useState(undefined);

  // if (selfId === Number(userId)) {
  //   const navigate = useNavigate();
  //   navigate("/myprofile");
  // }
  const types = ["Friends", "Favorite"]
  return(
    <div>
    <Navigation />
    <Profile userId={userId} selfId={selfId} selfProfile={selfProfile} setUserProfile={setUserProfile}/>{console.log(userProfile)}
    <div className="car-div">{types.map((t) => (
        <Carousel type={t} fav={userProfile} fri={userProfile}/>
      ))}</div>
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
export default AuthUserProfile;