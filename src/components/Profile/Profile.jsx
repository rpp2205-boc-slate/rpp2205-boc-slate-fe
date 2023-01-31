import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import FriendRequestButton from './friend-request-button.jsx';
import { getProfile } from './helperFunctions.js';


export default function Profile(props) {
  const [onlineStatus, setOnlineStatus] = useState('placeholderforonlinestatus');
  const [img, setImg] = useState('./img_avatar2.png');
  const [id, setId] = useState('');
  const [name, setName] = useState('placeholderforname');
  const [about, setAbout] = useState('placeholderforabout');
  const [website, setWebsite] = useState(undefined);
  const [friendRequest, setFriendRequest] = useState('placeholderforfriendrequest');
  const [profileObj, setProfileObj] = useState({});
  useEffect(() => {
    var type = (props.slug) ? 'game' : 'user';
    var identifier = props.slug || props.userId || props.selfId;
    getProfile(type, identifier, (err, result) => {
      if (err) {
        console.error('err0r', err);
      } else {
        console.log(result.website);
        setProfileObj(result);
        setName(result.name || result.username);
        setImg(props.slug ? result.background_image : result.photos[0]?.photo_url);
        setAbout(result.description || result.bio);
        setId(result.id || result.user_id);
        setWebsite(result.website);
      }
    })
  }, [id]);


  const onlineStatusDiv = props.slug ? null : (
    <div class="onlineStatus">
      {(!onlineStatus) ? <div class="offline"><span class="logged-in">●</span>Offline</div> : <div class="online"><span class="logged-in">●</span>Online</div>}
    </div>
  );

  const nameDiv = (
    <div class="profile-name">{name}</div>
  );
  const friendRequestButtonDiv = (props.slug || props.userId === props.selfId) ? null : (
    <div class="friendRequest">
      <FriendRequestButton friendRequest={props.friendRequest} userId={props.userId} selfId={props.selfId}/>
    </div>
  );

  const likeGameDiv = (!props.slug) ? null : (
    <div class="likeGame">
      <button id="like">Like</button>
      <button id="add-to-favourite">Add to Favourite</button>
    </div>
  );

  const editPhotoButtonDiv = (props.userId !== props.selfId) ? null : (
    <div class="editPhotoButton">
      <button>Edit Profile Photo</button>
    </div>
  );

  const editAboutDiv = (props.userId !== props.selfId) ? null : (<div class="editAbout">
    <button>Edit About</button>
  </div>);

  return (
    <div class="profile-for-all">
        <div class="leftColumn">
          <div class="profilePhoto">
            <a href={website}>
             <img src={img} id="profilePhoto" />
            </a>
            {editPhotoButtonDiv}
          </div>
          <a href={website}>{nameDiv}</a>
          {onlineStatusDiv}
          {friendRequestButtonDiv}
          {likeGameDiv}
        </div>
        <div class="rightColumn">
          <div class="aboutMe">
            <div class="aboutTitle"><h3>{"About " + (props.userId === props.selfId && !props.slug ? 'Me' : name)}</h3></div>
            {editAboutDiv}
            <div className="content" dangerouslySetInnerHTML={{__html: about}}></div>
          </div>
        </div>
      </div>
  )

}