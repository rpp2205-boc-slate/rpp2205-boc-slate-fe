import React, { useState } from 'react';

// testData will be replaced with props.user.received_req_from once the api is functional

function FriendRequestList(props) {
  const [friendRequests, setFriendRequests] = useState([]);
  const [message, setMessage] = useState('');
  const [acceptDisplay, setAcceptDisplay] = useState(true);
  const [rejectDisplay, setRejectDisplay] = useState(true);
  let testData = [
    { userId: 7, username: 'Joaquin' },
    { userId: 8, username: 'Emmanuel' },
    { userId: 9, username: 'Diego' },
  ];

  const acceptReq = (id) => {
    console.log('accepted');
    const updatedRequests = testData.filter(request => request.userId !== id);
    setFriendRequests(updatedRequests);
    let friend = testData.filter(request => request.userId === id)[0].username;
    setMessage(`${friend} is now your friend`);
    setAcceptDisplay(false);
  };

  const rejectReq = (id) => {
    console.log('rejected');
    const updatedRequests = testData.filter(request => request.userId !== id);
    setFriendRequests(updatedRequests);
    let reject = testData.filter(request => request.userId === id)[0].username;
    setMessage(`Rejected ${reject}'s request`);
    setRejectDisplay(false);
  };


  if (props.chatOpen) {
    if (testData.length) {
      return (
        <div>
          <p className="friend-request-list">{testData.length} Friends Requests Pending</p>
          <ul className="friend-request-list">
            {testData.map(request => (
              <li key={request.userId} >
                {request.username} wants to be your friend
                <button onClick={() => {request.display = false; acceptReq(request.userId)}}>Accept</button>
                <button onClick={() => {request.display = false; rejectReq(request.userId)}}>Reject</button>
              </li>
            ))}
            <h4 id='accept-reject'>{message}</h4>
          </ul>
        </div>
      );
    } else {
      return <p>You have no pending friend requests...</p>;
    }
  } else {
    return null;
  }
}

export default FriendRequestList;
