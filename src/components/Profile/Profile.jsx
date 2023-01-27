import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import FriendRequestButton from './friend-request-button.jsx';


export default function Profile(props) {
  console.log(props.isAuthenticated);
  const [onlineStatus, setOnlineStatus] = useState('placeholderforonlinestatus');
  const [img, setImg] = useState('./img_avatar2.png');
  const [name, setName] = useState('placeholderforname');
  const [about, setAbout] = useState('placeholderforabout');
  const [friendRequest, setFriendRequest] = useState('placeholderforfriendrequest');
  useEffect(() => {
  })

  const onlineStatusDiv = props.gameId ? null : (
    <div class="onlineStatus">
      {(!onlineStatus) ? <div class="offline"><span class="logged-in">●</span>Offline</div> : <div class="online"><span class="logged-in">●</span>Online</div>}
    </div>
  );

  const nameDiv = (
    <div class="profile-name">{name}</div>
  );
  console.log('26here', props.gameId, props.userId === 'self');
  const friendRequestButtonDiv = (props.gameId || props.userId === 'self') ? null : (
    <div class="friendRequest">
      <FriendRequestButton friendRequest={props.friendRequest} userId={props.userId} />
    </div>
  );

  const likeGameDiv = (!props.gameId) ? null : (
    <div class="likeGame">
      <button>Like</button>
      <button>Add to Favourite</button>
    </div>
  );

  const editPhotoButtonDiv = (props.userId !== 'self') ? null : (
    <div class="editPhotoButton">
      <button>Edit Profile Photo</button>
    </div>
  );

  const editAboutDiv = (props.userId !== 'self') ? null : (<div class="editAbout">
    <button>Edit About</button>
  </div>);

  return (
    <div class="profile-for-all">
        <div class="leftColumn">
          <div class="profilePhoto">
            <img src={img} id="profilePhoto"/>
            {editPhotoButtonDiv}
          </div>
          {nameDiv}
          {onlineStatusDiv}
          {friendRequestButtonDiv}
          {likeGameDiv}
        </div>
        <div class="rightColumn">
          <div class="aboutMe">
            {editAboutDiv}
            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h4>
          </div>
        </div>
      </div>
  )

}