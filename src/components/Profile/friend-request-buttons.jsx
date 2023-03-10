import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';


export default function FriendRequestButtons(props) {
  var friends = props.selfProfile.friends;
  var friends_request = props.selfProfile.received_req_from;
  var user_friends_request = props.userProfile.received_req_from;
  var selfId = props.selfId;
  var userId = props.userId;
  var isFriend_init = (friends.find(obj => obj.user_id === Number(userId)) !== undefined);
  var reqReceived_init = (friends_request.find(obj => obj.user_id === Number(userId)) !== undefined);
  var reqSent_init = (user_friends_request.find(obj => obj.user_id === selfId) !== undefined);
  const [forceRerender, setForceRerender] = useState(1);
  const [isFriend, setIsFriend] = useState(isFriend_init);
  const [reqReceived, setReqReceived] = useState(reqReceived_init);
  const [reqSent, setReqSent] = useState(reqSent_init);
  const sendFriendReq = () => {
    axios.post(`${selfId}/request/${userId}`)
      .then(response => {
        console.log('sent');
        setReqSent(true);
      })
      .catch(err => {
        console.error(err);
      })
  };

  const acceptFriend = () => {
    axios.post(`${selfId}/respond/${userId}`, {respond: "approved"})
      .then(response => {
        console.log('approved');
        setReqReceived(false);
        setReqSent(false);
        setIsFriend(true);
      })
      .catch(err => {
        console.error(err);
      })
  };

  const denyFriend = () => {
    axios.post(`${selfId}/respond/${userId}`, {respond: "rejected"})
      .then(response => {
        console.log('rejected');
        setIsFriend(false);
        setReqSent(false);
        setReqReceived(false);
      })
      .catch(err => {
        console.error(err);
      })
  };

  // const unfriend = () => {
  //   axios.post(`${selfId}/respond/${userId}`, {respond: "rejected"})
  //     .then(response => {
  //       console.log('unfriended');
  //       setIsFriend(false);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     })
  // };

  if (selfId === Number(userId)) {
    return null;
  }
  if (reqSent) {
    return (
      <Stack style={{"color": (props.mode ? "white" : "black"), "font": "Courier New"}}>
        <Button id="request-sent">Friend Request Sent</Button>
      </Stack>
    )
  } else if (reqReceived) {
    return (
      <Stack direction="row" style={{"color": (props.mode ? "white" : "black"), "font": "Courier New"}}>
        <Button id="accept-friend" onClick={acceptFriend}>Accept Friends Request</Button>
        <Button id="reject-friend"onClick={denyFriend}>Deny Friends Request</Button>
      </Stack>
    )
  } else if (isFriend) {
    return (
      <Stack direction="row" style={{"color": (props.mode ? "white" : "black"), "font": "Courier New"}}>
        <PersonIcon>Friend</PersonIcon>
        <Typography id="unfriend" >Friend</Typography>
      </Stack>
    )
  } else {
    return (
      <Stack style={{"color": (props.mode ? "white" : "black"), "font": "Courier New"}}>
        <Button id="send-friend-request" onClick={sendFriendReq}>Send Friend Request</Button>
      </Stack>
    )
  }
}