import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import FriendRequestButtons from './friend-request-buttons.jsx';
import AddToLikeButton from './add-to-like-button.jsx';
import EditAboutButton from './edit-about-button.jsx';
import EditProfileButton from './edit-profile-button.jsx';
import { getProfile } from './helperFunctions.js';


export default function Profile(props) {
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [id, setId] = useState('');
  const [website, setWebsite] = useState(undefined);
  const [friendRequest, setFriendRequest] = useState('');
  const [profileObj, setProfileObj] = useState({});
  const [img, setImg] = useState('');
  const changeImage = (url) => {
    setImg(url);
  }
  useEffect(() => {
    setImg(props.selfProfile.photos ? props.selfProfile.photos[0].photo_url : null);
  }, [props.selfProfile]);

  useEffect(() => {
    if (props.userId || props.slug) {
      var type = props.userId ? 'user' : 'game';
      var identifier = props.userId || props.slug;
      getProfile(type, identifier, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          setProfileObj(result);
        }
      })
    }
  }, [props.userId, props.slug]);

  if (props.slug) {
    if (Object.keys(profileObj).length === 0) {
      return null;
    }
    return (
      <>
        <div class="profile-for-all">
          <div class="leftColumn">
            <div class="profilePhoto">
              <a href={profileObj.website}>
                <img src={profileObj.background_image} class="profilePhoto" />
              </a>
              <div class="likeGame">
                <div id="like"><AddToLikeButton selfId={props.selfId} slug={props.slug} selfProfile={props.selfProfile} /></div>
              </div>
            </div>
            <a href={profileObj.website}><div class="profile-name">{profileObj.name}</div></a>
          </div>
          <div class="rightColumn">
            <div class="aboutMe">
              <div class="aboutTitle"><h3>{"About " + (profileObj.name)}</h3></div>
              <div className="content" dangerouslySetInnerHTML={{ __html: profileObj.description }}></div>
            </div>
          </div>
        </div>
      </>
    )
  } else if (props.userId) {
    if (Object.keys(profileObj).length === 0) {
      return null;
    }
    return (
      <>
        <div class="profile-for-all">
          <div class="leftColumn">
            <div class="profilePhoto">
              <img src={profileObj.photos ? profileObj.photos[0].photo_url : "./img_avatar2.png"} class="profilePhoto" />
            </div>
            <div class="profile-name">{profileObj.username}</div>
            <div class="friendRequest">
              <FriendRequestButtons friendRequest={props.friendRequest} userId={props.userId} selfId={props.selfId} />
            </div>
          </div>
          <div class="rightColumn">
            <div class="aboutMe">
              <div class="aboutTitle"><h3>{"About " + (profileObj.username)}</h3></div>
              <div className="content" dangerouslySetInnerHTML={{ __html: profileObj.bio }}></div>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    if (Object.keys(props.selfProfile).length === 0) {
      return null;
    }
    return (
      <>
        <div class="profile-for-all">
          <div class="leftColumn">
            <div class="editProfileButton">
              <EditProfileButton selfId={props.selfId} selfProfile={props.selfProfile} changeImage={changeImage}/>
            </div>
            <div class="profilePhoto">
              <img src={img} class="profilePhoto" />
            </div>
            <div class="profile-name">{props.selfProfile.username}</div>
          </div>
          <div class="rightColumn">
            <div class="editAboutButton">
              <EditAboutButton selfId={props.selfId} selfProfile={props.selfProfile} />
            </div>
            <div class="aboutMe">
              <div class="aboutTitle"><h3>{"About Me"}</h3></div>
              <div className="content" dangerouslySetInnerHTML={{ __html: props.selfProfile.bio }}></div>
            </div>
          </div>
        </div>
      </>
    )
  }



}