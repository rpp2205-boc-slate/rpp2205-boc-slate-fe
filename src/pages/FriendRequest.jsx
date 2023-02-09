import React, { useState } from 'react';

// testData will be replaced with props.user.received_req_from once the api is functional

function FriendRequestList(props) {
  const [friendRequests, setFriendRequests] = useState([]);
  const [message, setMessage] = useState('');
  const [showDisplay, setShowDisplay] = useState(true);
  // const [rejectDisplay, setRejectDisplay] = useState(true);
  let testData = [
    { userId: 7, username: 'Joaquin' },
    { userId: 8, username: 'Emmanuel' },
    { userId: 9, username: 'Diego' },
  ];

  const acceptReq = (id) => {
    console.log('accepted');
    setFriendRequests(friendRequests => friendRequests.filter(request => request.userId !== id));
    let friend = props.user.received_req_from.filter(request => request.userId === id)[0].username;
    setMessage(`${friend} is now your friend`);
    setShowDisplay(false);
  };

  const rejectReq = (id) => {
    console.log('rejected');
    setFriendRequests(friendRequests => friendRequests.filter(request => request.userId !== id));
    let reject = props.user.received_req_from.filter(request => request.userId === id)[0].username;
    setMessage(`Rejected ${reject}'s request`);
    setShowDisplay(false);
  };


  if (props.chatOpen) {
    if (props.user.received_req_from.length) {
      return (
        <div>
          <ul className="friend-request-list">
          <p><b>{props.user.received_req_from.length} Pending Friend Requests</b></p>
          {props.user.received_req_from.map(request => (
            <li key={request.userId} >
               { showDisplay && <div className='request'>
                  {request.username} wants to be your friend
                  <button onClick={() => acceptReq(request.userId)}>Accept</button>
                  <button onClick={() => rejectReq(request.userId)}>Reject</button>
                </div> }
            </li>
          ))}
            <h4 id='accept-reject'>{message}</h4>
          </ul>
        </div>
      );
    } else {
      return <p className="friend-request-list">You have no pending friend requests...</p>;
    }
  } else {
    return null;
  }
}

export default FriendRequestList;
