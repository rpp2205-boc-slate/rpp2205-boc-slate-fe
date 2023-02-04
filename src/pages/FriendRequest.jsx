import React, { useState } from 'react';

function FriendRequestList(props) {
  const [showRequests, setShowRequests] = useState(false);
  let testData = [{'userId': 7, 'username': 'Jaoquin'}, {'userId': 8, 'username': 'Emmanuel'}, {'userId': 9, 'username': 'Diego'}]

  // if (props.isAuthenticated && props.user) {
    const friendRequests = props.user.received_req_from;
    console.log('friend requests', Array.isArray(friendRequests))
    if (Array.isArray(friendRequests) && props.chatOpen) {
      if (friendRequests.length) {
        return (
          <div>
            <p>You have no pending friend requests...</p>
          </div>
        )
      } else {
        return (
        <div>
          <p className="friend-request-list">{testData.length} Friends Requests Pending</p>
            <ul className="friend-request-list">
              {testData.map((request) => (
                <li key={request.userId}>
                  {request.username} wants to be your friend
                  <button>Add Friend</button>
                  <button>Reject Request</button>
                </li>
              ))}
            </ul>
        </div>
        );
      }
    } else {
      return null;
    }
}

export default FriendRequestList;
