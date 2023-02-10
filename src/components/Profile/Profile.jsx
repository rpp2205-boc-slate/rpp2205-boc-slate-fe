import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import FriendRequestButtons from './friend-request-buttons.jsx';
import AddToLikeButton from './add-to-like-button.jsx';
import EditAboutButton from './edit-about-button.jsx';
import EditProfileButton from './edit-profile-button.jsx';
import { getProfile } from './helperFunctions.js';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import Tag from "./Tag.jsx";
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Profile(props) {
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [id, setId] = useState('');
  const [website, setWebsite] = useState(undefined);
  const [profileObj, setProfileObj] = useState({});
  const [img, setImg] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const changeImage = (url) => {
    setImg(url);
  }

  const changeBio = (bio) => {
    setBio(bio);
  }

  const changeFirstName = (first) => {
    setFirstName(first);
  }

  const changeLastName = (last) => {
    setLastName(last);
  }

  // useEffect(() => {
  //   setIsAuthenticated(props.isAuthenticated);
  // }, [props.isAuthenticated]);

  useEffect(() => {
    setImg((props.selfProfile.photos && props.selfProfile.photos.length >= 1)? props.selfProfile.photos[0].photo_url : null);
    setFirstName(props.selfProfile.first_name);
    setLastName(props.selfProfile.last_name);
    setBio(props.selfProfile.bio);
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
          if (type === "user") {
            props.setUserProfile(result);
          } else {
            props.setGameProfile(result);
          }

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
              {props.isAuthenticated ? (<div class="likeGame">
                <div id="like"><AddToLikeButton selfId={props.selfId} slug={props.slug} selfProfile={props.selfProfile} isAuthenticated={props.isAuthenticated}/></div>
              </div>) : null}
            </div>
            <Stack direction="column" justifyContent="left" alignItems="left" id="game-intro-stack">
              <Typography class="game-intro-stack" style={{"color": "white", "font": "Courier New"}}>{"Platforms: " + profileObj.platforms.map(obj => obj.platform.name).join(', ')}</Typography>
              <Typography class="game-intro-stack" style={{"color": "white", "font": "Courier New"}}>{"Rating: " + profileObj.rating}</Typography>
              {profileObj.released ? <Typography class="game-intro-stack" style={{"color": "white", "font": "Courier New"}}>{"Release Date: " + profileObj.released}</Typography> : null}
              <Stack direction="row" spacing={2} sx={{"flexWrap": "wrap"}}>
              <Typography class="game-intro-stack" style={{"color": "white", "font": "Courier New"}}>{profileObj.tags.length > 0 ? "Tags: " : null}</Typography>
              {profileObj.tags.map((tag, index) => {
                return (
                  <div key={index} style={{"padding":"5px"}}><Tag tag={tag} /></div>
                )
              })}
              </Stack>
            </Stack>

          </div>
          <div class="rightColumn">
            <div class="aboutMe">
              <div class="aboutTitle"><h3>{"About " + (profileObj.name)}</h3></div>
              <div className="content" dangerouslySetInnerHTML={{ __html: profileObj.description }}></div>
              {profileObj.reddit_url ? (<div id="reddit-container">
                <div id="reddit">
                  <a href={profileObj.reddit_url}><img id="reddit-img" src='./reddit-logo.png' /></a>
                </div>
              </div>) : null}


            </div>
          </div>
        </div>
      </>
    )
  } else if (props.userId) {
    if (Object.keys(profileObj).length === 0 || Object.keys(props.selfProfile).length === 0) {
      return null;
    }
    return (
      <>
        <div class="profile-for-all">
          <div class="leftColumn">
            <div class="profilePhoto">
              <img src={(profileObj.photos && profileObj.photos.length >= 1) ? profileObj.photos[0].photo_url : "./img_avatar2.png"} class="profilePhoto" />
            </div>
            <div class="profile-name">{"Username: " + profileObj.username}</div>
            <div class="profile-firstName">{"First Name: " + (profileObj.first_Name || ' ')}</div>
            <div class="profile-lastName">{"Last Name: " + (profileObj.last_Name || ' ')}</div>
            <div class="profile-email">{"Email Address: " + profileObj.email}</div>
            <div class="friendRequest">
              <FriendRequestButtons userId={props.userId} selfId={props.selfId} selfProfile={props.selfProfile} userProfile={profileObj}/>
            </div>
          </div>
          <div class="rightColumn">
            <div class="aboutMe">
              <div class="aboutTitle"><h3>{"About " + (profileObj.username)}</h3></div>
              {/* <div className="content" dangerouslySetInnerHTML={{ __html: profileObj.bio }}></div> */}
              <div class="aboutContent">{profileObj.bio}</div>
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
        <div class="profile-for-all" >
          <div class="leftColumn">
            <div class="editProfileButton">
              <EditProfileButton selfId={props.selfId} selfProfile={props.selfProfile} changeImage={changeImage} changeFirstName={changeFirstName} changeLastName={changeLastName} />
            </div>
            <img src={img} class="profilePhoto" />
            <div class="profile-name">{"Username: " + props.selfProfile.username}</div>
            <div class="profile-firstName">{"First Name: " + firstName}</div>
            <div class="profile-lastName">{"Last Name: " + lastName}</div>
            <div class="profile-email">{"Email Address: " + props.selfProfile.email}</div>
          </div>
          <div class="rightColumn">
            <div class="editAboutButton">
              <EditAboutButton selfId={props.selfId} selfProfile={props.selfProfile} changeBio={changeBio}/>
            </div>
            <div class="aboutMe">
              <div class="aboutTitle"><h3>{"About Me"}</h3></div>
              <div class="aboutContent">{bio}</div>
            </div>
          </div>
        </div>
      </>
    )
  }



}