import React, { useState } from 'react';
import axios from "axios";

// testData will be replaced with props.user.received_req_from once the api is functional

function FriendRequestList(props) {
  console.log(props)
  const [friendRequests, setFriendRequests] = useState([]);
  const [message, setMessage] = useState('');
  const [showDisplay, setShowDisplay] = useState(true);


  let theme = 'friend-request-light';
  theme = props.dark ? 'friend-request-dark' : 'friend-request-light';

  const acceptReq = (id) => {
    console.log('accepted', props.userId, id);
    setFriendRequests(friendRequests => friendRequests.filter(request => request.userId !== id));
    let friend = props.user.received_req_from.filter(request => request.user_id === id)[0].username;
    axios.post(`/${props.userId}/respond/${id}`, {respond: "approved"})
      .then(function (response) {
        console.log(response);
        setMessage(`${friend} is now your friend`);
        setShowDisplay(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const rejectReq = (id) => {
    console.log('rejected');
    setFriendRequests(friendRequests => friendRequests.filter(request => request.userId !== id));
    let reject = props.user.received_req_from.filter(request => request.user_id === id)[0].username;
    axios.post(`/${props.userId}/respond/${id}`, {respond: "rejected"})
    .then(function (response) {
      console.log(response);
      setMessage(`Rejected ${reject}'s request`);
      setShowDisplay(false);
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  if (props.chatOpen) {
    if (props.user.received_req_from?.length) {
      return (
        <div className={theme}>
          <ul className="friend-request-list">
          <p><b>{props.user.received_req_from.length} Pending Friend Requests</b></p>
          {props.user.received_req_from.map(request => (
              <li key={request.userId} >
               { showDisplay && <div className='request'>
                  {request.username} wants to be your friend
                  <button onClick={() => acceptReq(request.user_id)}>Accept</button>
                  <button onClick={() => rejectReq(request.user_id)}>Reject</button>
                </div> }
              </li>
            ))}
            <h4 id='accept-reject'>{message}</h4>
          </ul>
        </div>
      );
    } else {
      return <p className={theme}>You have no pending friend requests...</p>;
    }
  } else {
    return null;
  }
}

export default FriendRequestList;
