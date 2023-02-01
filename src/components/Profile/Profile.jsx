import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import FriendRequestButtons from './friend-request-buttons.jsx';
import AddToLikeButton from './add-to-like-button.jsx';
import EditAboutButton from './edit-about-button.jsx';
import EditProfileButton from './edit-profile-button.jsx';
import { getProfile } from './helperFunctions.js';


export default function Profile(props) {
  const [onlineStatus, setOnlineStatus] = useState('');
  //const [img, setImg] = useState('');
  const [id, setId] = useState('');
  //const [name, setName] = useState('');
  //const [about, setAbout] = useState('');
  const [website, setWebsite] = useState(undefined);
  const [friendRequest, setFriendRequest] = useState('');
  const [profileObj, setProfileObj] = useState({});
  useEffect(() => {
    var type = (props.slug) ? 'game' : 'user';
    var identifier = props.slug || props.userId || props.selfId;
    getProfile(type, identifier, (err, result) => {
      if (err) {
        console.error('err0r', err);
      } else {
        setProfileObj(result);
        //setName(result.name || result.username);
        //setImg(props.slug ? result.background_image : result.photos[0]?.photo_url);
        //setAbout(result.description || result.bio);
        setId(result.id || result.user_id);
        //setWebsite(result.website);
      }
    })
  }, [profileObj.name]);


  const onlineStatusDiv = props.slug ? null : (
    <div class="onlineStatus">
      {(!onlineStatus) ? <div class="offline"><span class="logged-in">●</span>Offline</div> : <div class="online"><span class="logged-in">●</span>Online</div>}
    </div>
  );

  const nameDiv = (
    <div class="profile-name">{profileObj.name || profileObj.username}</div>
  );
  const friendRequestButtonDiv = (props.slug || props.userId === props.selfId) ? null : (
    <div class="friendRequest">
      <FriendRequestButtons friendRequest={props.friendRequest} userId={props.userId} selfId={props.selfId}/>
    </div>
  );

  const likeGameDiv = (!props.slug) ? null : (
    <div class="likeGame">
      <div id="like"><AddToLikeButton selfId={props.selfId} slug={props.slug} profileObj={profileObj}/></div>
    </div>
  );

  const editProfileButtonDiv = (props.userId !== props.selfId || props.slug) ? null : (
    <div class="editProfileButton">
      <EditProfileButton selfId={props.selfId} profileObj={profileObj}/>
    </div>
  );

  const editAboutDiv = (props.userId !== props.selfId) ? null : (<div class="editAbout">
    <EditAboutButton selfId={props.selfId} slug={props.slug}/>
  </div>);

if (Object.keys(profileObj).length === 0) {
  return null;
}
return (
    <div class="profile-for-all">
        <div class="leftColumn">
          <div class="profilePhoto">
            <a href={profileObj.website}>
             <img src={props.slug ? profileObj.background_image : profileObj.photos[0]?.photo_url} id="profilePhoto" />
            </a>
            {editProfileButtonDiv}
          </div>
          <a href={profileObj.website}>{nameDiv}</a>
          {onlineStatusDiv}
          {friendRequestButtonDiv}
          {likeGameDiv}
        </div>
        <div class="rightColumn">
          <div class="aboutMe">
            <div class="aboutTitle"><h3>{"About " + (props.userId === props.selfId && !props.slug ? 'Me' : name)}</h3></div>
            {editAboutDiv}
            <div className="content" dangerouslySetInnerHTML={{__html: profileObj.description || profileObj.bio}}></div>
          </div>
        </div>
      </div>
  )

}